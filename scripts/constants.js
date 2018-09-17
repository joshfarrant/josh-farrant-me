const SRC_DIR = './src';
const BUILD_DIR = './build';
const TEMP_DIR = './temp';
const STATIC_DIR = `${SRC_DIR}/static`;
const ASSETS_DIR = `${BUILD_DIR}/assets`;
const PHOTOS_DIR = `${BUILD_DIR}/photos/albums`;

const CONSTANTS = {
  SRC_DIR,
  BUILD_DIR,
  TEMP_DIR,
  STATIC_DIR,
  ASSETS_DIR,
  PHOTOS_DIR,
  FILES: {
    FAVICONS: {
      SRC: `${SRC_DIR}/favicon.svg`,
      TEMP: `${SRC_DIR}/favicons`,
      OUTPUT: `${ASSETS_DIR}/favicons`,
      get HTML() {
        return `${CONSTANTS.FILES.FAVICONS.TEMP}/html.txt`;
      },
    },
    SERVICE_WORKER: {
      SRC: `${SRC_DIR}/scripts/service-worker.js`,
      OUTPUT: `${BUILD_DIR}/service-worker.js`,
    },
    JS: {
      ROOT: `${SRC_DIR}/scripts`,
      SRC: {
        HEAD: `${SRC_DIR}/scripts/head.js`,
        MAIN: `${SRC_DIR}/scripts/main.js`,
      },
      OUTPUT: {
        HEAD: `${TEMP_DIR}/head.js`,
        MAIN: `${TEMP_DIR}/main.js`,
      },
    },
    HEADERS: {
      SRC: `${SRC_DIR}/templates/_headers.hbs`,
      OUTPUT: `${BUILD_DIR}/_headers`,
    },
    TEMPLATES: {
      SRC: {
        BASE: `${SRC_DIR}/templates/base.hbs`,
        PHOTOS: `${SRC_DIR}/templates/photos.hbs`,
        RECIPE: `${SRC_DIR}/templates/recipe.hbs`,
        HEADERS: `${SRC_DIR}/templates/_headers.hbs`,
      },
    },
    CONTENT: {
      SRC: `${SRC_DIR}/content`,
      OUTPUT: `${BUILD_DIR}`,
    },
    PHOTOS: {
      SRC: `${SRC_DIR}/photos`,
      OUTPUT: `${PHOTOS_DIR}`,
    },
    STYLES: {
      SRC: `${SRC_DIR}/styles`,
      SASS: `${SRC_DIR}/styles/style.scss`,
      OUTPUT: `${ASSETS_DIR}/style.css`,
    },
    TYPOGRAPHY: {
      SRC: `${SRC_DIR}/styles/typography.json`,
      OUTPUT: `${ASSETS_DIR}/typography.css`,
    },
  },
};

module.exports = CONSTANTS;
