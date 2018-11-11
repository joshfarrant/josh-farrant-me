
const compressor = require('node-minify');

const { FILES } = require('./constants');

const buildJavascript = async () => {
  // Compress all JS files
  await Promise.all(
    Object
      .entries(FILES.JS.SRC)
      .map(async ([name, filePath]) => ([
        name,
        await compressor.minify({
          compressor: 'uglify-es',
          input: filePath,
          output: FILES.JS.OUTPUT[name],
        }),
      ])),
  );
  console.log('Minified JavaScript');
};

module.exports = buildJavascript;
