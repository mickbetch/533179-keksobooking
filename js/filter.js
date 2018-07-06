'use strict';

(function () {
  var FILTER_FORM = document.querySelector('.map__filters');
  var selectElems = FILTER_FORM.querySelectorAll('.map__filter');
  var featureCheckboxElems = FILTER_FORM.querySelectorAll('input[type="checkbox"]');

  var PRICE_RANGES = {
    low: 10000,
    high: 50000
  };

  var checkType = function (offerType, filterType) {
    return filterType === 'any' || filterType === offerType.toString();
  };

  var getRentCostRange = function (offerRentCost) {
    if (offerRentCost < PRICE_RANGES.low) {
      return 'low';
    } else if (offerRentCost >= PRICE_RANGES.high) {
      return 'high';
    } else {
      return 'middle';
    }
  };

  var checkRentCost = function (offerRentCost, filtersCost) {
    return filtersCost === 'any' || filtersCost === getRentCostRange(offerRentCost);
  };

  var checkFeatures = function (offerFeatures, neededFeatures) {
    return neededFeatures.every(function (feature) {
      return offerFeatures.indexOf(feature) > -1;
    });
  };

  selectElems.forEach(function (selectElem) {
    selectElem.dataset.feature = selectElem.id.replace(/housing-/i, '');
  });

  var filters = Array.from(selectElems).reduce(function (acc, selectedOption) {
    var optionName = selectedOption.dataset.feature;
    acc[optionName] = selectedOption.options[selectedOption.selectedIndex].value;

    return acc;
  }, {});

  filters.features = Array.from(featureCheckboxElems)
    .filter(function (checkedBox) {
      return checkedBox.checked;
    })
    .map(function (checkedBox) {
      return checkedBox.value;
    });

  var filterOffers = function (rent) {
    return checkType(rent.offer.type, filters.type) &&
      checkType(rent.offer.rooms, filters.rooms) &&
      checkType(rent.offer.guests, filters.guests) &&
      checkRentCost(rent.offer.price, filters.price) &&
      checkFeatures(rent.offer.features, filters.features);
  };

  var filterRents = function (data) {
    return data.filter(filterOffers(data));
  };


  var onFilterFormElemChange = function () {
    window.map.closePopup();
    window.utils.removeElems();
    window.map.pasteMapPins(window.map.applyLimitForItemsOnMap(filterRents(window.map.mapData)));
  };

  FILTER_FORM.addEventListener('change', function () {
    window.debounce(onFilterFormElemChange);
  });

  window.filter = filterRents;

})();
