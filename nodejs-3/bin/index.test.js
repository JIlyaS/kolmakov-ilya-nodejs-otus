const {
    init,
  _getArgList,
  _printTree,
  _readDirFiles,
} = require('./index.js');

// const fs = require("fs-extra");
const fs = require("fs");
const { vol } = require('memfs');
const path = require("path");
const { ufs } = require('unionfs');

// ufs.use(fs1).use(fs2);

// jest.mock("path");
// jest.mock("fs");
// jest.mock("node:fs/promises");

describe('printTree function test', () => {
    // it('no data printTree', () => {
    //     const argObj = {name: "", depth: 0};
    //     _getArgList([ '../', '-d=0' ]);

    //     expect(_printTree({}, 0)).toBe(0);
    // });
});

describe('getArgList', () => {
    it('getArgList should get arg d number = 0', () => {
        expect(_getArgList([ '../', '-d=0' ])).toBe(0);
    });

    it('getArgList should get arg d number = 2', () => {
        expect(_getArgList([ '../', '-d=2' ])).toBe(2);
    });

    it('getArgList should get arg depth number = 3', () => {
        expect(_getArgList([ '../', '--depth=3' ])).toBe(3);
    });
});

describe('readDirFiles', () => {
    beforeEach(() => {
        vol.reset();
        fs.mkdirSync("./test", { recursive: true });
        fs.mkdirSync("./test/data");
        fs.mkdirSync("./test/data2");
    });

    afterEach(() => {
        vol.reset();
        fs.rmSync("./test", { recursive: true, force: true });
    });

  it('readDirFiles should', async () => {
    const data = {};
    data.name = "";
    data.items = [];
    const info = {
        directories: 0,
        files: 0,
    };

    const currentPath = path.resolve(__dirname, "./test");

    // const json = {
    //     "./test/file1.txt": "1",
    //     "./test/file2.txt": "2",
    // };

    // vol.fromJSON(json, "/tmp");

    await _readDirFiles(currentPath, data.items, info);

    await console.log('info', info);

    await expect(info.directories).toBe(2);
  })
});