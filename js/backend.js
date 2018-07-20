'use strict';

(function () {

  var RESPONSE_TYPE = 'json';
  var TIMEOUT = 20000;
  var HttpStatusCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };
  var StatusErrorMessage = {
    BAD_REQUEST: 'Извините, произошла ошибка в запросе к серверу',
    NOT_FOUND: 'Извините, произошла ошибка соединения с сервером',
    SERVER_ERROR: 'Извините, сервер ошибся',
    UNKNOWN_STATUS: 'Неизвестный статус: '
  };

  var download = function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case HttpStatusCode.SUCCESS:
          onLoad(xhr.response);
          break;
        case HttpStatusCode.BAD_REQUEST:
          error = StatusErrorMessage.BAD_REQUEST;
          break;
        case HttpStatusCode.NOT_FOUND:
          error = StatusErrorMessage.NOT_FOUND;
          break;
        case HttpStatusCode.SERVER_ERROR:
          error = StatusErrorMessage.SERVER_ERROR;
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', url);
    xhr.send();
  };

  var upload = function (url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === HttpStatusCode.SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Извините, произошла ошибка соединения: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };

})();
