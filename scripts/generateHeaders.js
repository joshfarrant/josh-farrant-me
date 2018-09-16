const crypto = require('crypto');
const Handlebars = require('handlebars');

const {
  readFile,
  writeFile,
} = require('./files');
const {
  FILES,
} = require('./constants');

const generate = async ({
  scripts = [],
  styles = [],
}) => {
  const scriptHashes = scripts
    .map((file) => {
      const hash = crypto.createHash('sha256')
        .update(file)
        .digest('base64');
      return `'sha256-${hash}'`;
    })
    .join(' ');

  const styleHashes = styles
    .map((file) => {
      const hash = crypto.createHash('sha256')
        .update(file)
        .digest('base64');
      return `'sha256-${hash}'`;
    })
    .join(' ');

  const headersHbs = await readFile(FILES.HEADERS.SRC, 'utf8');
  const template = Handlebars.compile(headersHbs);

  const rendered = template({
    scriptHashes,
    styleHashes,
  });

  await writeFile(FILES.HEADERS.OUTPUT, rendered);
  console.log('Wrote _headers file');
};

module.exports = generate;
