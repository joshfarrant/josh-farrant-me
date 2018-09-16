const path = require('path');
const util = require('util');

const Handlebars = require('handlebars');
const promptCb = require('prompt');
const uuid = require('uuid/v4');
// const {
//   generateResponsiveImages,
//   renameImagesToSize,
// } = require('responsive-images-generator/lib');

const promptGet = util.promisify(promptCb.get);

const {
  FILES,
  PHOTOS_DIR,
} = require('./constants');
const {
  clearDir,
  copyFilesInDir,
  ensureDirExists,
  getFiles,
  readFile,
  writeFile,
} = require('./files');
const { sleep } = require('./utils');

// const imagesConfig = [
//   { width: '20%', rename: { suffix: '@1x' } },
//   { width: '40%', rename: { suffix: '@2x' } },
//   { width: '60%', rename: { suffix: '@3x' } },
//   { width: '80%', rename: { suffix: '@4x' } },
//   { width: '100%', rename: { suffix: '@5x' } },
// ];

const buildPhotosTemplates = async () => {
  const filesArr = await getFiles(FILES.PHOTOS.OUTPUT, false);
  if (!Array.isArray(filesArr)) return;

  filesArr.forEach(async (files) => {
    if (!Array.isArray(files)) return;

    const outputFiles = files.map(file => path.basename(file));

    const photosTemplateSrc = await readFile(FILES.TEMPLATES.SRC.PHOTOS, 'utf8');
    const templateSrc = await readFile(FILES.TEMPLATES.SRC.BASE, 'utf8');

    const photosTemplate = Handlebars.compile(photosTemplateSrc);
    const template = Handlebars.compile(templateSrc);
    const photosHtml = photosTemplate({
      photos: outputFiles,
    });
    const html = template({
      body: photosHtml,
    });

    const dataPath = files.find(x => x.includes('data.json'));
    const rawData = await readFile(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    // We've got our html, now let's write it to the right place!
    const outputHtmlPath = `${FILES.PHOTOS.OUTPUT}/${data.id}/index.html`;
    await writeFile(outputHtmlPath, html);
  });
};

const copyPhotos = async () => {
  const filesArr = await getFiles(FILES.PHOTOS.SRC, false);
  if (!Array.isArray(filesArr)) return;

  const promises = filesArr.map(async (files) => {
    if (!Array.isArray(files)) {
      return;
    }

    if (files.length < 1) {
      return;
    }

    const relFiles = files.map(file => (
      path.relative(FILES.PHOTOS.SRC, file)
    ));

    // Get the directory name
    const { dir } = path.parse(relFiles[0]);

    // Check for presence of data.json
    const hasData = relFiles.includes(`${dir}/data.json`);
    const jsonFilePath = path.join(FILES.PHOTOS.SRC, dir, 'data.json');

    // If we've not got the file, let's build it
    if (!hasData) {
      promptCb.start();

      // TODO Make this less hacky, currently required to let other logs run first
      await sleep(100);

      const { albumName } = await promptGet({
        properties: {
          albumName: {
            description: 'Enter a name for the new album',
            default: dir,
            required: true,
          },
        },
      });

      const newData = {
        id: uuid(),
        albumName,
        created: new Date(),
      };

      // Create the data.json
      await writeFile(jsonFilePath, JSON.stringify(newData));
    }

    // If we've got this far, we know we've got a data json file
    const rawData = await readFile(jsonFilePath, 'utf8');
    const data = JSON.parse(rawData);

    const outputDir = `${PHOTOS_DIR}/${data.id}`;
    await clearDir(outputDir);
    await ensureDirExists(outputDir);
    const srcDir = path.dirname(files[0]);

    await copyFilesInDir(srcDir, outputDir);

    // This is all the responsive img (srcset) stuff
    // const images = files
    //   .map(file => (
    //     `${outputDir}/${path.basename(file)}`
    //   ))
    //   .filter(file => (
    //     !file.includes('.json') && !file.includes('.html')
    //   ));

    // await generateResponsiveImages(images, imagesConfig);
    // let responsiveImages = await getFiles(outputDir, false);
    // responsiveImages = responsiveImages.filter(file => (
    //   !file.includes('.json') && !file.includes('.html')
    // ));
    // await renameImagesToSize(responsiveImages, /(?:.*)(@[0-9]{0,10}x)$/);
  });

  // Wait for all the above code to run before returning
  await Promise.all(promises);
};

module.exports = {
  copy: copyPhotos,
  build: buildPhotosTemplates,
};
