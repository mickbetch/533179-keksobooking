'use strict';

//  Массив заголовков объявлений
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

// Массив типов жилья
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];

var HOUSE_LABELS = {
  'palace': 'дворец',
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало'
};

//  Массив времени заселения
var CHECK_INS = ['12:00', '13:00', '14:00'];

//  Массив времени выселения
var CHECK_OUTS = ['12:00', '13:00', '14:00'];

//  Массив данных о характеристиках жилья
var HOUSE_DESCRIPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var HOUSE_DESCRIPTIONS_COPY = HOUSE_DESCRIPTIONS.slice(0, HOUSE_DESCRIPTIONS.length);

//  Массив фото жилья
var HOUSE_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var HOUSE_PHOTO_COPY = HOUSE_PHOTOS.slice(0, HOUSE_PHOTOS.length);

// Блок, где размещаются маркеры объявлений
var MAP = document.querySelector('.map');
var MAP_PIN_LIST = MAP.querySelector('.map__pins');
var MAP_BEFORE_CARD_LIST = MAP.querySelector('.map__filters-container');

// Константы шаблона
var TEMPLATE = document.querySelector('template').content;
var TEMPLATE_MAP_CARD = TEMPLATE.querySelector('.map__card');
var TEMPLATE_MAP_PIN = TEMPLATE.querySelector('.map__pin');

var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 130;
var MAX_Y = 630;

//  Функция создания случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Функция генерации чисел (от 1 до 9 с ведущим нулем, начиная с 10 - ноль пропадает)
var leadingZeroes = function (number, length) { // length - это разрядность чисел,
  // number - число, которое передается
  var string = '' + number;
  while (string.length < length) { // string.length - длина строки (т.е. если '9', то
    // длина равна 1, если '10' и до '99' - равна 2)
    string = '0' + string;
  }
  return string;
};

// Функция генерации адресов картинок
var generateURLs = function (count) {
  var URLs = [];
  for (var i = 1; i <= count; i++) {
    URLs.push('img/avatars/user' + leadingZeroes(i, 2) + '.png');
  }
  return URLs;
};

// Массив с адресами картинок  и его копия
var pictures = generateURLs(8);
var picturesCopies = pictures.slice(0, pictures.length);

// Функция создания массива с адресами картинок в случайном порядке
var shuffleArray = function (arr) {
  var elements = [];
  while (arr.length > 0) {
    var returnedElement = arr.splice(getRandomNumber(0, arr.length - 1), 1);
    elements.push(returnedElement[0]);
  }
  return elements;
};

// Массив случайных элементов с картинками маркера
var randomListURLS = shuffleArray(picturesCopies);

// Массив случайных элементов с заголовками карточек-объявлений
var randomListTitles = shuffleArray(ADVERTISEMENT_TITLES_COPIES);

var randomListHouseTitles = shuffleArray(HOUSE_TYPES);

// Функция получения случайного элемента массива
var getRandomArrayElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

// Функция получения массива с случайной длинной
var getRandomArrayLength = function (arr) {
  var newArr = arr.slice(0, getRandomNumber(0, arr.length));
  return newArr;
};

//  Массив похожих объявлений (объекты с данными)
var advertisements = [];

for (var i = 0; i < 8; i++) {

  var randomLocation = {
    'x': getRandomNumber(MIN_X, MAX_X),
    'y': getRandomNumber(MIN_Y, MAX_Y)
  };

  advertisements.push(
    {
      'author': {
        'avatar': randomListURLS[i]
      },

      'offer': {
        'title': randomListTitles[i],
        'address': randomLocation.x + ', ' + randomLocation.y,
        'price': getRandomNumber(1000, 1000000),
        'type': randomListHouseTitles[i],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 5),
        'checkin': getRandomArrayElement(CHECK_INS),
        'checkout': getRandomArrayElement(CHECK_OUTS),
        'features': getRandomArrayLength(HOUSE_DESCRIPTIONS_COPY),
        'description': '',
        'photos': shuffleArray(HOUSE_PHOTO_COPY)
      },

      'location': randomLocation
    }
  );
}

// Переключение карты из неактивного состояния в активное
document.querySelector('.map').classList.remove('map--faded');

//  Размещение маркеров

// Функция создания и размещения маркеров объявлений
var renderMapPins = function (el, template) {
  var mapPin = template.cloneNode(true);

  mapPin.style = 'left: ' + el.location.x + 'px; top: ' + el.location.y + 'px;';
  mapPin.querySelector('img').src = el.author.avatar;
  mapPin.querySelector('img').alt = el.offer.title[i];

  return mapPin;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < advertisements.length; i++) {
  fragment.appendChild(renderMapPins(advertisements[i], TEMPLATE_MAP_PIN));
}
MAP_PIN_LIST.appendChild(fragment);

//  Размещение карточек объявлений

// Функция создания и размещения карточек объявлений
var renderMapCard = function (template, arr) {
  for (i = 0; i < 1; i++) {
    template.querySelector('.popup__title').textContent = arr[i].offer.title;
    template.querySelector('.popup__text--address').textContent = arr[i].offer.address;
    template.querySelector('.popup__text--price').textContent = arr[i].offer.price + '₽/ночь';
    template.querySelector('.popup__type').textContent = HOUSE_LABELS[arr[i].offer.type];
    template.querySelector('.popup__text--capacity').textContent = arr[i].offer.rooms + ' комнаты для ' + arr[i].offer.guests + ' гостей';
    template.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr[i].offer.checkin + ', выезд до ' + arr[i].offer.checkout;
    template.querySelector('.popup__features').children.textContent = arr[i].offer.features;
    template.querySelector('.popup__description').textContent = arr[i].offer.description;
    // templateMapCard.querySelector('.popup__photos').children[i].src =
    // advertisements[i].offer.photos;
    template.querySelector('.popup__avatar').src = arr[i].author.avatar;
  }
  return template;
};

MAP.insertBefore(renderMapCard(TEMPLATE_MAP_CARD, advertisements), MAP_BEFORE_CARD_LIST);
