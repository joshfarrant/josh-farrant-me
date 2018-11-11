const util = require('util');

const compressor = require('node-minify');
const sass = require('node-sass');

const generateTypographyCss = require('./typography');
const { FILES } = require('./constants');
const { writeFile } = require('./files');

const render = util.promisify(sass.render);

const buildCss = async () => {
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

  await generateTypographyCss();

  await compressor.minify({
    compressor: 'clean-css',
    input: [
      // Order matters
      FILES.TYPOGRAPHY.OUTPUT,
      FILES.STYLES.OUTPUT,
    ],
    output: FILES.STYLES.OUTPUT,
  });

  console.log('Combined and minified CSS');
};

module.exports = buildCss;
