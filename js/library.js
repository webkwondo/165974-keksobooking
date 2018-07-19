'use strict';

(function () {

  var generateRandomNumber = function (rangeMin, rangeMax) {
    var randomNumber = rangeMin + Math.floor(Math.random() * (rangeMax + 1 - rangeMin));
    return randomNumber;
  };

  var isInArray = function (needle, haystack) {
    for (var i = 0; i < haystack.length; i++) {
      if (haystack[i] === needle) {
        return true;
      }
    }
    return false;
  };

  var getRandomArrayItems = function (arr, num, toString, ordered) {
    if (typeof arr !== 'undefined' && arr.length > 0) {
      var randomArrayKeys = [];
      var randomArrayItems = [];
      var sortNumber = function (a, b) {
        return a - b;
      };

      for (var i = 0; i < num; i++) {
        var k = generateRandomNumber(0, arr.length - 1);
        if (!isInArray(k, randomArrayKeys)) {
          randomArrayKeys.push(k);
        } else {
          i--;
        }
      }

      if (ordered) {
        randomArrayKeys.sort(sortNumber);
      }

      for (var x = 0; x < randomArrayKeys.length; x++) {
        var randomArrayItem = arr[randomArrayKeys[x]];
        randomArrayItems[x] = randomArrayItem;
      }

      if (toString) {
        randomArrayItems = randomArrayItems.join(', ');
      }
      return randomArrayItems;
    }

    return 0;
  };

  var getElementWidth = function (element) {
    var elementWidth = element.offsetWidth;
    return elementWidth;
  };

  var getElementHeight = function (element) {
    var elementHeight = element.offsetHeight;
    return elementHeight;
  };

  var isEscEvent = function (evt, keyCodeKey, action, elem) {
    if (evt.keyCode === keyCodeKey) {
      action(elem);
      return true;
    }
    return false;
  };

  window.library = {
    generateRandomNumber: generateRandomNumber,
    isInArray: isInArray,
    getRandomArrayItems: getRandomArrayItems,
    getElementWidth: getElementWidth,
    getElementHeight: getElementHeight,
    isEscEvent: isEscEvent
  };

})();
