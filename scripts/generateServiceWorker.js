const crypto = require('crypto');
const util = require('util');

const randomBytes = util.promisify(crypto.randomBytes);

const {
  readFile,
  writeFile,
} = require('./files');
const {
  FILES,
} = require('./constants');

const generate = async () => {
  const sw = await readFile(FILES.SERVICE_WORKER.SRC, 'utf8');

  const buffer = await randomBytes(32);
  const token = buffer.toString('hex');

  const modifiedSW = `
    const PRECACHE = '${token}';
    ${sw}
  `;

  await writeFile(FILES.SERVICE_WORKER.OUTPUT, modifiedSW);
};

module.exports = generate;
