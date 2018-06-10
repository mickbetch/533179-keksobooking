'use strict';

//  Массив заголовков объявлений
var ADVERTISEMENT_TITLEs = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var ADVERTISEMENT_TITLEs_COPIES = ADVERTISEMENT_TITLEs.slice(0, ADVERTISEMENT_TITLEs.length);

//  Массив типов жилья
var HOUSE_TYPEs = ['palace', 'flat', 'house', 'bungalo'];

//  Массив времени заселения
var CHECK_INs = ['12:00', '13:00', '14:00'];

//  Массив времени выселения
var CHECK_OUTs = ['12:00', '13:00', '14:00'];

//  Массив данных о характеристиках жилья
var HOUSE_DESCRIPTIONs = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

//  Массив фото жилья
var HOUSE_PHOTOs = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

//  Функция создания случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция генерации чисел (от 1 до 9 спереди добавляется 0(ноль))
var leadingZeroes =  function (number, length) { // length - это разрядность чисел,
  // number - число, которое передается
  var string = '' + number;
  while (string.length < length) { // str.length - длина строки (т.е. если '9', то длина
    // равна 1, если '10' и до '99' - равна 2)
    string = '0' + string;
  }
  return string;
};

// Функция генерации адресов картинок
var generateURLs = function(count){
  var URLs = [];
  for (var i = 1; i <= count; i++){
    URLs.push("img/avatars/user" + leadingZeroes(i, 2) + ".png");
  }
  return URLs;
};

var pictures = generateURLs(8);
var picturesCopies = pictures.slice(0, pictures.length);

// Функция создания случайного элемента массива аватарок пользователей
var getRandomArrayUniqeElement = function (arr) {
    var elements = [];
    while (arr.length > 0) {
      var returnedElement = arr.splice(getRandomNumber(0, arr.length - 1), 1);
      elements.push(returnedElement[0]);
    }
    return elements;
};

// Массив случайных элементов с аватарками маркера
var randomListURLS = getRandomArrayUniqeElement(picturesCopies);


// Массив случайных элементов с аватарками маркера
var randomListTitles = getRandomArrayUniqeElement(ADVERTISEMENT_TITLEs_COPIES);

//  Массив похожих объявлений (объекты с данными)
var advertisements = [
  {
    'author': {
      'avatar': randomListURLS
    },

    'offer': {
      'title': randomListTitles,
      'address': '600, 350',
      'price': getRandomNumber(1000, 1000000),
      'type': HOUSE_TYPEs[1],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': CHECK_INs[0],
      'checkout': CHECK_OUTs[0],
      'features': HOUSE_DESCRIPTIONs,
      'description': '',
      'photos': HOUSE_PHOTOs
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(130, 630)
    }
  },

  {
    'author': {
      'avatar': randomListURLS
    },

    'offer': {
      'title': randomListTitles,
      'address': '500, 250',
      'price': getRandomNumber(1000, 1000000),
      'type': HOUSE_TYPEs[1],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': CHECK_INs[1],
      'checkout': CHECK_OUTs[1],
      'features': HOUSE_DESCRIPTIONs,
      'description': '',
      'photos': HOUSE_PHOTOs
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(130, 630)
    }
  },

  {
    'author': {
      'avatar': randomListURLS
    },

    'offer': {
      'title': randomListTitles,
      'address': '600, 350',
      'price': getRandomNumber(1000, 1000000),
      'type': HOUSE_TYPEs[0],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': CHECK_INs[0],
      'checkout': CHECK_OUTs[0],
      'features': HOUSE_DESCRIPTIONs,
      'description': '',
      'photos': HOUSE_PHOTOs
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(130, 630)
    }
  },

  {
    'author': {
      'avatar': randomListURLS
    },

    'offer': {
      'title': randomListTitles,
      'address': '600, 350',
      'price': getRandomNumber(1000, 1000000),
      'type': HOUSE_TYPEs[0],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': CHECK_INs[0],
      'checkout': CHECK_OUTs[0],
      'features': HOUSE_DESCRIPTIONs,
      'description': '',
      'photos': HOUSE_PHOTOs
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(130, 630)
    }
  },

  {
    'author': {
      'avatar': randomListURLS
    },

    'offer': {
      'title': randomListTitles,
      'address': '600, 350',
      'price': getRandomNumber(1000, 1000000),
      'type': HOUSE_TYPEs[2],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': CHECK_INs[0],
      'checkout': CHECK_OUTs[0],
      'features': HOUSE_DESCRIPTIONs,
      'description': '',
      'photos': HOUSE_PHOTOs
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(130, 630)
    }
  },

  {
    'author': {
      'avatar': randomListURLS
    },

    'offer': {
      'title': randomListTitles,
      'address': '600, 350',
      'price': getRandomNumber(1000, 1000000),
      'type': HOUSE_TYPEs[2],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': CHECK_INs[0],
      'checkout': CHECK_OUTs[0],
      'features': HOUSE_DESCRIPTIONs,
      'description': '',
      'photos': HOUSE_PHOTOs
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(130, 630)
    }
  },

  {
    'author': {
      'avatar': randomListURLS
    },

    'offer': {
      'title': randomListTitles,
      'address': '600, 350',
      'price': getRandomNumber(1000, 1000000),
      'type': HOUSE_TYPEs[3],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': CHECK_INs[0],
      'checkout': CHECK_OUTs[0],
      'features': HOUSE_DESCRIPTIONs,
      'description': '',
      'photos': HOUSE_PHOTOs
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(130, 630)
    }
  },

  {
    'author': {
      'avatar': randomListURLS
    },

    'offer': {
      'title': randomListTitles,
      'address': '600, 350',
      'price': getRandomNumber(1000, 1000000),
      'type': HOUSE_TYPEs[3],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': CHECK_INs[1],
      'checkout': CHECK_OUTs[1],
      'features': HOUSE_DESCRIPTIONs,
      'description': '',
      'photos': HOUSE_PHOTOs
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(130, 630)
    }
  }
];

document.querySelector('.map').classList.remove('map--faded');
//  Размещение маркеров
var mapPinList = document.querySelector('.map__pins');
var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');

// Функция размещения маркеров объявлений
var renderMapPins = function (map, template) {
  var mapPin = template.cloneNode(true);

  mapPin.style = 'left: ' + map.location.x + 'px; top: ' + map.location.y + 'px;';
  mapPin.querySelector('img').src = map.author.avatar[i];
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

for (i = 0; i < advertisements.length; i++) {
  templateMapCard.querySelector('.popup__title').textContent = advertisements[i].offer.title[i];
  templateMapCard.querySelector('.popup__text--address').textContent = advertisements[i].offer.address;
  templateMapCard.querySelector('.popup__text--price').textContent = advertisements[i].offer.price + '₽/ночь';
  templateMapCard.querySelector('.popup__type').textContent = advertisements[i].offer.type;
  templateMapCard.querySelector('.popup__text--capacity').textContent = advertisements[i].offer.rooms + ' комнаты для ' + advertisements[i].offer.guests + ' гостей';
  templateMapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisements[i].offer.checkin + ', выезд до ' + advertisements[i].offer.checkout;
  templateMapCard.querySelector('.popup__features').children[i].textContent = advertisements[i].offer.features[i];
  templateMapCard.querySelector('.popup__description').textContent = advertisements[i].offer.description;
  //  templateMapCard.querySelector('.popup__photos').children[i].src = advertisements[i].offer.photos[0];
  templateMapCard.querySelector('.popup__avatar').src = advertisements[i].author.avatar[i];

  mapCardList.insertBefore(templateMapCard, mapCardList.children[1]);
}
