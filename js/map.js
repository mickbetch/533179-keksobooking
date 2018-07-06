'use strict';

(function () {
  var TEMPLATE = document.querySelector('template').content;
  var TEMPLATE_MAP_CARD = TEMPLATE.querySelector('.map__card');
  var TEMPLATE_MAP_PIN = TEMPLATE.querySelector('.map__pin');
  var MAP = document.querySelector('.map');
  var PLACE_BEFORE_CARD_LIST = MAP.querySelector('.map__filters-container');
  var FORM = document.forms[1];
  var FIELDSETS = document.forms[1].querySelectorAll('fieldset');
  var addressInput = FORM.querySelector('#address');
  var MAP_PIN_MAIN_HEIGHT = 84;
  var MAP_PIN_MAIN_HALF_WIDTH = 32;
  var MAP_PIN_LIST = MAP.querySelector('.map__pins');
  var MAP_PIN_MAIN = MAP.querySelector('.map__pin--main');
  var STYLE_MAP_PIN_MAIN = getComputedStyle(MAP_PIN_MAIN);
  var MAP_PIN_MAIN_START_LEFT = MAP_PIN_MAIN.offsetLeft + 'px';
  var MAP_PIN_MAIN_START_TOP = MAP_PIN_MAIN.offsetTop + 'px';
  var FILTER_FORM = document.querySelector('.map__filters');
  var block = document.querySelector('.map__overlay');

  var Code = {
    ESC: 27,
    ENTER: 13,
    SPACE: 32
  };

  var limits = {
    top: 130,
    bottom: 630,
    right: block.offsetLeft + block.offsetWidth,
    left: block.offsetLeft
  };

  var mapData = [];

  var PIN_LIMIT_ON_MAP = 5;

  var calculateDistance = function (item) {
    var mainPinCoords = window.getMainPinCoords();
    var catX = mainPinCoords.x - item.location.x;
    var catY = mainPinCoords.y - item.location.y;
    var distance = Math.floor(Math.sqrt(Math.pow(catX, 2) + Math.pow(catY, 2)));

    return distance;
  };

  var renderMap = function () {
    if (mapData === undefined || mapData === null) {
      window.utils.messageError('Массив объявлений не инициализирован');
      return;
    }
    var data = mapData;
    window.utils.removeElems();
    closePopup();
    var filteredData = window.filter(data);
    filteredData.sort(function (a, b) {
      return calculateDistance(a) - calculateDistance(b);
    });
    pasteMapPins(filteredData);
  };

  var onDataLoadSuccess = function (data) {
    mapData = data;
    window.debounce(renderMap);
  };

  var onDataLoadError = function (error) {
    var errorElem = document.createElement('div');
    errorElem.classList.add('error', 'error--bottom');
    errorElem.textContent = error;
    document.body.insertAdjacentElement('afterbegin', errorElem);
    setTimeout(window.utils.hideErrorMessage, 3000, errorElem);
    document.addEventListener('click', function () {
      window.utils.hideErrorMessage(errorElem);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === Code.ESC) {
        window.utils.hideErrorMessage(errorElem);
      }
    });
  };

  var openPopup = function () {
    var mapCard = document.querySelector('.map__card');
    mapCard.classList.remove('hidden');
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === Code.ESC) {
      closePopup();
    }
  };

  var closePopup = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.classList.add('hidden');
    }
    window.utils.removeActiveClass();

  };

  var onPopupCloseClick = function () {
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  var getClickedMapPinData = function (elem) {
    var offerIndex = parseInt(elem.id, 10);
    return mapData[offerIndex];
  };

  var renderMapPin = function (item, template, index) {
    var mapPin = template.cloneNode(true);
    var mapPinWidth = mapPin.style.width;
    var mapPinHeight = mapPin.style.height;
    mapPin.style = 'left: ' + (item.location.x - (mapPinWidth / 2)) + 'px; top: ' + (item.location.y - mapPinHeight) + 'px;';
    mapPin.querySelector('img').src = item.author.avatar;
    mapPin.querySelector('img').alt = item.offer.title[index];
    mapPin.id = index;
    mapPin.addEventListener('click', onMapPinClick);
    return mapPin;
  };

  var pasteMapPins = function (data) {
    var length = Math.min(data.length, PIN_LIMIT_ON_MAP);
    var mapPinFragment = document.createDocumentFragment();
    for (var i = 0; i < length; i++) {
      mapPinFragment.appendChild(renderMapPin(data[i], TEMPLATE_MAP_PIN, i));
    }
    MAP_PIN_LIST.appendChild(mapPinFragment);
  };

  var renderMapCard = function (template, data) {
    var oldOfferElem = MAP.querySelector('.map__card');
    var offerElem = window.offer.createMapCard(template, data);
    if (oldOfferElem) {
      MAP.replaceChild(offerElem, oldOfferElem);
    } else {
      MAP.insertBefore(window.offer.createMapCard(template, data), PLACE_BEFORE_CARD_LIST);
    }
  };

  var onMapPinClick = function (evt) {
    window.utils.removeActiveClass();
    evt.currentTarget.classList.add('map__pin--active');
    renderMapCard(TEMPLATE_MAP_CARD, getClickedMapPinData(evt.currentTarget), onDataLoadError);
    onPopupCloseClick();
    openPopup();
  };

  var getInputAddressCoordinates = function (coordinates, width, height) {
    var string = (parseInt(coordinates.left, 10) + width) + ', ' + (parseInt(coordinates.top, 10) + height);
    return string;
  };

  var toogleDisabledOnArrayElements = function (arr, isDisabled) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', isDisabled);
    }
  };

  var convertOffsetToCoords = function (x, y) {
    return {
      x: x + MAP_PIN_MAIN_HALF_WIDTH,
      y: y + MAP_PIN_MAIN_HEIGHT
    };
  };

  var convertCoordsToOffset = function (coord) {
    return {
      x: coord.x - MAP_PIN_MAIN_HALF_WIDTH,
      y: coord.y - MAP_PIN_MAIN_HEIGHT
    };
  };

  var removeDisabledOnArrayElements = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled');
    }
  };

  var showActiveMap = function () {
    MAP.classList.remove('map--faded');
    FORM.classList.remove('ad-form--disabled');
    removeDisabledOnArrayElements(FIELDSETS);
    removeDisabledOnArrayElements(FILTER_FORM.children);
    window.backend.download(onDataLoadSuccess, onDataLoadError);
    window.form.syncTypeWithMinPrice();
    window.form.syncRoomsWithGuests();
  };

  var onMapPinMainMouseUp = function () {
    showActiveMap();
    MAP_PIN_MAIN.removeEventListener('mouseup', onMapPinMainMouseUp);
    MAP_PIN_MAIN.removeEventListener('keydown', onMapPinMainPressEnter);
  };

  var onMapPinMainPressEnter = function (evt) {
    if (evt.keyCode === Code.ENTER || evt.keyCode === Code.SPACE) {
      showActiveMap();
    }
    MAP_PIN_MAIN.removeEventListener('mouseup', onMapPinMainMouseUp);
    MAP_PIN_MAIN.removeEventListener('keydown', onMapPinMainPressEnter);
  };

  MAP_PIN_MAIN.addEventListener('mouseup', onMapPinMainMouseUp);
  MAP_PIN_MAIN.addEventListener('keydown', onMapPinMainPressEnter);
  MAP_PIN_MAIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.pageX,
        y: startCoords.y - moveEvt.pageY
      };
      var currentCoords = convertOffsetToCoords(MAP_PIN_MAIN.offsetLeft, MAP_PIN_MAIN.offsetTop);
      var newCoords = {
        x: currentCoords.x - shift.x,
        y: currentCoords.y - shift.y
      };
      if (newCoords.y > limits.bottom) {
        newCoords.y = limits.bottom;
      } else if (newCoords.y < limits.top) {
        newCoords.y = limits.top;
      }
      if (newCoords.x > limits.right) {
        newCoords.x = limits.right;
      } else if (newCoords.x < limits.left) {
        newCoords.x = limits.left;
      }
      // ------------
      window.getMainPinCoords = function () {
        return newCoords;
      };
      window.map.newCoords = newCoords;
      // ------------------
      var offsets = convertCoordsToOffset(newCoords);
      MAP_PIN_MAIN.style.top = offsets.y + 'px';
      MAP_PIN_MAIN.style.left = offsets.x + 'px';
      addressInput.value = newCoords.x + ', ' + newCoords.y;
      startCoords = {
        x: moveEvt.pageX,
        y: moveEvt.pageY
      };
      window.debounce(renderMap);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      addressInput.value = getInputAddressCoordinates(MAP_PIN_MAIN.style, MAP_PIN_MAIN_HALF_WIDTH, MAP_PIN_MAIN_HEIGHT);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var setStartMapPinCoords = function () {
    MAP_PIN_MAIN.style.left = MAP_PIN_MAIN_START_LEFT;
    MAP_PIN_MAIN.style.top = MAP_PIN_MAIN_START_TOP;
  };

  var deleteMapPins = function (parentElem, classNameOfDeletedChildren) {
    var mapPins = parentElem.querySelectorAll(classNameOfDeletedChildren);
    for (var i = 0; i < mapPins.length; i++) {
      parentElem.removeChild(mapPins[i]);
    }
  };

  var hideActiveMap = function () {
    MAP.classList.add('map--faded');
    FORM.classList.add('ad-form--disabled');
    FORM.reset();
    toogleDisabledOnArrayElements(FIELDSETS, true);
    deleteMapPins(MAP_PIN_LIST, '.map__pin:not(.map__pin--main)');
    setStartMapPinCoords();
    closePopup();
    addressInput.value = getInputAddressCoordinates(STYLE_MAP_PIN_MAIN, MAP_PIN_MAIN_HALF_WIDTH, MAP_PIN_MAIN_HEIGHT);
    MAP_PIN_MAIN.addEventListener('mouseup', onMapPinMainMouseUp);
    MAP_PIN_MAIN.addEventListener('keydown', onMapPinMainPressEnter);
  };
  addressInput.value = getInputAddressCoordinates(MAP_PIN_MAIN.style, MAP_PIN_MAIN_HALF_WIDTH, MAP_PIN_MAIN_HEIGHT);
  toogleDisabledOnArrayElements(FIELDSETS, true);
  toogleDisabledOnArrayElements(FILTER_FORM.children, true);


  FILTER_FORM.addEventListener('change', function () {
    window.debounce(renderMap);
  });
  FILTER_FORM.addEventListener('keydown', function (evt) {
    if (evt.keyCode === Code.ENTER && evt.target.name === 'features') {
      evt.target.checked = !evt.target.checked;
      window.debounce(renderMap);
    }
  });

  window.map = {
    hideActiveMap: hideActiveMap,
    onDataLoadError: onDataLoadError,
    mapData: mapData
  };
})();


