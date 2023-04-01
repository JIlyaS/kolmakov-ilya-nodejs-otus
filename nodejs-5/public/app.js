// const socket = io();

// socket.on('message', (msg) => console.log(msg.message));

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        // navigator.serviceWorker.ready.then((worker) => {
        //     worker.sync.register('syncdata')
        // })
        console.log('Registration succeeded. Scope is ' + reg.scope);
    })
      .catch((err) => console.log('Registration failed with ' + err));
  }

// function subscribeUserToPush() {
//   return navigator.serviceWorker.register('sw.js')
//   .then(function(registration) {

//     console.log('Registration succeeded. Scope is ' + registration.scope);

//     var subscribeOptions = {
//       userVisibleOnly: true,
//       applicationServerKey: btoa(
//         'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
//       )
//     };

//     return registration.pushManager.subscribe(subscribeOptions);
//   })
//   .then(function(pushSubscription) {
//     console.log('PushSubscription: ', JSON.stringify(pushSubscription));
//     return pushSubscription;
//   })
//   .catch((err) => console.log('Registration failed with ' + err));
// }

  // Поддержка Push-уведомлений
  function requestPermission() {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        // Поддержка устаревшей версии с функцией обратного вызова.
        resolve(result);
      });
  
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
    .then(function(permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('Permission not granted.');
      }
    });
  }

  requestPermission();
  // subscribeUserToPush();