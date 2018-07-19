'use strict';

(function () {

  var map = document.querySelector('.map');
  var similarMapPins = map.querySelector('.map__pins');
  var similarMapPinsTemplate = document.querySelector('template')
      .content
      .querySelector('.map__pin');

  var renderMapPin = function (similarOffer, id) {
    var mapPinElement = similarMapPinsTemplate.cloneNode(true);

    mapPinElement.style.left = (similarOffer.location.x - window.constant.MAP_PIN_WIDTH / 2) + 'px';
    mapPinElement.style.top = (similarOffer.location.y - window.constant.MAP_PIN_HEIGHT) + 'px';
    mapPinElement.querySelector('img').src = similarOffer.author.avatar;
    mapPinElement.querySelector('img').alt = similarOffer.offer.title;
    mapPinElement.dataset.offerid = id;

    return mapPinElement;
  };

  var displaySimilarMapPins = function () {
    var fragment = document.createDocumentFragment();

    for (var d = 0; d < window.data.similarOffers.length; d++) {
      fragment.appendChild(renderMapPin(window.data.similarOffers[d], d));
    }
    similarMapPins.appendChild(fragment);
  };

  var clearMapPins = function () {
    var mapPins = map.querySelectorAll('.map__pin');

    for (var mp = 0; mp < mapPins.length; mp++) {
      if (mapPins[mp].parentNode && !mapPins[mp].classList.contains('map__pin--main')) {
        mapPins[mp].parentNode.removeChild(mapPins[mp]);
      }
    }
  };

  window.pin = {
    displaySimilarMapPins: displaySimilarMapPins,
    clearMapPins: clearMapPins
  };

})();
