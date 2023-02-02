// process.stdin.pipe(process.stdout);

// не работает
// const buffer = require("buffer");
// const { Transform } = require("node:stream");

// process.stdin.setEncoding("utf8");

// const uppercase = new Transform({
//     transform(chunk, encoding, callback) {
//       let chankString = '';
//       if (chunk instanceof String) {
//         chankString = chunk;
//     //   } else if (chunk instanceof Buffer) {
//     //     chankString = chunk.toString(encoding);
//       } else {
//         callback(new Error('Wrong data type'));
//       }
//       const transformed = chunk.toString(encoding).toUpperCase();
//       callback(null, transformed);
//     }
// });

// process.stdin.pipe(uppercase).pipe(process.stdout);

// работает
// const {PassThrough} = require('stream');
// const fs = require('fs');

// const d = new PassThrough();

// fs.createReadStream(__filename).pipe(d);

// d.pipe(process.stdout);

const fs = require('fs');

const request = fs.createReadStream(__filename);

let body = [];

request.on('data', (chunk) => {
    body.push(chunk);
    console.log("NEW CHUNK");
    console.log(JSON.stringify(body, null, 2));
}).on('end', () => {
    body = Buffer.concat(body).toString();

    console.log(body);
})

