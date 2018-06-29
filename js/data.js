'use strict';
(function () {

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

  var housePhotoCopy = HOUSE_PHOTOS.slice(0, HOUSE_PHOTOS.length);

  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var ADVERTISEMENT_COUNT = 8;

  var leadingZeroes = function (number, length) {
    var string = '' + number;
    while (string.length < length) {
      string = '0' + string;
    }
    return string;
  };
  var generateURLs = function (count) {
    var URLs = [];
    for (var i = 1; i <= count; i++) {
      URLs.push('img/avatars/user' + leadingZeroes(i, 2) + '.png');
    }
    return URLs;
  };

  var PICTURES = generateURLs(ADVERTISEMENT_COUNT);
  var picturesCopies = PICTURES.slice(0, PICTURES.length);
  var RANDOM_LIST_URLS = window.utils.shuffleArray(picturesCopies);
  var RANDOM_LIST_TITLES = window.utils.shuffleArray(ADVERTISEMENT_TITLES_COPIES);

  // Функция генерации массива объявлений
  var generateAdvertisement = function (n) {
    var advertiseList = [];
    var advertiseEl;
    for (var i = 0; i < n; i++) {
      var randomLocation = {
        'x': window.utils.getRandomNumber(MIN_X, MAX_X),
        'y': window.utils.getRandomNumber(MIN_Y, MAX_Y)
      };
      advertiseEl = {
        'author': {
          'avatar': RANDOM_LIST_URLS[i]
        },
        'offer': {
          'title': RANDOM_LIST_TITLES[i],
          'address': randomLocation.x + ', ' + randomLocation.y,
          'price': window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
          'type': window.utils.getRandomArrayElement(HOUSE_TYPES),
          'rooms': window.utils.getRandomNumber(1, 5),
          'guests': window.utils.getRandomNumber(1, 5),
          'checkin': window.utils.getRandomArrayElement(CHECK_INS),
          'checkout': window.utils.getRandomArrayElement(CHECK_OUTS),
          'features': window.utils.getRandomArrayLength(houseDescriptionCopy),
          'description': '',
          'photos': housePhotoCopy.sort(window.utils.compareRandom)
        },
        'location': randomLocation
      };
      advertiseList.push(advertiseEl);
    }
    return advertiseList;
  };
// Массив объектов с объявлениями

  var ADVERTISEMENTS = generateAdvertisement(ADVERTISEMENT_COUNT).slice(0);

  window.data = {
    ADVERTISEMENTS: ADVERTISEMENTS,
    HOUSE_LABELS: HOUSE_LABELS,
  };
})();
