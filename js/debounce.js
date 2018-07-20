'use strict';

(function () {

  var DEBOUNCE_TIMEOUT = 500;
  var lastTimeout = null;

  var setDebounce = function (callback) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(callback, DEBOUNCE_TIMEOUT);
  };

  window.debounce = {
    setDebounce: setDebounce
  };

})();
