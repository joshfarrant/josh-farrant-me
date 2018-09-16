const {
  copyFilesInDir,
} = require('./files');
const {
  BUILD_DIR,
  STATIC_DIR,
} = require('./constants');

const copyStaticDir = async () => {
  try {
    await copyFilesInDir(STATIC_DIR, BUILD_DIR);
  } catch (err) {
    console.log('Error copying static dir: ', err.message);
  }
};

module.exports = copyStaticDir;
