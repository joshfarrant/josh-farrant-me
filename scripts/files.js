const fs = require('fs');
const path = require('path');
const util = require('util');

const mkdirpCb = require('mkdirp');
const ncpCb = require('ncp').ncp;
const rimrafCb = require('rimraf');

const { flatten } = require('./utils');

ncpCb.limit = 16;

const mkdirp = util.promisify(mkdirpCb);
const ncp = util.promisify(ncpCb);
const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const rimraf = util.promisify(rimrafCb);
const stat = util.promisify(fs.stat);
const write = util.promisify(fs.write);
const writeFile = util.promisify(fs.writeFile);

// Make sure build directory exists and is empty
const clearDir = async (dir) => {
  try {
    await rimraf(dir);
    console.log(`Removed directory ${dir}`);
  } catch (err) {
    console.error(`Error removing directory ${dir} : ${err}`);
    process.exit(1);
  }
};

// Make sure build directory exists and is empty
const ensureDirExists = async (dir) => {
  try {
    await mkdirp(dir);
    console.log(`Created directory ${dir}`);
  } catch (err) {
    console.error(`Error creating directory ${dir} : ${err}`);
    process.exit(1);
  }
};

const getFiles = async (dir, flattenFiles = true) => {
  try {
    const subdirs = await readDir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }));
    const filesArr = files.reduce((a, f) => ([...a, f]), []);
    return flattenFiles ? flatten(filesArr) : filesArr;
  } catch (err) {
    console.error(`Error getting files in directory ${dir} : ${err}`);
    return [];
  }
};

const copyFilesInDir = async (...args) => ncp(...args);

module.exports = {
  clearDir,
  copyFilesInDir,
  ensureDirExists,
  getFiles,
  readFile,
  writeFile,
  write,
};
