'use strict';
// Константы, полученные из ТЗ
var ADVERTISEMENT_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var ADVERTISEMENT_TITLES_COPIES = ADVERTISEMENT_TITLES.slice(0, ADVERTISEMENT_TITLES.length);

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var HOUSE_LABELS = {
  'palace': 'дворец',
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало'
};

var CHECK_INS = ['12:00', '13:00', '14:00'];

var CHECK_OUTS = ['12:00', '13:00', '14:00'];

var HOUSE_DESCRIPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var houseDescriptionCopy = HOUSE_DESCRIPTIONS.slice(0, HOUSE_DESCRIPTIONS.length);

var HOUSE_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var HOUSE_PHOTO_COPY = HOUSE_PHOTOS.slice(0, HOUSE_PHOTOS.length);

var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var ADVERTISEMENT_COUNT = 8;

// Константы, связанные с отрисовкой меток и каточек объявлений
var MAP = document.querySelector('.map');
var MAP_PIN_LIST = MAP.querySelector('.map__pins');
var PLACE_BEFORE_CARD_LIST = MAP.querySelector('.map__filters-container');

var TEMPLATE = document.querySelector('template').content;
var TEMPLATE_MAP_CARD = TEMPLATE.querySelector('.map__card');
var TEMPLATE_MAP_PIN = TEMPLATE.querySelector('.map__pin');

var FORM = document.forms[1];
var FIELDSETS = FORM.querySelectorAll('fieldset');
var MAP_PIN_MAIN = MAP.querySelector('.map__pin--main');
var addressInput = FORM.querySelector('#address');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SPACE_KEYCODE = 32;
var STYLE_MAP_PIN_MAIN = getComputedStyle(MAP_PIN_MAIN);
var MAP_PIN_MAIN_HEIGHT = 87;
var MAP_PIN_MAIN_HALF_WIDTH = 32;
var MAP_PIN_MAIN_START_LEFT = '570px';
var MAP_PIN_MAIN_START_TOP = '375px';

var MIN_PRICES = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '10000'
};

var CHECKIN_SELECT_ELEM = FORM.querySelector('select[name="timein"]');

var CHECKOUT_SELECT_ELEM = FORM.querySelector('select[name="timeout"]');

var TYPE_SELECT_ELEM = FORM.querySelector('select[name="type"]');

var PRICE_INPUT_ELEM = FORM.querySelector('input[name="price"]');

var NUM_ROOM_SELECT_ELEM = FORM.querySelector('select[name="rooms"]');

var TITLE_INPUT_ELEM = FORM.querySelector('input[name="title"]');

var CAPACITY_SELECT_ELEM = FORM.querySelector('select[name="capacity"]');

var CAPACITY_NUMBER = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

var INVALID_FIELD_BORDER = '2px solid red';

var VALID_FIELD_BORDER = '';

var FORM_RESET = FORM.querySelector('.ad-form__reset');

/*
* Генерация случайного числа
* {min} number
* {max} number
* */
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/*
* Генерация строки с ведущим нулем типа '01'
* {number} number числовое значение
* {length} number разрядность чила(от 1 до 9 - '1', от 10 и до 99 - '2')
* */
var leadingZeroes = function (number, length) {
  var string = '' + number;
  while (string.length < length) {
    string = '0' + string;
  }
  return string;
};

/*
* Генерация массива адресов картинок, отличающихся номером
* {count} number количество картинок
* */
var generateURLs = function (count) {
  var URLs = [];
  for (var i = 1; i <= count; i++) {
    URLs.push('img/avatars/user' + leadingZeroes(i, 2) + '.png');
  }
  return URLs;
};

// Массив с адресами картинок
var PICTURES = generateURLs(ADVERTISEMENT_COUNT);
var picturesCopies = PICTURES.slice(0, PICTURES.length);

/*
* Создание массива с раположением элементов в слуйчайном порядке
* {arr} arr массив
* */
var shuffleArray = function (arr) {
  var elements = [];
  while (arr.length > 0) {
    var returnedElement = arr.splice(getRandomNumber(0, arr.length - 1), 1);
    elements.push(returnedElement[0]);
  }
  return elements;
};

// Массив случайных элементов с картинками маркера
var RANDOM_LIST_URLS = shuffleArray(picturesCopies);

// Массив случайных элементов с заголовками карточек-объявлений
var RANDOM_LIST_TITLES = shuffleArray(ADVERTISEMENT_TITLES_COPIES);

/*
* Используется с методом массива sort для сортировки элементов массива случайным образом
* */
var compareRandom = function () {
  return Math.random() - 0.5;
};

// Функция получения случайного элемента массива
var getRandomArrayElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

// Функция получения массива с случайной длинной
var getRandomArrayLength = function (arr) {
  var randomLength = getRandomNumber(0, arr.length);
  return arr.slice(0, randomLength);
};

