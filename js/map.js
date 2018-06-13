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

//  Массив фото жилья
var HOUSE_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var HOUSE_PHOTO_COPY = HOUSE_PHOTOS.slice(0, HOUSE_PHOTOS.length);

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
var getRandomArrayUniqeElement = function (arr) {
  var elements = [];
  while (arr.length > 0) {
    var returnedElement = arr.splice(getRandomNumber(0, arr.length - 1), 1);
    elements.push(returnedElement[0]);
  }
  return elements;
};

// Массив случайных элементов с картинками маркера
var randomListURLS = getRandomArrayUniqeElement(picturesCopies);

// Массив случайных элементов с заголовками карточек-объявлений
var randomListTitles = getRandomArrayUniqeElement(ADVERTISEMENT_TITLES_COPIES);

var randomListHouseTitles = getRandomArrayUniqeElement(HOUSE_TYPES);

// Функция получения случайного элемента массива
var getRandomArrayElement = function (arr) {
  return arr[getRandomNumber(0, arr.length - 1)];
};

//  Массив похожих объявлений (объекты с данными)
var advertisements = [];

for (var i = 0; i < 8; i++) {

  var randomLocation = {
    'x': getRandomNumber(300, 900),
    'y': getRandomNumber(130, 630)
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
        'features': HOUSE_DESCRIPTIONS,
        'description': '',
        'photos': getRandomArrayUniqeElement(HOUSE_PHOTO_COPY)
      },

      'location': randomLocation
    }
  );
}

// Переключение карты из неактивного состояния в активное
document.querySelector('.map').classList.remove('map--faded');

//  Размещение маркеров
var mapPinList = document.querySelector('.map__pins');
var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');

// Функция размещения маркеров объявлений
var renderMapPins = function (map, template) {
  var mapPin = template.cloneNode(true);

  mapPin.style = 'left: ' + map.location.x + 'px; top: ' + map.location.y + 'px;';
  mapPin.querySelector('img').src = map.author.avatar;
  mapPin.querySelector('img').alt = map.offer.title[i];

  return mapPin;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < advertisements.length; i++) {
  fragment.appendChild(renderMapPins(advertisements[i], templateMapPin));
}
mapPinList.appendChild(fragment);

//  Размещение карточек объявлений
var mapCardList = document.querySelector('.map');
var templateMapCard = document.querySelector('template').content.querySelector('.map__card');

for (i = 0; i < 1; i++) {
  templateMapCard.querySelector('.popup__title').textContent = advertisements[i].offer.title;
  templateMapCard.querySelector('.popup__text--address').textContent = advertisements[i].offer.address;
  templateMapCard.querySelector('.popup__text--price').textContent = advertisements[i].offer.price + '₽/ночь';
  templateMapCard.querySelector('.popup__type').textContent = HOUSE_LABELS[advertisements[i].offer.type];
  templateMapCard.querySelector('.popup__text--capacity').textContent = advertisements[i].offer.rooms + ' комнаты для ' + advertisements[i].offer.guests + ' гостей';
  templateMapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisements[i].offer.checkin + ', выезд до ' + advertisements[i].offer.checkout;
  templateMapCard.querySelector('.popup__features').children[i].textContent = advertisements[i].offer.features[i];
  templateMapCard.querySelector('.popup__description').textContent = advertisements[i].offer.description;
  templateMapCard.querySelector('.popup__photos').children[i].src = advertisements[i].offer.photos;
  templateMapCard.querySelector('.popup__avatar').src = advertisements[i].author.avatar;

  mapCardList.insertBefore(templateMapCard, mapCardList.children[1]);
}
