const fs = require('fs');

const argvs = process.argv.splice(2);

const argvObj = {};

argvs.forEach((argv) => {
  const argvEntity = argv.split('=');
  argvObj[argvEntity[0].slice(2).toUpperCase()] = Number(argvEntity[1]);
});

// console.log(argvObj['MAX-OLD-SPACE-SIZE']);

const generateFileNumberSize = async () => {
    try {
        const isExists = fs.existsSync('bigFile.txt');
        if (!isExists) {
            console.log('no exists');
          await fs.promises.writeFile('bigFile.txt', '').then((data) => console.log('data', data));
        }
        let fileStat = await fs.promises.stat('bigFile.txt');
        console.log(fileStat);
        // console.log(typeof fileStat["size"]);

        while(fileStat["size"] <= 104857600) {
            await fs.promises.appendFile('bigFile.txt', `${Math.floor(Math.random() * 100) + 1} `, { flag: "a+"});
            fileStat = await fs.promises.stat('bigFile.txt');
            console.log(fileStat["size"]);
          }
    } catch (err) {
      console.log(err);
    }
    // const file = await fs.promises.stat();
}

generateFileNumberSize();