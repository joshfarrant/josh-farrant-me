const path = require('path');
const url = require('url');

const compressor = require('node-minify');
const emojione = require('emojione');
const footnote = require('markdown-it-footnote');
const Handlebars = require('handlebars');
const markdownIt = require('markdown-it')();
const prism = require('markdown-it-prism');
const yaml = require('yamljs');

const md = markdownIt
  .use(footnote)
  .use(prism);

const {
  copyFilesInDir,
  ensureDirExists,
  getFiles,
  readFile,
  writeFile,
} = require('./files');
const {
  FILES,
} = require('./constants');
const generateHeaders = require('./generateHeaders');
const { copyFavicons } = require('./favicons');

Handlebars.registerHelper('json', JSON.stringify);

Handlebars.registerHelper('or', (v1, v2, options) => (
  (v1 || v2) ? options.fn(this) : options.inverse(this)
));

const defaultRender = (
  tokens,
  idx,
  options,
  env,
  self,
) => self.renderToken(tokens, idx, options);

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const hrefArr = token.attrs.find(([property]) => property === 'href');
  const href = hrefArr[1];
  const linkUrl = url.parse(href);

  // If it's an external link (and not tel: or mailto: or anything)
  if (['http:', 'https:'].includes(linkUrl.protocol)) {
    // Add target="_blank"
    tokens[idx].attrPush(['target', '_blank']);
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

const render = async () => {
  const files = await getFiles(FILES.CONTENT.SRC);
  const baseTemplateSrc = await readFile(FILES.TEMPLATES.SRC.BASE, 'utf8');
  const baseTemplate = Handlebars.compile(baseTemplateSrc);
  const recipeTemplateSrc = await readFile(FILES.TEMPLATES.SRC.RECIPE, 'utf8');
  const recipeTemplate = Handlebars.compile(recipeTemplateSrc);

  const css = await compressor.minify({
    compressor: 'clean-css',
    input: [
      // Order matters
      FILES.TYPOGRAPHY.OUTPUT,
      FILES.STYLES.OUTPUT,
    ],
    output: FILES.STYLES.OUTPUT,
  });

  console.log('Combined and minified CSS');

  // Compress all JS files
  const jsArr = await Promise.all(
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

  /**
   * Format the JS for the hbs template as follows:
   * {
   *   HEAD: 'minified main.js',
   *   MAIN: 'minified head.js',
   * }
   */
  const jsObj = jsArr.reduce((a, [name, minifiedFile]) => ({
    ...a,
    [name]: minifiedFile,
  }), {});

  console.log('Minified JavaScript');

  const favicons = await copyFavicons();

  generateHeaders({
    // eslint-disable-next-line no-unused-vars
    scripts: jsArr.map(([name, minifiedFile]) => minifiedFile),
    styles: [css],
  });

  try {
    files.forEach(async (file) => {
      let body;
      const fileExtension = path.extname(file).toLowerCase();

      const relPath = path.relative(FILES.CONTENT.SRC, file);
      const outputPath = path.join(FILES.CONTENT.OUTPUT, relPath);

      // File name, without extension
      const fileName = path.basename(outputPath).replace(/\.[^/.]+$/, '');
      const dirName = path.dirname(outputPath);

      if (fileExtension === '.md') {
        // Markdown files
        const fileContents = await readFile(file, 'utf8');
        const baseBody = md.render(fileContents);
        body = emojione.unicodeToImage(baseBody);
      } else if (fileExtension === '.yaml') {
        // YAML (recipe) files
        const recipe = yaml.load(file);
        body = recipeTemplate({
          ...recipe,
        });
      } else if (['.png', '.gif', '.jpg', '.jpeg'].includes(fileExtension)) {
        await ensureDirExists(dirName);
        await copyFilesInDir(file, outputPath);
        return;
      } else {
        return;
      }

      const html = baseTemplate({
        body,
        css,
        favicons,
        JS: jsObj,
      });

      let modifiedOutputPath;

      if (fileName !== 'index') {
        // An underscore at the start of the fileName prevents us from creating a directory
        if (fileName[0] === '_') {
          // Remember to remove leading underscore
          modifiedOutputPath = `${dirName}/${fileName.substr(1)}.html`;
        } else {
          modifiedOutputPath = `${dirName}/${fileName}/index.html`;
        }
      } else {
        modifiedOutputPath = `${dirName}/${fileName}.html`;
      }

      await ensureDirExists(path.dirname(modifiedOutputPath));
      await writeFile(modifiedOutputPath, html);
    });
  } catch (err) {
    console.error(`Error rendering markdown : ${err}`);
    process.exit(1);
  }
};

module.exports = render;
