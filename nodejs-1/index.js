const data = require('./data.json');

let rang = 0;

function recorsiveTree(tree) {
  if (!tree.hasOwnProperty('items')) {
    drawConsoleTree(tree.name, rang);
  } else if (Array.isArray(tree.items)) {
    drawConsoleTree(tree.name, rang);
    rang++;
    tree.items.forEach((item, index) => {
        if (tree.items.length - 1 === index) {
            recorsiveTree(item);
            rang--;
        } else {
            recorsiveTree(item);
        }
    });
  } else {
    throw new Error('Ошибка в структуре данных. items не является массивом');
  }
}

function drawConsoleTree(name, rang) {
    if (rang !== 0) {
        const spaceLevel = rang > 1 ? " ".repeat(rang * 2) : "";
        console.log(`${spaceLevel}|`);
        console.log(`${spaceLevel}|___${name}`);
    }
}

function init() {
    console.log(data.name);
    recorsiveTree(data);
}

init();