// Функция создания описания удобств жилья
var createFeaturesElem = function (feature) {
  var featureElem = document.createElement('li');
  featureElem.classList.add('popup__feature', 'popup__feature--' + feature);

  return featureElem;
};

var createPhotoElem = function () {
  var photoElem = document.createElement('img');
  photoElem.classList.add('popup__photo');
  photoElem.width = '45';
  photoElem.height = '40';
  photoElem.alt = 'Фотография жилья';

  return photoElem;
};

var cleanNode = function (parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
};

var renderFeaturesElem = function (featuresArr, parentElement) {
  cleanNode(parentElement);
  var featuresFragment = document.createDocumentFragment();
  for (var i = 0; i < featuresArr.length; i++) {
    featuresFragment.appendChild(createFeaturesElem(featuresArr[i]));
  }
  return featuresFragment;
};

var renderPhotoElem = function (photosArr, parentElement) {
  cleanNode(parentElement);
  var featuresFragment = document.createDocumentFragment();
  for (var i = 0; i < photosArr.length; i++) {
    var photo = createPhotoElem();
    photo.src = photosArr[i];
    featuresFragment.appendChild(photo);
  }
  return featuresFragment;
};

// Функция генерации массива объявлений
var generateAdvertisement = function (n) {
  var advertiseList = [];
  var advertiseEl;
  for (var i = 0; i < n; i++) {
    var randomLocation = {
      'x': getRandomNumber(MIN_X, MAX_X),
      'y': getRandomNumber(MIN_Y, MAX_Y)
    };
    advertiseEl = {
      'author': {
        'avatar': RANDOM_LIST_URLS[i]
      },
      'offer': {
        'title': RANDOM_LIST_TITLES[i],
        'address': randomLocation.x + ', ' + randomLocation.y,
        'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': getRandomArrayElement(HOUSE_TYPES),
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 5),
        'checkin': getRandomArrayElement(CHECK_INS),
        'checkout': getRandomArrayElement(CHECK_OUTS),
        'features': getRandomArrayLength(houseDescriptionCopy),
        'description': '',
        'photos': HOUSE_PHOTO_COPY.sort(compareRandom)
      },
      'location': randomLocation
    };
    advertiseList.push(advertiseEl);
  }
  return advertiseList;
};

// Массив объектов с объявлениями
var ADVERTISEMENTS = generateAdvertisement(ADVERTISEMENT_COUNT).slice(0);

var onMapPinClick = function (evt) {
  renderMapCard(TEMPLATE_MAP_CARD, getClickedMapPinId(evt.currentTarget));
  onPopupCloseClick();
  openPopup();
};

// Функция создания маркера-пина
var renderMapPins = function (el, template, index) {
  var mapPin = template.cloneNode(true);
  var mapPinWidth = mapPin.style.width;
  var mapPinHeight = mapPin.style.height;

  mapPin.style = 'left: ' + (el.location.x - (mapPinWidth / 2)) + 'px; top: ' + (el.location.y - mapPinHeight) + 'px;';
  mapPin.querySelector('img').src = el.author.avatar;
  mapPin.querySelector('img').alt = el.offer.title[index];
  mapPin.id = index;
  mapPin.addEventListener('click', onMapPinClick);

  return mapPin;
};

var pasteMapPins = function () {
  var mapPinFragment = document.createDocumentFragment();
  for (var i = 0; i < ADVERTISEMENTS.length; i++) {
    mapPinFragment.appendChild(renderMapPins(ADVERTISEMENTS[i], TEMPLATE_MAP_PIN, i));
  }
  return mapPinFragment;
};

// Функция создания карточки объявления
var createMapCard = function (template, advertment) {
  template.querySelector('.popup__title').textContent = advertment.offer.title;
  template.querySelector('.popup__text--address').textContent = advertment.offer.address;
  template.querySelector('.popup__text--price').textContent = advertment.offer.price + '₽/ночь';
  template.querySelector('.popup__type').textContent = HOUSE_LABELS[advertment.offer.type];
  template.querySelector('.popup__text--capacity').textContent = advertment.offer.rooms + ' комнаты для ' + advertment.offer.guests + ' гостей';
  template.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertment.offer.checkin + ', выезд до ' + advertment.offer.checkout;
  template.querySelector('.popup__features').appendChild(renderFeaturesElem(advertment.offer.features, template.querySelector('.popup__features')));
  template.querySelector('.popup__description').textContent = advertment.offer.description;
  template.querySelector('.popup__photos').appendChild(renderPhotoElem(advertment.offer.photos, template.querySelector('.popup__photos')));
  template.querySelector('.popup__avatar').src = advertment.author.avatar;

  return template;
};

// ВЕТКА MODULE-4 ОБРАБОТКА СОБЫТИЙ

