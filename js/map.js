'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var offerTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var coordinateMinY = 130;
var coordinateMaxY = 630;
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var priceMin = 1000;
var priceMax = 1000000;
var roomsMin = 1;
var roomsMax = 5;
var guestsMin = 1;
var guestsMax = 20;
var offerPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getOfferType = function (str) {
  var offerType = '';
  if (str.search(/дворец/i) !== -1) {
    offerType = 'palace';
  } else if (str.search(/квартира/i) !== -1) {
    offerType = 'flat';
  } else if (str.search(/домик/i) !== -1) {
    offerType = 'house';
  } else if (str.search(/бунгало/i) !== -1) {
    offerType = 'bungalo';
  }
  return offerType;
};

var getUserAvatar = function (id) {
  var userAvatar = 'img/avatars/user0' + id + '.png';
  return userAvatar;
};

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

var sortNumber = function (a, b) {
  return a - b;
};

var getRandomArrayItems = function (arr, num, toString, ordered) {
  if (typeof arr !== 'undefined' && arr.length > 0) {
    var randomArrayKeys = [];
    var randomArrayItems = [];
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

var getCoordinateX = function (minX, maxX) {
  var locationX = generateRandomNumber(minX, maxX);
  return locationX;
};

var getCoordinateY = function (minY, maxY) {
  var locationY = generateRandomNumber(minY, maxY);
  return locationY;
};

var similarOffers = [];

for (var i = 0; i < 8; i++) {
  similarOffers[i] =
  {
    author: {
      avatar: getUserAvatar(i + 1)
    },

    offer: {
      title: offerTitle[i],
      address: '',
      price: generateRandomNumber(priceMin, priceMax),
      type: '',
      rooms: generateRandomNumber(roomsMin, roomsMax),
      guests: generateRandomNumber(guestsMin, guestsMax),
      checkin: getRandomArrayItems(checkinTime, 1, true),
      checkout: getRandomArrayItems(checkoutTime, 1, true),
      features: getRandomArrayItems(features, generateRandomNumber(0, features.length), false, true),
      description: '',
      photos: getRandomArrayItems(offerPhotos, offerPhotos.length)
    },

    location: {
      x: getCoordinateX(0, getElementWidth(map)),
      y: getCoordinateY(coordinateMinY, coordinateMaxY)
    }
  };

  similarOffers[i].offer.type = getOfferType(similarOffers[i].offer.title);
  similarOffers[i].offer.address = similarOffers[i].location.x + ', ' + similarOffers[i].location.y;
}

var similarMapPins = map.querySelector('.map__pins');
var similarMapPinsTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');

var renderMapPin = function (similarOffer) {
  var mapPinElement = similarMapPinsTemplate.cloneNode(true);

  mapPinElement.style.left = similarOffer.location.x + 'px';
  // mapPinElement.style.left = (similarOffer.location.x - mapPinElement.offsetWidth / 2) + 'px';
  // console.log(mapPinElement.offsetWidth);
  // console.log(similarOffer.location.x);
  mapPinElement.style.top = similarOffer.location.y + 'px';
  // mapPinElement.style.top = (similarOffer.location.y - mapPinElement.offsetHeight) + 'px';
  // console.log(mapPinElement.offsetHeight);
  // console.log(similarOffer.location.y);
  mapPinElement.querySelector('img').src = similarOffer.author.avatar;
  mapPinElement.querySelector('img').alt = similarOffer.offer.title;

  return mapPinElement;
};

var fragment = document.createDocumentFragment();

for (var d = 0; d < similarOffers.length; d++) {
  fragment.appendChild(renderMapPin(similarOffers[d]));
}
similarMapPins.appendChild(fragment);

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

var renderMapCard = function (similarOffer) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('.popup__avatar').src = similarOffer.author.avatar;
  mapCardElement.querySelector('.popup__title').textContent = similarOffer.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = similarOffer.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = similarOffer.offer.price + '₽/ночь';
  mapCardElement.querySelector('.popup__type').textContent = renderSimilarOfferType(similarOffer.offer.type);
  mapCardElement.querySelector('.popup__text--capacity').textContent = similarOffer.offer.rooms + ' комнаты для ' + similarOffer.offer.guests + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarOffer.offer.checkin + ', выезд до ' + similarOffer.offer.checkout;

  var similarOfferFeaturesHtml = '';
  for (var u = 0; u < similarOffer.offer.features.length; u++) {
    var similarOfferFeatureHtml = '<li class="popup__feature popup__feature--' + similarOffer.offer.features[u] + '"></li>';
    similarOfferFeaturesHtml += similarOfferFeatureHtml;
  }
  mapCardElement.querySelector('.popup__features').innerHTML = similarOfferFeaturesHtml;

  mapCardElement.querySelector('.popup__description').textContent = similarOffer.offer.description;

  var offerPhotosElement = mapCardElement.querySelector('.popup__photos');
  var offerPhotoElement = mapCardElement.querySelector('.popup__photo');
  var offerPhotoTempElement = offerPhotosElement.removeChild(offerPhotoElement);
  for (var n = 0; n < similarOffer.offer.photos.length; n++) {
    var offerPhotoElementCopy = offerPhotoTempElement.cloneNode();
    offerPhotoElementCopy.src = similarOffer.offer.photos[n];
    offerPhotosElement.appendChild(offerPhotoElementCopy);
  }

  return mapCardElement;
};

fragment.appendChild(renderMapCard(similarOffers[0]));
map.insertBefore(fragment, mapFiltersContainer);