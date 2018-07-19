'use strict';

(function () {

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  var activateAdFormFields = function (adFormFieldsEnabled) {
    for (var f = 0; f < adFormFieldsets.length; f++) {
      if (!adFormFieldsEnabled) {
        adFormFieldsets[f].disabled = true;
      } else {
        adFormFieldsets[f].disabled = false;
      }
    }
  };

  activateAdFormFields(false);

  var mapActive = false;

  var activateMap = function () {
    map.classList.remove('map--faded');
    mapActive = true;
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    mapActive = false;
  };

  var activateAdForm = function () {
    adForm.classList.remove('ad-form--disabled');
    activateAdFormFields(true);
  };

  var deactivateAdForm = function () {
    adForm.classList.add('ad-form--disabled');
    activateAdFormFields(false);
  };

  var activateSystem = function () {
    activateMap();
    activateAdForm();
  };

  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPinMainWidth = window.library.getElementWidth(mapPinMain);
  var mapPinMainHeight = window.library.getElementHeight(mapPinMain);

  var getMapPinMainCoords = function () {
    var mapPinMainCoords = '';
    if (!mapActive) {
      mapPinMainCoords = (mapPinMain.offsetLeft + mapPinMainWidth / 2) + ', ' + (mapPinMain.offsetTop + mapPinMainHeight / 2);
    } else {
      mapPinMainCoords = (mapPinMain.offsetLeft + window.constant.MAP_PIN_MAIN_WIDTH / 2) + ', ' + (mapPinMain.offsetTop + window.constant.MAP_PIN_MAIN_HEIGHT);
    }
    return mapPinMainCoords;
  };

  var adFormAdressInput = adForm.querySelector('#address');

  var writeMapPinMainCoords = function () {
    adFormAdressInput.value = getMapPinMainCoords();
  };

  writeMapPinMainCoords();

  var mapPinMainStartPositionLeft = mapPinMain.style.left;
  var mapPinMainStartPositionTop = mapPinMain.style.top;

  var mapPinMainReset = function () {
    mapPinMain.style.left = mapPinMainStartPositionLeft;
    mapPinMain.style.top = mapPinMainStartPositionTop;
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      writeMapPinMainCoords();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var limitLeft = 0 - window.constant.MAP_PIN_MAIN_WIDTH / 2;
      var limitRight = map.offsetWidth - window.constant.MAP_PIN_MAIN_WIDTH / 2;
      var limitTop = window.constant.COORDINATE_MIN_Y - window.constant.MAP_PIN_MAIN_HEIGHT;
      var limitBottom = window.constant.COORDINATE_MAX_Y - window.constant.MAP_PIN_MAIN_HEIGHT;

      if (mapActive) {
        limitLeft = 0 - mapPinMain.offsetWidth / 2;
        limitRight = map.offsetWidth - mapPinMain.offsetWidth / 2;
        limitTop = window.constant.COORDINATE_MIN_Y - mapPinMain.offsetHeight;
        limitBottom = window.constant.COORDINATE_MAX_Y - mapPinMain.offsetHeight;
      }

      var mapPinMainCoordX = mapPinMain.offsetLeft - shift.x;
      var mapPinMainCoordY = mapPinMain.offsetTop - shift.y;

      mapPinMain.style.left = mapPinMainCoordX + 'px';

      if (mapPinMainCoordX < limitLeft) {
        mapPinMain.style.left = limitLeft + 'px';
      } else if (mapPinMainCoordX > limitRight) {
        mapPinMain.style.left = limitRight + 'px';
      } else if (mapPinMainCoordY < limitTop) {
        mapPinMain.style.top = limitTop + 'px';
      } else if (mapPinMainCoordY > limitBottom) {
        mapPinMain.style.top = limitBottom + 'px';
      } else {
        mapPinMain.style.top = mapPinMainCoordY + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!mapActive) {
        activateSystem();
        writeMapPinMainCoords();
        window.pin.displaySimilarMapPins();
        window.map.addClickHandlerToMapPins();
      }
      writeMapPinMainCoords();

      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.activate = {
    activateSystem: activateSystem,
    deactivateMap: deactivateMap,
    deactivateAdForm: deactivateAdForm,
    mapPinMainReset: mapPinMainReset
  };

})();
