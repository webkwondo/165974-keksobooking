'use strict';

(function () {

  var VALUE_ANY = 'any';
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var Price = {
    MIDDLE: 'middle',
    LOW: 'low',
    HIGH: 'high'
  };

  var map = document.querySelector('.map');
  var mapFiltersForm = map.querySelector('.map__filters');
  var mapFilterType = mapFiltersForm.querySelector('#housing-type');
  var mapFilterPrice = mapFiltersForm.querySelector('#housing-price');
  var mapFilterRooms = mapFiltersForm.querySelector('#housing-rooms');
  var mapFilterGuests = mapFiltersForm.querySelector('#housing-guests');

  var compareValues = function (mapFilterValue, offerValue) {
    return mapFilterValue === VALUE_ANY || offerValue === mapFilterValue;
  };

  var comparePrice = function (offerPrice) {
    var selectedPrice = mapFilterPrice.value;
    switch (selectedPrice) {
      case Price.MIDDLE:
        return offerPrice >= MIN_PRICE && offerPrice < MAX_PRICE;
      case Price.LOW:
        return offerPrice < MIN_PRICE;
      case Price.HIGH:
        return offerPrice >= MAX_PRICE;
      default:
        return true;
    }
  };

  var compareFeatures = function (selectedFeaturesValues, offerFeatures) {
    for (var i = 0; i < selectedFeaturesValues.length; i++) {
      if (!offerFeatures.includes(selectedFeaturesValues[i])) {
        return false;
      }
    }
    return true;
  };

  var getFilteredOffers = function (data) {
    var mapFilterFeaturesSelectedOptions = mapFiltersForm.querySelectorAll('input[name="features"]:checked');
    var features = Array.from(mapFilterFeaturesSelectedOptions);
    var selectedFeaturesValues = features.map(function (it) {
      return it.value;
    });

    return data.filter(function (it) {
      if (!compareValues(mapFilterType.value, it.offer.type) ||
          !comparePrice(it.offer.price) ||
          !compareValues(mapFilterRooms.value, it.offer.rooms.toString()) ||
          !compareValues(mapFilterGuests.value, it.offer.guests.toString()) ||
          !compareFeatures(selectedFeaturesValues, it.offer.features)) {
        return false;
      }
      return true;
    });
  };

  window.filter = {
    getFilteredOffers: getFilteredOffers
  };

})();
