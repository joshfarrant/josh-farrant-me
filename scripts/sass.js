const util = require('util');

const sass = require('node-sass');

const { FILES } = require('./constants');
const { writeFile } = require('./files');

const render = util.promisify(sass.render);

const buildSass = async () => {
  let result;

  try {
    result = await render({
      file: FILES.STYLES.SASS,
      outFile: FILES.STYLES.OUTPUT,
    });
  } catch (renderErr) {
    if (renderErr) {
      console.error(`Error building sass : ${renderErr}`);
      process.exit(1);
    }
  }

  try {
    await writeFile(FILES.STYLES.OUTPUT, result.css);
    console.log(`Wrote CSS to ${FILES.STYLES.OUTPUT}`);
  } catch (writeErr) {
    console.error(`Error writing ${FILES.STYLES.OUTPUT} : ${writeErr}`);
    process.exit(1);
  }
};

module.exports = buildSass;
