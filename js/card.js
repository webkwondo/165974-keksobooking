'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapCardTemplate = document.querySelector('template')
      .content
      .querySelector('.map__card');

  var renderSimilarOfferType = function (type) {
    var similarOfferType = '';

    switch (type) {
      case 'flat':
        similarOfferType = 'Квартира';
        break;
      case 'bungalo':
        similarOfferType = 'Бунгало';
        break;
      case 'house':
        similarOfferType = 'Дом';
        break;
      case 'palace':
        similarOfferType = 'Дворец';
        break;
    }

    return similarOfferType;
  };

  var renderMapCard = function (similarOffer, id) {
    var mapCardElement = mapCardTemplate.cloneNode(true);

    mapCardElement.querySelector('.popup__avatar').src = similarOffer.author.avatar;
    mapCardElement.querySelector('.popup__title').textContent = similarOffer.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = similarOffer.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = similarOffer.offer.price + '₽/ночь';
    mapCardElement.querySelector('.popup__type').textContent = renderSimilarOfferType(similarOffer.offer.type);
    mapCardElement.querySelector('.popup__text--capacity').textContent = similarOffer.offer.rooms + ' комнаты для ' + similarOffer.offer.guests + ' гостей';
    mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarOffer.offer.checkin + ', выезд до ' + similarOffer.offer.checkout;

    var popupFeatures = mapCardElement.querySelector('.popup__features');
    var similarOfferFeaturesHtml = '';
    for (var u = 0; u < similarOffer.offer.features.length; u++) {
      var similarOfferFeatureHtml = '<li class="popup__feature popup__feature--' + similarOffer.offer.features[u] + '"></li>';
      similarOfferFeaturesHtml += similarOfferFeatureHtml;
    }
    popupFeatures.innerHTML = '';
    popupFeatures.insertAdjacentHTML('afterbegin', similarOfferFeaturesHtml);

    mapCardElement.querySelector('.popup__description').textContent = similarOffer.offer.description;

    var popupPhotos = mapCardElement.querySelector('.popup__photos');
    var popupPhoto = mapCardElement.querySelector('.popup__photo');
    var popupPhotoTemp = popupPhotos.removeChild(popupPhoto);
    for (var n = 0; n < similarOffer.offer.photos.length; n++) {
      var popupPhotoCopy = popupPhotoTemp.cloneNode();
      popupPhotoCopy.src = similarOffer.offer.photos[n];
      popupPhotos.appendChild(popupPhotoCopy);
    }

    mapCardElement.dataset.offerid = id;

    return mapCardElement;
  };

  var displayMapCard = function (offerId) {
    var mapCard = map.insertBefore(renderMapCard(window.data.similarOffers[offerId], offerId), mapFiltersContainer);

    var onMapCardEscPress = function (evt) {
      window.library.isEscEvent(evt, window.constant.ESC_KEYCODE, closeMapCard, mapCard);
      if (window.library.isEscEvent(evt, window.constant.ESC_KEYCODE, closeMapCard, mapCard)) {
        map.removeEventListener('keydown', onMapCardEscPress);
      }
    };

    map.addEventListener('keydown', onMapCardEscPress);

    return mapCard;
  };

  var closeMapCard = function (mapCard) {
    if (mapCard.parentNode) {
      mapCard.parentNode.removeChild(mapCard);
    }
  };

  window.card = {
    displayMapCard: displayMapCard,
    closeMapCard: closeMapCard
  };

})();
