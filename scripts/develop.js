/* eslint-disable import/no-extraneous-dependencies */
const bs = require('browser-sync').create();
/* eslint-enable import/no-extraneous-dependencies */

const build = require('./build');
const {
  FILES,
} = require('./constants');

(async () => {
  await build.develop();

  bs.watch(`${FILES.STYLES.SRC}/**/*.*`).on('change', async () => {
    await build.sass();
    await build.typography();
    await build.md(); // To inject styles again
    bs.reload();
  });

  bs.watch(`${FILES.JS.ROOT}/**/*.*`).on('change', async () => {
    await build.md();
    bs.reload();
  });

  bs.watch(`${FILES.CONTENT.SRC}/**/*.*`).on('change', async () => {
    await build.md();
    bs.reload();
  });

  bs.watch(`${FILES.PHOTOS.SRC}/**/*.*`).on('change', async () => {
    await build.copyAndBuildPhotos();
    bs.reload();
  });

  bs.watch(FILES.TEMPLATES.SRC.PHOTOS).on('change', async () => {
    await build.buildPhotosTemplates();
    bs.reload();
  });

  bs.watch(FILES.TEMPLATES.SRC.RECIPE).on('change', async () => {
    await build.md(); // To inject styles again
    bs.reload();
  });

  bs.watch(FILES.TEMPLATES.SRC.BASE).on('change', async () => {
    await build.md();
    await build.buildPhotosTemplates();
    bs.reload();
  });

  // Now init the Browsersync server
  bs.init({
    server: 'build',
    files: 'src',
    port: 5000,
    ui: {
      port: 5001,
    },
  });
})();
