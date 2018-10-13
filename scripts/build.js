const {
  ASSETS_DIR,
  BUILD_DIR,
  TEMP_DIR,
} = require('./constants');
const {
  clearDir,
  ensureDirExists,
} = require('./files');
const render = require('./render');
const photos = require('./photos');
const generateServiceWorker = require('./generateServiceWorker');
const buildSass = require('./sass');
const copyStaticDir = require('./copyStaticDir');
const generateTypographyCss = require('./typography');

module.exports = {
  develop: async () => {
    await clearDir(BUILD_DIR);
    await ensureDirExists(ASSETS_DIR);
    await ensureDirExists(TEMP_DIR);
    await generateTypographyCss();
    await buildSass();
    await generateServiceWorker();
    await photos.cloudinary();
    await render();
    await copyStaticDir();
  },
  build: async () => {
    await clearDir(BUILD_DIR);
    await ensureDirExists(ASSETS_DIR);
    await ensureDirExists(TEMP_DIR);
    await generateTypographyCss();
    await buildSass();
    await generateServiceWorker();
    await photos.cloudinary();
    await render();
    await copyStaticDir();
  },
  sass: async () => {
    await buildSass();
  },
  md: async () => {
    await render();
  },
  copyAndBuildPhotos: async () => {
    await photos.copy();
    await photos.build();
  },
  buildPhotosTemplates: async () => {
    await photos.build();
  },
  typography: async () => {
    await generateTypographyCss();
  },
};
