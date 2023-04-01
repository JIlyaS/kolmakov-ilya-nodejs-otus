importScripts("./socket.io.min.js");

const socket = io({ transports: ['websocket'] });

// function requestPermission() {
//   return new Promise(function(resolve, reject) {
//     const permissionResult = Notification.requestPermission(function(result) {
//       // Поддержка устаревшей версии с функцией обратного вызова.
//       resolve(result);
//     });

//     if (permissionResult) {
//       permissionResult.then(resolve, reject);
//     }
//   })
//   .then(function(permissionResult) {
//     if (permissionResult !== 'granted') {
//       throw new Error('Permission not granted.');
//     }
//   });
// }

self.addEventListener('install', (event) => {
    console.log('Установлен');

    // const socket = io();
    // requestPermission().then(() => {
    //   socket.on('message', (msg) => {
    //     new Notification(msg.message);
    //   });
    // });

    // socket.on('message', (msg) => console.log(msg.message));
});

self.addEventListener('push', function(event) {
  var promise = self.registration.showNotification('Push notification!');

  event.waitUntil(promise);
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');
});

self.addEventListener('message', (event) => {
    console.log('000');
  if (event.data.type === 'start') {
    console.log('123');
  }
});