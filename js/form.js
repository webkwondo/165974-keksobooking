'use strict';

(function () {

  var Type = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var Rooms = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    HUNDRED: '100'
  };

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
      case Type.BUNGALO:
        adFormPriceInputMin = MinPrice.BUNGALO;
        break;
      case Type.FLAT:
        adFormPriceInputMin = MinPrice.FLAT;
        break;
      case Type.HOUSE:
        adFormPriceInputMin = MinPrice.HOUSE;
        break;
      case Type.PALACE:
        adFormPriceInputMin = MinPrice.PALACE;
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

  adFormPriceInput.addEventListener('change', onPriceInputInvalid);

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
      case Rooms.ONE:
        adFormCapacitySelectOption0.disabled = true;
        adFormCapacitySelectOption2.disabled = true;
        adFormCapacitySelectOption3.disabled = true;
        break;
      case Rooms.TWO:
        adFormCapacitySelectOption0.disabled = true;
        adFormCapacitySelectOption3.disabled = true;
        break;
      case Rooms.THREE:
        adFormCapacitySelectOption0.disabled = true;
        break;
      case Rooms.HUNDRED:
        adFormCapacitySelectOption1.disabled = true;
        adFormCapacitySelectOption2.disabled = true;
        adFormCapacitySelectOption3.disabled = true;
        break;
    }
  };

  syncAdFormRoomsAndCapacity();

  var checkAdFormCapacitySelect = function () {
    if (adFormCapacitySelect.options[adFormCapacitySelect.selectedIndex].disabled) {
      adFormCapacitySelect.setCustomValidity('Недопустимое значение. Пожалуйста, попробуйте выбрать заново');
    } else {
      adFormCapacitySelect.setCustomValidity('');
    }
  };

  adFormRoomsSelect.addEventListener('change', function () {
    syncAdFormRoomsAndCapacity();
    checkAdFormCapacitySelect();
  });

  adFormCapacitySelect.addEventListener('change', function () {
    checkAdFormCapacitySelect();
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

  var resetAdForm = function () {
    adForm.reset();
    setMinPrice();
    syncAdFormRoomsAndCapacity();
    window.file.removeAdFormFiles();
    window.activate.deactivateAdForm();
  };

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetAdForm();
    resetMap();
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

  var adFormErrorMessageClass = 'message-block--form-error';

  var onFormSubmitSuccess = function (response) {
    if (response) {
      resetAdForm();
      resetMap();
      displayAdFormSuccessBlock();
    }
  };

  var onFormSubmitError = function (errorMessage) {
    window.message.displayError(errorMessage, adFormErrorMessageClass, adForm);
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.upload(window.constant.UPLOAD_URL, new FormData(adForm), onFormSubmitSuccess, onFormSubmitError);
    evt.preventDefault();
  });

})();
