'use strict';

(function () {

  window.data = {
    similarOffers: []
  };

  var onSuccess = function (downloadedData) {
    window.data.similarOffers = downloadedData;
  };

  // Пока черновая функция вывода ошибки
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    // console.log('Ошибка: ' + errorMessage);
  };

  window.backend.download(window.constant.DOWNLOAD_URL, onSuccess, onError);

})();
