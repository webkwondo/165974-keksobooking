'use strict';

(function () {

  var map = document.querySelector('.map');
  var similarMapPins = map.querySelector('.map__pins');
  // var mapErrorMessagePosition = 'absolute';
  // var mapErrorMessagePositionTop = '38%';
  var mapErrorMessageClass = 'message-block--error';
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var similarOffers = [];
  var similarOffersLimited = [];
  var downloadError = false;
  var downloadErrorMessage = '';

  var onDownloadSuccess = function (downloadedData) {
    similarOffers = downloadedData;
    similarOffersLimited = similarOffers.slice(window.constant.NUMBER_OF_SIMILAR_OFFERS_START, window.constant.NUMBER_OF_SIMILAR_OFFERS);
  };

  var onDownloadError = function (errorMessage) {
    if (errorMessage) {
      downloadError = true;
      downloadErrorMessage = errorMessage;
    } else {
      downloadError = false;
    }
  };

  window.backend.download(window.constant.DOWNLOAD_URL, onDownloadSuccess, onDownloadError);

  var addClickHandlerToMapPins = function (data) {
    var clickedElement = null;
    var offerid = 0;
    var mapCardPopup = '';
    var mapCardPopupCloseButton = '';

    var onMapPinClick = function (evt) {
      if (clickedElement) {
        window.card.closeMapCard(mapCardPopup);
        clickedElement.classList.remove('map__pin--active');
      }

      clickedElement = evt.currentTarget;
      offerid = clickedElement.dataset.offerid;

      if (!clickedElement.classList.contains('map__pin--main')) {
        clickedElement.classList.add('map__pin--active');
        mapCardPopup = window.card.displayMapCard(data, offerid);
        mapCardPopupCloseButton = mapCardPopup.querySelector('.popup__close');
        mapCardPopupCloseButton.addEventListener('click', function () {
          window.card.closeMapCard(mapCardPopup);
          clickedElement.classList.remove('map__pin--active');
        });
      }
    };

    var mapPins = similarMapPins.querySelectorAll('.map__pin');

    for (var m = 0; m < mapPins.length; m++) {
      mapPins[m].addEventListener('click', onMapPinClick);
    }
  };

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
  var mapPinMainWidth = mapPinMain.offsetWidth;
  var mapPinMainHeight = mapPinMain.offsetHeight;

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

  var resetMapPinMain = function () {
    mapPinMain.style.left = mapPinMainStartPositionLeft;
    mapPinMain.style.top = mapPinMainStartPositionTop;
    writeMapPinMainCoords();
  };

  var mapPinMainPositionLimits = {
    limitLeft: 0 - window.constant.MAP_PIN_MAIN_WIDTH / 2,
    limitRight: map.offsetWidth - window.constant.MAP_PIN_MAIN_WIDTH / 2,
    limitTop: window.constant.COORDINATE_MIN_Y - window.constant.MAP_PIN_MAIN_HEIGHT,
    limitBottom: window.constant.COORDINATE_MAX_Y - window.constant.MAP_PIN_MAIN_HEIGHT
  };

  if (mapActive) {
    mapPinMainPositionLimits = {
      limitLeft: 0 - mapPinMain.offsetWidth / 2,
      limitRight: map.offsetWidth - mapPinMain.offsetWidth / 2,
      limitTop: window.constant.COORDINATE_MIN_Y - mapPinMain.offsetHeight,
      limitBottom: window.constant.COORDINATE_MAX_Y - mapPinMain.offsetHeight
    };
  }

  var limitElementMovement = function (element, position, positionLimits) {
    if (position.x < positionLimits.limitLeft) {
      element.style.left = positionLimits.limitLeft + 'px';
    } else if (position.x > positionLimits.limitRight) {
      element.style.left = positionLimits.limitRight + 'px';
    } else {
      element.style.left = position.x + 'px';
    }

    if (position.y < positionLimits.limitTop) {
      element.style.top = positionLimits.limitTop + 'px';
    } else if (position.y > positionLimits.limitBottom) {
      element.style.top = positionLimits.limitBottom + 'px';
    } else {
      element.style.top = position.y + 'px';
    }
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

      var mapPinMainCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      limitElementMovement(mapPinMain, mapPinMainCoords, mapPinMainPositionLimits);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!mapActive) {
        activateSystem();
        writeMapPinMainCoords();
        if (downloadError) {
          window.message.displayError(downloadErrorMessage, mapErrorMessageClass, map);
        }
        window.pin.displaySimilarMapPins(similarOffersLimited);
        addClickHandlerToMapPins(similarOffersLimited);
      }
      writeMapPinMainCoords();

      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var mapFiltersForm = map.querySelector('.map__filters');

  var onMapFiltersFormChange = function () {
    var changeMapPins = function () {
      var mapCardPopup = map.querySelector('.map__card');
      if (mapCardPopup) {
        window.card.closeMapCard(mapCardPopup);
      }
      window.pin.clearMapPins();
      var filteredOffers = window.filter.getFilteredOffers(similarOffers);
      var filteredOffersLimited = filteredOffers.slice(window.constant.NUMBER_OF_SIMILAR_OFFERS_START, window.constant.NUMBER_OF_SIMILAR_OFFERS);
      window.pin.displaySimilarMapPins(filteredOffersLimited);
      addClickHandlerToMapPins(filteredOffersLimited);
    };

    window.debounce.setDebounce(changeMapPins);
  };

  mapFiltersForm.addEventListener('change', onMapFiltersFormChange);

  window.activate = {
    activateSystem: activateSystem,
    deactivateMap: deactivateMap,
    deactivateAdForm: deactivateAdForm,
    resetMapPinMain: resetMapPinMain
  };

})();
