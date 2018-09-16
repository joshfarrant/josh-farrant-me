const Typography = require('typography');

const { FILES } = require('./constants');
const {
  readFile,
  writeFile,
} = require('./files');

const generateTypographyCss = async () => {
  const jsonConfig = await readFile(FILES.TYPOGRAPHY.SRC, 'utf8');
  const config = JSON.parse(jsonConfig);
  const typography = new Typography(config);

  const css = typography.toString();

  try {
    await writeFile(FILES.TYPOGRAPHY.OUTPUT, css);
    console.log(`Wrote typography to ${FILES.TYPOGRAPHY.OUTPUT}`);
  } catch (err) {
    console.error(`Error writing ${FILES.TYPOGRAPHY.OUTPUT} : ${err}`);
    process.exit(1);
  }
};

module.exports = generateTypographyCss;
