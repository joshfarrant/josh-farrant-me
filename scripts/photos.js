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

const SECRETS = require('../secrets');

cloudinary.config({
  cloud_name: SECRETS.CLOUDINARY.CLOUD_NAME,
  api_key: SECRETS.CLOUDINARY.API_KEY,
  api_secret: SECRETS.CLOUDINARY.API_SECRET,
});

const cloudinaryListAll = async () => {
  let nextCursor;
  let data = [];
  let isDone = false;


  while (!isDone) {
    /**
     * Allow await in loop as the output of the previous operation
     * is an input to the next
     */

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

const uploadToCloudinary = async () => {
  /**
   * Find albums
   * Diff local album with Cloudiary album
   * Upload/delete files as required
   * Get album URL and store it somewhere (use when generating template)
   * Generate template
   * Save files
   */

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

  const photosTemplate = Handlebars.compile(photosTemplateSrc);
  const template = Handlebars.compile(templateSrc);

  const promises = Object
    .entries(sortedList)
    .map(async ([folder, files]) => {
      const photos = files.map(x => ({
        raw: x.secure_url,
        thumbnail: cloudinary.image(x.public_id, {
          width: 200,
          height: 200,
          quality: 85,
          crop: 'limit',
          fetch_format: 'auto',
        }),
      }));

      const photosHtml = photosTemplate({
        photos,
      });
      const html = template({
        body: photosHtml,
      });

      const outputDir = `${FILES.PHOTOS.OUTPUT}/${folder}`;

      await ensureDirExists(outputDir);

      const outputHtmlPath = `${outputDir}/index.html`;
      return writeFile(outputHtmlPath, html);
    });

  await Promise.all(promises);
};

module.exports = {
  cloudinary: uploadToCloudinary,
};
