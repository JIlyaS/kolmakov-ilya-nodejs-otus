const path = require('path');
const fs = require('fs');
const express = require('express');
const app = require('express')();

// Добавил самоподписные сертификаты
const options = {
    key: fs.readFileSync('./public/certs/localhost.key').toString(),
    cert: fs.readFileSync('./public/certs/localhost.crt').toString()
  };

  app.use(express.static('public'));

// Сделал сервер через https
const server = require('https').createServer(options, app);

// const io = require('socket.io')(server);
const { Server } = require('socket.io');
const io = new Server(server, options);

const PORT = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('user connected');
//   socket.emit('connect', { message: 'a new client connected'});

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (msg) =>
    {
        io.emit('send message', { message: msg, user: socket.username});
    });

    socket.on('user', (usr) => {
      socket.username = usr;
      console.log('User connected - Username: ' + socket.username);
    });

    setInterval(() => {
        io.emit('message', { message: "Передаются данные на фронт каждые 10 секунд"}); // user: socket.username
    }, 10000);
});

server.listen(PORT, function () {
    console.log(`Lisening on port ${PORT}`);
});