var getStartMapPinCoords = function () {
  MAP_PIN_MAIN.style.left = MAP_PIN_MAIN_START_LEFT;
  MAP_PIN_MAIN.style.top = MAP_PIN_MAIN_START_TOP;
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

var removeDisabledOnArrayElements = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute('disabled');
  }
};

var showActiveMap = function () {
  MAP.classList.remove('map--faded');
  FORM.classList.remove('ad-form--disabled');
  removeDisabledOnArrayElements(FIELDSETS);
  MAP_PIN_LIST.appendChild(pasteMapPins());
  syncTypeWithMinPrice();
  syncRoomsWithGuests();
};

var onMapPinMainMouseUp = function () {
  showActiveMap();
  MAP_PIN_MAIN.removeEventListener('mouseup', onMapPinMainMouseUp);
  MAP_PIN_MAIN.removeEventListener('keydown', onMapPinMainPressEnter);
};

var onMapPinMainPressEnter = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
    showActiveMap();
  }
  MAP_PIN_MAIN.removeEventListener('mouseup', onMapPinMainMouseUp);
  MAP_PIN_MAIN.removeEventListener('keydown', onMapPinMainPressEnter);
};

MAP_PIN_MAIN.addEventListener('mouseup', onMapPinMainMouseUp);
MAP_PIN_MAIN.addEventListener('keydown', onMapPinMainPressEnter);

// ПЕРЕТАСКМВАНИЕ ГЛАВНОГО МАРКЕРА!!!!!!

var block = document.querySelector('.map__overlay');
var small = document.querySelector('.map__pin--main');

var limits = {
  top: 130,
  bottom: 630,
  right: block.offsetLeft + block.offsetWidth - small.offsetWidth,
  left: block.offsetLeft
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

    var offsets = convertCoordsToOffset(newCoords);

    MAP_PIN_MAIN.style.top = offsets.y + 'px';
    MAP_PIN_MAIN.style.left = offsets.x + 'px';

    addressInput.value = newCoords.x + ', ' + newCoords.y;
    startCoords = {
      x: moveEvt.pageX,
      y: moveEvt.pageY
    };
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

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  var mapCard = document.querySelector('.map__card');
  mapCard.classList.remove('hidden');
};

var closePopup = function () {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.classList.add('hidden');
  }
};

var onPopupCloseClick = function () {
  var popupClose = document.querySelector('.popup__close');
  popupClose.addEventListener('click', function () {
    closePopup();
  });
  document.addEventListener('keydown', onPopupEscPress);
};

var getClickedMapPinId = function (elem) {
  var offerIndex = parseInt(elem.id, 10);
  return ADVERTISEMENTS[offerIndex];
};

var renderMapCard = function (template, advertment) {
  var oldOfferElem = MAP.querySelector('.map__card');
  var offerElem = createMapCard(template, advertment);
  if (oldOfferElem) {
    MAP.replaceChild(offerElem, oldOfferElem);
  } else {
    MAP.insertBefore(createMapCard(template, advertment), PLACE_BEFORE_CARD_LIST);
  }
};

addressInput.value = getInputAddressCoordinates(MAP_PIN_MAIN.style, MAP_PIN_MAIN_HALF_WIDTH, MAP_PIN_MAIN_HEIGHT);
toogleDisabledOnArrayElements(FIELDSETS, true);


// Валидация форм

var syncTwoSelect = function (evt, selectTwo) {
  var selectOne = evt.currentTarget;
  var selectedOption = selectOne.options[selectOne.selectedIndex];
  var form = selectOne.parentElement;

  while (form.tagName !== 'FORM') {
    form = form.parentElement;
  }

  for (var i = 0; i < selectTwo.options.length; i++) {
    if (selectTwo.options[i].value === selectedOption.value) {
      selectTwo.options[i].selected = 'true';
      break;
    }
  }
};

var syncTypeWithMinPrice = function () {
  var selectOne = FORM.querySelector('select[name="type"]');
  var selectedValue = selectOne.options[selectOne.selectedIndex].value;
  var form = selectOne.parentElement;

  while (form.tagName !== 'FORM') {
    form = form.parentElement;
  }

  var selectTwo = FORM.querySelector('input[name="price"]');

  selectTwo.min = MIN_PRICES[selectedValue];
  selectTwo.placeholder = selectTwo.min;
};

var syncRoomsWithGuests = function () {
  var selectOne = FORM.querySelector('select[name="rooms"]');
  var selectTwo = FORM.querySelector('select[name="capacity"]');
  var allowedCapacity = CAPACITY_NUMBER[selectOne.value];
  var options = selectTwo.querySelectorAll('option');

  for (var i = 0; i < options.length; i++) {
    options[i].disabled = allowedCapacity.indexOf(options[i].value) === -1;
  }
  if (allowedCapacity.indexOf(selectTwo.value) === -1) {
    selectTwo.setCustomValidity('Введено неправильное значение');
  } else {
    selectTwo.setCustomValidity('');
  }
};

