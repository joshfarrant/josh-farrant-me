const util = require('util');

const cloudinaryCb = require('cloudinary');
const Handlebars = require('handlebars');

const cloudinary = {
  config: cloudinaryCb.config,
  image: cloudinaryCb.image,
  resources: util.promisify(cloudinaryCb.v2.api.resources),
  upload: util.promisify(cloudinaryCb.v2.uploader.upload),
};

const {
  FILES,
} = require('./constants');
const {
  ensureDirExists,
  readFile,
  writeFile,
} = require('./files');

const thumbnailOptions = {
  width: 200,
  height: 200,
  quality: 85,
  crop: 'limit',
  fetch_format: 'auto',
  secure: true,
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryListAll = async () => {
  let nextCursor;
  let data = [];
  let isDone = false;

  while (!isDone) {
    // eslint-disable-next-line no-await-in-loop
    const page = await cloudinary.resources({
      type: 'upload',
      max_results: 2,
      next_cursor: nextCursor,
    });

    data = [
      ...data,
      ...page.resources,
    ];

    nextCursor = page.next_cursor;
    if (!nextCursor) {
      isDone = true;
    }
  }

  return data;
};

module.exports = async () => {
  const list = await cloudinaryListAll();

  // Sort files into object of format { folderName: [filesArr] }
  const sortedList = list.reduce((sorted, file) => {
    const splitId = file.public_id.split('/');
    const folder = splitId.length > 1 ? splitId[0] : 'uncategorized';
    return {
      ...sorted,
      [folder]: [
        ...(sorted[folder] || []),
        file,
      ],
    };
  }, {});

  const photosTemplateSrc = await readFile(FILES.TEMPLATES.SRC.PHOTOS, 'utf8');
  const templateSrc = await readFile(FILES.TEMPLATES.SRC.BASE, 'utf8');
  const css = await readFile(FILES.STYLES.OUTPUT, 'utf8');
  const favicons = await readFile(FILES.FAVICONS.HTML, 'utf8');

  const jsArr = await Promise.all(
    Object
      .entries(FILES.JS.OUTPUT)
      .map(async ([name, filePath]) => {
        const file = await readFile(filePath, 'utf8');
        return [
          name,
          file,
        ];
      }),
  );

  const javascript = jsArr
    .reduce((a, [name, file]) => ({
      ...a,
      [name]: file,
    }), {});

  const photosTemplate = Handlebars.compile(photosTemplateSrc);
  const template = Handlebars.compile(templateSrc);

  const promises = Object
    .entries(sortedList)
    .map(async ([folder, files]) => {
      const photos = files.map(x => ({
        raw: x.secure_url,
        thumbnail: cloudinary.image(x.public_id, thumbnailOptions),
      }));

      const photosHtml = photosTemplate({
        photos,
      });
      const html = template({
        body: photosHtml,
        css,
        favicons,
        javascript,
      });

      const outputDir = `${FILES.PHOTOS.OUTPUT}/${folder}`;

      await ensureDirExists(outputDir);

      const outputHtmlPath = `${outputDir}/index.html`;
      return writeFile(outputHtmlPath, html);
    });

  await Promise.all(promises);
};
