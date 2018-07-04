'use strict';

(function () {
  var TIMEOUT = 5000;

  var SERVER_STATUS_OK = 200;

  var ERRORS = {
    generalError: function (status) {
      return 'Статус ответа: ' + status;
    },
    connectionError: function () {
      return 'Произошла ошибка соединения';
    },
    timeoutError: function (timeout) {
      return 'Запрос не успел выполниться за ' + timeout + 'мс';
    }
  };

  var serverUrl = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var getData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_STATUS_OK) {
        onLoad(xhr.response);
      }	else {
        onError(ERRORS.generalError(xhr.status));
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERRORS.connectionError());
    });

    xhr.addEventListener('timeout', function () {
      onError(ERRORS.timeoutError(xhr.timeout));
    });

    return xhr;
  };

  var download = function (onLoad, onError) {
    var xhr = getData(onLoad, onError);

    xhr.open('GET', serverUrl.DOWNLOAD);
    xhr.send();
  };

  var upload = function (data, onLoad, onError) {
    var xhr = getData(onLoad, onError);

    xhr.open('POST', serverUrl.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
