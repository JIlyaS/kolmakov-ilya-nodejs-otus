#!/usr/bin/env node

const path = require("path");
const { readdir, stat } = require("node:fs/promises");

// Объект для параметров командной строки
const argObj = {};
// Путь до директории
argObj.pathDir = process.argv[2];

//  Получение параметров из командной строки
argObj.depth = _getArgList(process.argv.splice(3));

function _getArgList(argvs) {
  let depth = 0; 
  argvs.forEach((arg) => {
    const argEntity = arg.split("=");
    if (
      (/--/i.test(argEntity[0]) && argEntity[0].slice(2) === "depth") ||
      (/-/i.test(argEntity[0]) && argEntity[0].slice(1) === "d")
    ) {
      depth = Number(argEntity[1]);
    } else {
      console.error("Error");
    }
  });

  return depth;
}

function _printTree(data, level = 0, argDepth) {
  // console.log('data', data);
  // console.log('123', data, level, argObj);
  // console.log(level, argObj.depth, level);
  if (level === argDepth) {
    return 0;
  }

  console.log(
    `${!level ? '' : '|  '.repeat(level - 1) + (data.items ? '├──' : '└──')}${
      data.name
    }`
  );

  data.items?.forEach((item) => {
    _printTree(item, level + 1, argDepth);
  });
}

const info = {
  directories: 0,
  files: 0,
};

const _readDirFiles = async (currPath, dataFile, info) => {
  console.log(currPath, dataFile, info);
  try {
    console.log('currPath', currPath);
    const files = await readdir(currPath);
    console.log('files', files);

    for (const file of files) {
      const fileItem = path.resolve(currPath, file);
      const fileStat = await stat(fileItem);
      if (fileStat.isFile()) {
        dataFile.push({name: file});
        info.files++;
      } else if (fileStat.isDirectory()) {
        dataFile.push({ name: file, items: [] });
        info.directories++;
        _readDirFiles(fileItem, dataFile[dataFile.length-1].items, info);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

const currentPath = path.resolve(__dirname, argObj.pathDir);
const data = {};
data.name = path.basename(currentPath);
data.items = [];

const init = async () => {
  // await _getArgList(process.argv.splice(3));
  await _readDirFiles(currentPath, data.items, info);
  // Не работает await на вложенных массивах
  setTimeout(() => {
    _printTree(data, 0, argObj.depth);
    console.log(`${info.directories} director${info.directories > 1 ? "ies" : "y"}, ${info.files} file${info.files > 1 ? "s" : ""}`);
  });
  // await printTree(data);
}

// init();

module.exports = {
  init,
  _getArgList,
  _printTree,
  _readDirFiles,
};