var onCheckinChange = function (evt) {
  syncTwoSelect(evt, CHECKOUT_SELECT_ELEM);
};

var onCheckoutChange = function (evt) {
  syncTwoSelect(evt, CHECKIN_SELECT_ELEM);
};

var onTypeSelectElemChange = function () {
  syncTypeWithMinPrice();
};

var onNumRoomSelectElemChange = function () {
  syncRoomsWithGuests();
};

var onTitleInputElemInvalid = function (evt) {
  evt.target.style.border = INVALID_FIELD_BORDER;
  if (evt.target.validity.tooShort) {
    evt.target.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
  } else if (evt.target.validity.tooLong) {
    evt.target.setCustomValidity('Заголовок объявления долэен содержать не более 100' +
      ' символов');
  } else if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Обязательное для заполнения поле');
  } else {
    evt.target.setCustomValidity('');
    evt.target.style.border = VALID_FIELD_BORDER;
  }
};

var onTitleInputElemInput = function (evt) {
  if (evt.target.value.length < 30) {
    evt.target.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
  } else {
    evt.target.setCustomValidity('');
  }
};

var onPriceInputElemInvalid = function (evt) {
  evt.target.style.border = INVALID_FIELD_BORDER;
  if (evt.target.validity.typeMismatch) {
    evt.target.setCustomValidity('Используйте числовые значения');
  } else if (evt.target.validity.rangeOverflow) {
    evt.target.setCustomValidity('Цена не должна превышать 1 000 000');
  } else if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Обязательное для заполнения поле');
  } else if (evt.target.validity.rangeUnderflow) {
    evt.target.setCustomValidity('Минимальная цена составляет не менее ' +
      evt.target.min);
  } else {
    evt.target.setCustomValidity('');
    evt.target.style.border = VALID_FIELD_BORDER;
  }
};

var deleteMapPins = function () {
  var mapPinBlock = document.querySelector('.map__pins');
  var mapPins = mapPinBlock.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < mapPins.length; i++) {
    mapPinBlock.removeChild(mapPins[i]);
  }
};

var hideActiveMap = function () {
  MAP.classList.add('map--faded');
  FORM.classList.add('ad-form--disabled');
  toogleDisabledOnArrayElements(FIELDSETS, true);
  deleteMapPins();
  getStartMapPinCoords();
  addressInput.value = getInputAddressCoordinates(STYLE_MAP_PIN_MAIN, MAP_PIN_MAIN_HALF_WIDTH, MAP_PIN_MAIN_HEIGHT);
};

var onFormEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideSuccessBlock();
  }
};

var showSuccesBlock = function () {
  var success = document.querySelector('.success');
  success.classList.remove('hidden');

  document.addEventListener('keydown', onFormEscPress);
};

var hideSuccessBlock = function () {
  var success = document.querySelector('.success');
  success.classList.add('hidden');
  document.removeEventListener('keydown', onFormEscPress);
};

var onFormSubmit = function (evt) {
  showSuccesBlock();
  FORM.reset();
  hideActiveMap();
  closePopup();
  evt.preventDefault();
  MAP_PIN_MAIN.addEventListener('mouseup', onMapPinMainMouseUp);
  MAP_PIN_MAIN.addEventListener('keydown', onMapPinMainPressEnter);
};

var onFormResetClick = function (evt) {
  FORM.reset();
  hideActiveMap();
  closePopup();
  evt.preventDefault();
  MAP_PIN_MAIN.addEventListener('mouseup', onMapPinMainMouseUp);
  MAP_PIN_MAIN.addEventListener('keydown', onMapPinMainPressEnter);
};

TITLE_INPUT_ELEM.addEventListener('invalid', onTitleInputElemInvalid);
TITLE_INPUT_ELEM.addEventListener('input', onTitleInputElemInput);


PRICE_INPUT_ELEM.addEventListener('invalid', onPriceInputElemInvalid);
PRICE_INPUT_ELEM.addEventListener('input', onPriceInputElemInvalid);
NUM_ROOM_SELECT_ELEM.addEventListener('change', onNumRoomSelectElemChange);

CHECKIN_SELECT_ELEM.addEventListener('change', onCheckinChange);
CHECKOUT_SELECT_ELEM.addEventListener('change', onCheckoutChange);
TYPE_SELECT_ELEM.addEventListener('change', onTypeSelectElemChange);

CAPACITY_SELECT_ELEM.addEventListener('change', syncRoomsWithGuests);

FORM.addEventListener('submit', onFormSubmit);
FORM_RESET.addEventListener('click', onFormResetClick);
