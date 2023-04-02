importScripts("./socket.io.min.js");

const socket = io({ transports: ['websocket'] });

self.addEventListener('install', (event) => {
    console.log('Установлен');
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
    console.log('Происходит запрос на сервер');
});

// На стороне Service worker слушаем событие message
self.addEventListener('message', (event) => {
  if (event.data.type === 'start') {

    socket.on('message', (msg) =>  {
      postMessage({ type: 'message', payload: msg.message })
    });

    // или так, показ уведомления из sw.js, возможно работать не будет
    // self.registration.showNotification("title", {
    //   title: msg.message
    // });
  }

  if (event.data.type === 'stop') {
    if (socket) {
      socket.close();
    }
  }
});