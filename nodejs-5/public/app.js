if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('Registration succeeded. Scope is ' + reg.scope);

        // Прослушиваем ответ от сервис воркера
        navigator.serviceWorker.onmessage = (event) => {
          if (event.data && event.data.type === 'REPLY_COUNT_CLIENTS') {
            setCount(event.data.count);
          }
        };
    })
      .catch((err) => console.log('Registration failed with ' + err));
  });
  }

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
        throw new Error('Разрешение не предоставлено.');
      }
    });
  }

  requestPermission();

  /* ------------------------------------------- */

const worker = new Worker("sw.js");

// Через сервис воркер показываем уведомление
if (window.Notification && Notification.permission !== "denied") {
  Notification.requestPermission((status) => {
    if (status === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Уведомление через Service worker", {
          body: "Тело нового уведомления",
        });
      });
    }
  })
}

const SECOND = 1000;
const COUNT_SECONDS = 10;

worker.addEventListener('message', (event) => {
  if (event.data.type === 'message') {
    const message = event.data.payload;
    
    showNotification(message);
  }
});

/* ------------------------------------------------- */

let notification;
// Функция показа уведомления
function showNotification(message) {
   // закрываем предыдущее уведомление
   if (notification) {
    notification.close()
  }
  
  // Создаем уведомление с заголовоком - в итоге уведомление не показывается!
  console.log('Показ сообщения в уведомлении: ', message);
  notification = new Notification("Уведомление", { body: message });
  
  // Закрыть уведомление через 10 секунд
  setTimeout(() => notification.close(), COUNT_SECONDS*SECOND);

  // Срабатывает при отображении уведомлений
  notification.addEventListener('show', function(){
    console.log('Notification show');
  });
  
  // Срабатывает когда уведомление отклоняется
  notification.addEventListener('close', function(){
    console.log('Notification close');
  });
  
  // Срабатывает при возникновении ошибки, которое блокирует уведомление
  notification.addEventListener('error', function(){
    console.log('Notification error');
  });
};

/* ------------------------------------------------- */

/* Обработчики событий для показа и отключения уведомлений */

document.querySelector('.js-start').addEventListener('click', () => {
  worker.postMessage({ type: 'start' })
})

document.querySelector('.js-stop').addEventListener('click', () => {
  worker.postMessage({ type: 'stop' })
});

/* ------------------------------------------------- */

/* Альтернативный способ показа уведомлений */
/* Показываем дефолтное уведомление сразу */

(async () => {
  function showError () {
    const error = document.querySelector('.error');
    error.style.display = 'block';
    error.textContent = 'You blocked the notifications';
  }

  let notification;
// Функция показа уведомления - Дублирование функционала показа уведомления
function showNotification(message) {
   // закрываем предыдущее уведомление
   if (notification) {
    notification.close()
  }
  
  // Создаем уведомление с заголовоком
  notification = new Notification("Уведомление", { body: message });
  
  // Закрыть уведомление через 10 секунд
  setTimeout(() => notification.close(), COUNT_SECONDS*SECOND);

  // Срабатывает при отображении уведомлений
  notification.addEventListener('show', function(){
    console.log('Notification show');
  });
  
  // Срабатывает когда уведомление отклоняется
  notification.addEventListener('close', function(){
    console.log('Notification close');
  });
  
  // Срабатывает при возникновении ошибки, которое блокирует уведомление
  notification.addEventListener('error', function(){
    console.log('Notification error');
  });
};

let permission = await Notification.requestPermission();

  let granted = false;

  if (Notification.permission === 'granted') {
      granted = true;
  } else if (Notification.permission !== 'denied') {
      let permission = await Notification.requestPermission();
      granted = permission === 'granted' ? true : false;
  }

  granted ? showNotification() : showError();
})();