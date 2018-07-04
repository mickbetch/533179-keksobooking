'use strict';

(function () {
  var TIMEOUT = 5000;
  var SERVER_STATUS_OK = 200;
  var RESPONSE_DATA_LENGTH = 5;

  var ERRORS = {
    generalError: function (status) {
      return 'Статус ответа: ' + status;
    },
    connectionError: function () {
      return 'Произошла ошибка соединения';
    },
    timeoutError: function (timeout) {
      return 'Запрос не успел выполниться за ' + timeout + ' мс';
    }
  };

  var serverUrl = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  /**
   * Подрезает полученный из сервера массив данных
   * @param {Array} response - Ответ сервера
   * @return {Array}
   */
  var sliceXhrGetResponse = function (response) {
    if (Array.isArray(response)) {
      return response.slice(0, RESPONSE_DATA_LENGTH);
    }
    return response;
  };

  var createXhr = function (responseType, timeout) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = responseType;
    xhr.timeout = timeout;

    return xhr;
  };

  var processXhr = function (onLoad, onError, responseModifier) {
    var xhr = createXhr('json', TIMEOUT);

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_STATUS_OK) {
        if (responseModifier) {
          onLoad(responseModifier(xhr.response));
        }	else {
          onLoad(xhr.response);
        }
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
    var response = processXhr(onLoad, onError, sliceXhrGetResponse);

    response.open('GET', serverUrl.DOWNLOAD);
    response.send();
  };

  var upload = function (data, onLoad, onError) {
    var response = processXhr(onLoad, onError);

    response.open('POST', serverUrl.UPLOAD);
    response.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
