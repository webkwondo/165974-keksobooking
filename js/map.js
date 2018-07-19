'use strict';

(function () {

  var map = document.querySelector('.map');
  var similarMapPins = map.querySelector('.map__pins');

  var addClickHandlerToMapPins = function () {
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
        mapCardPopup = window.card.displayMapCard(offerid);
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

  window.map = {
    addClickHandlerToMapPins: addClickHandlerToMapPins
  };

})();
