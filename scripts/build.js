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
const buildCss = require('./css');
const buildJavascript = require('./javascript');
const copyStaticDir = require('./copyStaticDir');

module.exports = {
  develop: async () => {
    await clearDir(BUILD_DIR);
    await ensureDirExists(ASSETS_DIR);
    await ensureDirExists(TEMP_DIR);
    await buildCss();
    await buildJavascript();
    await generateServiceWorker();
    await photos.cloudinary();
    await render();
    await copyStaticDir();
  },
  build: async () => {
    await clearDir(BUILD_DIR);
    await ensureDirExists(ASSETS_DIR);
    await ensureDirExists(TEMP_DIR);
    await buildCss();
    await buildJavascript();
    await generateServiceWorker();
    await photos.cloudinary();
    await render();
    await copyStaticDir();
  },
  css: async () => {
    await buildCss();
  },
  javascript: async () => {
    await buildJavascript();
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
};
