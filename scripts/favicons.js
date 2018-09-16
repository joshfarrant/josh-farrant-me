const util = require('util');

const faviconsCb = require('favicons');

const { FILES } = require('./constants');
const {
  copyFilesInDir,
  ensureDirExists,
  readFile,
  writeFile,
} = require('./files');
const pkg = require('../package.json');

const favicons = util.promisify(faviconsCb);

const src = FILES.FAVICONS.SRC;
const config = {
  path: '/assets/favicons', // Path for overriding default icons path. `string`
  appName: 'Josh Farrant', // Your application's name. `string`
  appDescription: 'The personal website of Josh Farrant', // Your application's description. `string`
  developerName: 'Josh Farrant', // Your (or your developer's) name. `string`
  developerURL: 'https://josh.farrant.me', // Your (or your developer's) URL. `string`
  dir: 'auto', // Primary text direction for name, short_name, and description
  lang: 'en-GB', // Primary language for name and short_name
  background: '#000', // Background colour for flattened icons. `string`
  theme_color: '#ff79c6', // Theme color user for example in Android's task switcher. `string`
  display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  start_url: '/', // Start URL when launching the application from a device. `string`
  version: pkg.version, // Your application's version string. `string`
  logging: true, // Print logs to console? `boolean`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }`
    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }`
    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }`
    coast: false, // Create Opera Coast icon. `boolean` or `{ offset, background }`
    favicons: true, // Create regular favicons. `boolean`
    firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background }`
    windows: true, // Create Windows 8 tile icons. `boolean` or `{ background }`
    yandex: false, // Create Yandex browser icon. `boolean` or `{ background }`
  },
};

const generate = async () => {
  const {
    files,
    html,
    images,
  } = await favicons(src, config);

  ensureDirExists(FILES.FAVICONS.TEMP);

  files.forEach(async (file) => {
    const destination = `${FILES.FAVICONS.TEMP}/${file.name}`;
    console.log(`Creating file ${destination}`);
    return writeFile(destination, file.contents);
  });

  images.forEach(async (image) => {
    const destination = `${FILES.FAVICONS.TEMP}/${image.name}`;
    console.log(`Creating file ${destination}`);
    return writeFile(destination, image.contents);
  });

  await writeFile(FILES.FAVICONS.HTML, html.join('\n'));
};

const copyFavicons = async () => {
  const faviconsHtml = await readFile(FILES.FAVICONS.HTML, 'utf8');
  await ensureDirExists(FILES.FAVICONS.OUTPUT);
  await copyFilesInDir(FILES.FAVICONS.TEMP, FILES.FAVICONS.OUTPUT, {
    filter: str => !str.includes('html.txt'),
  });

  console.log('Copied favicons');
  return faviconsHtml;
};

module.exports = {
  copyFavicons,
  generate,
};
