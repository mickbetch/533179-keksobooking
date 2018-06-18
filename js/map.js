'use strict';

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

// Массив случайных элементов с картинками маркера
var RANDOM_LIST_URLS = shuffleArray(picturesCopies);

// Массив случайных элементов с заголовками карточек-объявлений
var RANDOM_LIST_TITLES = shuffleArray(ADVERTISEMENT_TITLES_COPIES);

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

var MAP = document.querySelector('.map');
var MAP_PIN_LIST = MAP.querySelector('.map__pins');
var PLACE_BEFORE_CARD_LIST = MAP.querySelector('.map__filters-container');

var TEMPLATE = document.querySelector('template').content;
var TEMPLATE_MAP_CARD = TEMPLATE.querySelector('.map__card');
var TEMPLATE_MAP_PIN = TEMPLATE.querySelector('.map__pin');

// Функция создания маркера-пина
var renderMapPins = function (el, template, index) {
  var mapPin = template.cloneNode(true);
  var mapPinWidth = mapPin.style.width;
  var mapPinHeight = mapPin.style.height;

  mapPin.style = 'left: ' + (el.location.x - (mapPinWidth / 2)) + 'px; top: ' + (el.location.y - mapPinHeight) + 'px;';
  mapPin.querySelector('img').src = el.author.avatar;
  mapPin.querySelector('img').alt = el.offer.title[i];
  mapPin.id = index;

  return mapPin;
};

// Генерация маркеров и  их сохранение в документ-фрагмент
var mapPinFragment = document.createDocumentFragment();
for (var i = 0; i < ADVERTISEMENTS.length; i++) {
  mapPinFragment.appendChild(renderMapPins(ADVERTISEMENTS[i], TEMPLATE_MAP_PIN, i));
}

// Функция создания карточки объявления
var renderMapCard = function (template, advertment) {
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

var FORM = document.forms[1];
var FIELDSETS = FORM.querySelectorAll('fieldset');
var MAP_PIN_MAIN = MAP.querySelector('.map__pin--main');
var addressInput = FORM.querySelector('#address');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var SPACE_KEYCODE = 32;

// Функция добавление элементам массива атрибутов disabled
var toogleDisabledOnArrayElements = function (arr, isDisabled) {
  for (i = 0; i < arr.length; i++) {
    arr[i].setAttribute('disabled', isDisabled);
  }
};
toogleDisabledOnArrayElements(FIELDSETS, true);

var removeDisabledOnArrayElements = function (arr) {
  for (i = 0; i < arr.length; i++)  {
    arr[i].removeAttribute('disabled');
  }
};

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
  mapCard.classList.add('hidden');
};

var onPopupCloseClick = function () {
    var popupClose = document.querySelector('.popup__close');
    popuClose.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onPopupEscPress );
};

var showActiveMap = function () {
  MAP.classList.remove('map--faded');
  FORM.classList.remove('ad-form--disabled');
  removeDisabledOnArrayElements(FIELDSETS);
  MAP_PIN_LIST.appendChild(mapPinFragment);
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



var styleMapPinMain = getComputedStyle(MAP_PIN_MAIN);

var coordinatesMapPinMain = {
  'top': parseInt(styleMapPinMain.top, 10),
  'left': parseInt(styleMapPinMain.left, 10),
  'width': parseInt(styleMapPinMain.width, 10),
  'height': parseInt(styleMapPinMain.height, 10)
};
// Получение стартовых коордитнат поля с адресом (центр стартовой конпки)
var getInputAddressCoordinates = function (coordinates) {
  var string = (Math.floor(coordinates.left + (coordinates.width / 2)) + ', ' + (Math.floor(coordinates.top + (coordinates.height / 2))));
  return string;
};
