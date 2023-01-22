#!/usr/bin/env node

console.log("123");

const argList = process.argv.splice(2);
console.log(argList);

const argObj = {};

argList.forEach((arg) => {
  const argEntity = arg.split("=");
  if (
    (/--/i.test(argEntity[0]) && argEntity[0].slice(2) === "depth") ||
    (/-/i.test(argEntity[0]) && argEntity[0].slice(1) === "d")
  ) {
    argObj.depth = Number(argEntity[1]);
  } else {
    console.log("Error");
  }
});

console.log(argObj);
