'use strict';

(function () {

  var isEscEvent = function (evt, keyCodeKey, action, elem) {
    if (evt.keyCode === keyCodeKey) {
      action(elem);
      return true;
    }
    return false;
  };

  window.utils = {
    isEscEvent: isEscEvent
  };

})();
