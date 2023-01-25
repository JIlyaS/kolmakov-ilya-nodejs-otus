#!/usr/bin/env node

const path = require("path");
const { readdir, stat } = require("node:fs/promises");

// Объект для параметров командной строки
const argObj = {};
// Путь до директории
argObj.pathDir = process.argv[2];

getArgList(process.argv.splice(3));

function getArgList(argvs) {
  argvs.forEach((arg) => {
    const argEntity = arg.split("=");
    if (
      (/--/i.test(argEntity[0]) && argEntity[0].slice(2) === "depth") ||
      (/-/i.test(argEntity[0]) && argEntity[0].slice(1) === "d")
    ) {
      argObj.depth = Number(argEntity[1]);
    } else {
      console.error("Error");
    }
  });
}

function printTree(data, level = 0) {

  if (level > argObj.depth) {
    return;
  }

  console.log(
    `${!level ? '' : '|  '.repeat(level - 1) + (data.items ? '├──' : '└──')}${
      data.name
    }`
  );

  data.items?.forEach((item) => {
    printTree(item, level + 1);
  });
}

const info = {
  directories: 0,
  files: 0,
};

const readDirFiles = async (currPath, dataFile) => {
  try {
    const files = await readdir(currPath);

    for (const file of files) {
      const fileItem = path.resolve(currPath, file);
      const fileStat = await stat(fileItem);
      if (fileStat.isFile()) {
        dataFile.push({name: file});
        info.files++;
      } else if (fileStat.isDirectory()) {
        dataFile.push({ name: file, items: [] });
        info.directories++;
        readDirFiles(fileItem, dataFile[dataFile.length-1].items);
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
  await readDirFiles(currentPath, data.items);
  // Не работает await на вложенных массивах
  setTimeout(() => {
    printTree(data);
    console.log(`${info.directories} director${info.directories > 1 ? "ies" : "y"}, ${info.files} file${info.files > 1 ? "s" : ""}`);
  });
  // await printTree(data);
}

init();

module.exports = init;


