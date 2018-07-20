'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormTitleInput = adForm.querySelector('#title');

  adFormTitleInput.addEventListener('invalid', function () {
    if (adFormTitleInput.validity.tooShort) {
      adFormTitleInput.setCustomValidity('Заголовок объявления должен быть минимум 30 символов');
    } else if (adFormTitleInput.validity.tooLong) {
      adFormTitleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (adFormTitleInput.validity.valueMissing) {
      adFormTitleInput.setCustomValidity('Обязательное поле');
    } else {
      adFormTitleInput.setCustomValidity('');
    }
  });

  var adFormTypeSelect = adForm.querySelector('#type');
  var adFormPriceInput = adForm.querySelector('#price');
  var adFormPriceInputMin = adFormPriceInput.min;
  var adFormPriceInputPlaceholder = adFormPriceInput.placeholder;

  var setMinPrice = function () {
    var adFormTypeSelectedValue = adFormTypeSelect.options[adFormTypeSelect.selectedIndex].value;

    switch (adFormTypeSelectedValue) {
      case 'bungalo':
        adFormPriceInputMin = 0;
        break;
      case 'flat':
        adFormPriceInputMin = 1000;
        break;
      case 'house':
        adFormPriceInputMin = 5000;
        break;
      case 'palace':
        adFormPriceInputMin = 10000;
        break;
    }
    adFormPriceInputPlaceholder = adFormPriceInputMin;
    adFormPriceInput.min = adFormPriceInputMin;
    adFormPriceInput.placeholder = adFormPriceInputPlaceholder;
  };

  var onPriceInputInvalid = function () {
    if (adFormPriceInput.validity.rangeUnderflow) {
      adFormPriceInput.setCustomValidity('Цена не может быть меньше ' + adFormPriceInputMin + ' руб.');
    } else if (adFormPriceInput.validity.rangeOverflow) {
      adFormPriceInput.setCustomValidity('Цена не может превышать 1000000 руб.');
    } else if (adFormPriceInput.validity.valueMissing) {
      adFormPriceInput.setCustomValidity('Обязательное поле');
    } else {
      adFormPriceInput.setCustomValidity('');
    }
  };

  adFormTypeSelect.addEventListener('change', function () {
    setMinPrice();
  });

  adFormPriceInput.addEventListener('invalid', onPriceInputInvalid);

  adFormPriceInput.addEventListener('change', function () {
    adFormPriceInput.addEventListener('invalid', onPriceInputInvalid);
  });

  var adFormCheckinTimeSelect = adForm.querySelector('#timein');
  var adFormCheckoutTimeSelect = adForm.querySelector('#timeout');

  var syncAdFormCheckinTimeAndCheckoutTime = function () {
    var clickedSelect = null;

    var onSelectChange = function (evt) {
      clickedSelect = evt.currentTarget;
      if (clickedSelect === adFormCheckinTimeSelect) {
        adFormCheckoutTimeSelect.value = adFormCheckinTimeSelect.options[adFormCheckinTimeSelect.selectedIndex].value;
      } else {
        adFormCheckinTimeSelect.value = adFormCheckoutTimeSelect.options[adFormCheckoutTimeSelect.selectedIndex].value;
      }
    };

    adFormCheckinTimeSelect.addEventListener('change', onSelectChange);
    adFormCheckoutTimeSelect.addEventListener('change', onSelectChange);
  };

  syncAdFormCheckinTimeAndCheckoutTime();

  var adFormRoomsSelect = adForm.querySelector('#room_number');
  var adFormCapacitySelect = adForm.querySelector('#capacity');
  var adFormCapacitySelectOptions = adFormCapacitySelect.options;
  var adFormCapacitySelectOption0 = adFormCapacitySelect.querySelector('option[value="0"]');
  var adFormCapacitySelectOption1 = adFormCapacitySelect.querySelector('option[value="1"]');
  var adFormCapacitySelectOption2 = adFormCapacitySelect.querySelector('option[value="2"]');
  var adFormCapacitySelectOption3 = adFormCapacitySelect.querySelector('option[value="3"]');

  var syncAdFormRoomsAndCapacity = function () {
    for (var op = 0; op < adFormCapacitySelectOptions.length; op++) {
      adFormCapacitySelectOptions[op].disabled = false;
    }

    var adFormRoomsSelectedValue = adFormRoomsSelect.options[adFormRoomsSelect.selectedIndex].value;

    switch (adFormRoomsSelectedValue) {
      case '1':
        adFormCapacitySelectOption0.disabled = true;
        adFormCapacitySelectOption2.disabled = true;
        adFormCapacitySelectOption3.disabled = true;
        break;
      case '2':
        adFormCapacitySelectOption0.disabled = true;
        adFormCapacitySelectOption3.disabled = true;
        break;
      case '3':
        adFormCapacitySelectOption0.disabled = true;
        break;
      case '100':
        adFormCapacitySelectOption1.disabled = true;
        adFormCapacitySelectOption2.disabled = true;
        adFormCapacitySelectOption3.disabled = true;
        break;
    }
  };

  syncAdFormRoomsAndCapacity();

  adFormRoomsSelect.addEventListener('change', function () {
    syncAdFormRoomsAndCapacity();
    if (adFormCapacitySelect.options[adFormCapacitySelect.selectedIndex].disabled === true) {
      adFormCapacitySelect.setCustomValidity('Недопустимое значение. Пожалуйста, попробуйте выбрать заново');
    } else {
      adFormCapacitySelect.setCustomValidity('');
    }
  });

  adFormCapacitySelect.addEventListener('change', function () {
    if (adFormCapacitySelect.options[adFormCapacitySelect.selectedIndex].disabled === true) {
      adFormCapacitySelect.setCustomValidity('Недопустимое значение. Пожалуйста, попробуйте выбрать заново');
    } else {
      adFormCapacitySelect.setCustomValidity('');
    }
  });

  var adFormReset = adForm.querySelector('.ad-form__reset');

  var resetMap = function () {
    var map = document.querySelector('.map');
    var mapFiltersForm = map.querySelector('.map__filters');
    var mapCardPopup = map.querySelector('.map__card');
    if (mapCardPopup) {
      window.card.closeMapCard(mapCardPopup);
    }
    window.pin.clearMapPins();
    window.activate.deactivateMap();
    window.activate.resetMapPinMain();
    mapFiltersForm.reset();
  };

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    setMinPrice();
    resetMap();
    window.activate.deactivateAdForm();
  });

  var adFormSuccessBlock = document.querySelector('.success');

  var onAdFormSuccessBlockEscPress = function (evt) {
    window.utils.isEscEvent(evt, window.constant.ESC_KEYCODE, closeAdFormSuccessBlock, adFormSuccessBlock);
    document.removeEventListener('keydown', onAdFormSuccessBlockEscPress);
  };

  var displayAdFormSuccessBlock = function () {
    adFormSuccessBlock.classList.remove('hidden');
    adFormSuccessBlock.addEventListener('click', function () {
      closeAdFormSuccessBlock(adFormSuccessBlock);
    });
    document.addEventListener('keydown', onAdFormSuccessBlockEscPress);
  };

  var closeAdFormSuccessBlock = function (elem) {
    elem.classList.add('hidden');
  };

  var adFormErrorMessagePosition = 'relative';
  var adFormErrorMessagePositionTop = '0';

  var onFormSubmitSuccess = function (response) {
    if (response) {
      adForm.reset();
      setMinPrice();
      resetMap();
      displayAdFormSuccessBlock();
    }
  };

  var onFormSubmitError = function (errorMessage) {
    window.message.displayError(errorMessage, adFormErrorMessagePosition, adFormErrorMessagePositionTop, adForm);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(window.constant.UPLOAD_URL, new FormData(adForm), onFormSubmitSuccess, onFormSubmitError);
    evt.preventDefault();
  });

})();
