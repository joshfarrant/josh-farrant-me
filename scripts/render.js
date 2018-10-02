const path = require('path');
const url = require('url');

const compressor = require('node-minify');
const emojione = require('emojione');
const footnote = require('markdown-it-footnote');
const Handlebars = require('handlebars');
const handlebarsDateFormat = require('handlebars-dateformat');
const markdownIt = require('markdown-it')();
const meta = require('markdown-it-meta');
const moment = require('moment');
const prism = require('markdown-it-prism');
const { readMarkdown } = require('node-md-meta-cataloger');
const yaml = require('yamljs');

const md = markdownIt
  .use(meta)
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

Handlebars.registerHelper('dateFormat', handlebarsDateFormat);

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
    tokens[idx].attrPush(['rel', 'noopener']);
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

const getFilesListMd = async (file) => {
  const fileDirName = path.dirname(file);
  const filesInDir = await getFiles(fileDirName);
  // Filter out non markdown files, as well as list file
  const filesToListPromises = filesInDir
    .filter(filePath => (
      path.extname(filePath).toLowerCase() === '.md'
      && !path.basename(filePath).includes('-list')
    ))
    .map(async (filePath) => {
      // Get the metadata from each md file
      const { meta: fileMeta } = await readMarkdown(filePath);
      const href = path
        .relative(FILES.CONTENT.SRC, filePath)
        .replace(/\.[^/.]+$/, '');

      return {
        author: fileMeta.author,
        href: `/${href}`,
        published: new Date(fileMeta.date_published),
        title: fileMeta.title,
      };
    });

  const filesToList = await Promise.all(filesToListPromises);
  const filesToListMd = filesToList
    .sort((a, b) => b.published - a.published)
    .map(({
      href,
      published,
      title,
    }) => (
      `- [${title}](${href}) | ${moment(published).format('Do MMMM YYYY')}`
    ))
    .join('\n');

  return filesToListMd;
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
        let fileContents = await readFile(file, 'utf8');

        if (fileName === '-list') {
          fileContents += await getFilesListMd(file);
        }

        const baseBody = md.render(fileContents);
        body = emojione.unicodeToImage(baseBody);
      } else if (fileExtension === '.yaml') {
        // YAML (recipe) files
        const recipe = yaml.load(file);
        body = recipeTemplate({
          ...recipe,
        });
      } else if (fileExtension === '.json') {
        // JSON (recipe) files
        const jsonFile = await readFile(file, 'utf8');
        const recipe = JSON.parse(jsonFile);
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

      let back;
      const location = relPath.substr(0, relPath.lastIndexOf('/'));

      if (location && !['index', '-list'].includes(fileName)) {
        const backHref = `/${location}`;
        const backTitle = backHref;
        back = {
          href: backHref,
          title: backTitle,
        };
      }

      const html = baseTemplate({
        body,
        css,
        favicons,
        back,
        JS: jsObj,
        meta: Object.keys(md.meta).length > 0 ? {
          ...md.meta,
          title: md.meta.title.replace('\\', ''),
        } : false,
      });

      md.meta = {};

      let modifiedOutputPath;

      if (fileName !== 'index') {
        // An underscore at the start of the fileName prevents us from creating a directory
        if (fileName[0] === '_') {
          // Remember to remove leading underscore
          modifiedOutputPath = `${dirName}/${fileName.substr(1)}.html`;
        } else if (fileName === '-list') {
          modifiedOutputPath = `${dirName}/index.html`;
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
