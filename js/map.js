'use strict';

//  Функция создания случайного числа в url картинки
/*
var getNumberOfPictureURL = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    return 'img/avatars/user' + 0 + (i + 1) + '.png';
  }
};
*/

// Массив заголовков объявлений
var advertisementsTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

// Функция создания заголовка объявления
/*
var renderAdvertisementsTitles = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    return arr[i];
  }
};
*/

// Функция создания случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Массив типов жилья
var houseType = ['palace', 'flat', 'house', 'bungalo'];

// Массив времени заселения
var checkIn = ['12:00', '13:00', '14:00'];

// Массив времени выселения
var checkOut = ['12:00', '13:00', '14:00'];

// Массив данных о характеристиках жилья
var houseDescription = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Массив фото жилья
var housePhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Массив похожих объявлений (объекты с данными)
var advertisements = [
  {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },

    'offer': {
      'title': advertisementsTitles,
      'address': '600, 350',
      'price': getRandomNumber(1000, 1000000),
      'type': houseType[1],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': checkIn[0],
      'checkout': checkOut[0],
      'features': houseDescription,
      'description': '',
      'photos': housePhotos
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(130, 630)
    }
  },

  {
    'author': {
      'avatar': 'img/avatars/user02.png'
    },

    'offer': {
      'title': advertisementsTitles,
      'address': '500, 250',
      'price': getRandomNumber(1000, 1000000),
      'type': houseType[1],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 5),
      'checkin': checkIn[1],
      'checkout': checkOut[1],
      'features': houseDescription,
      'description': '',
      'photos': housePhotos
    },

    'location': {
      'x': getRandomNumber(300, 900),
      'y': getRandomNumber(130, 630)
    }
  },

  {
    "author": {
      "avatar": "img/avatars/user03.png"
    },

    "offer": {
      "title": advertisementsTitles,
      "address": '600, 350',
      "price": getRandomNumber(1000, 1000000),
      "type": houseType[0],
      "rooms": getRandomNumber(1, 5),
      "guests": getRandomNumber(1, 5),
      "checkin": checkIn[0],
      "checkout": checkOut[0],
      "features": houseDescription,
      "description": '',
      "photos": housePhotos
    },

    "location": {
      "x": getRandomNumber(300, 900),
      "y": getRandomNumber(130, 630)
    }
  },

  {
    "author": {
      "avatar": "img/avatars/user04.png"
    },

    "offer": {
      "title": advertisementsTitles,
      "address": '600, 350',
      "price": getRandomNumber(1000, 1000000),
      "type": houseType[0],
      "rooms": getRandomNumber(1, 5),
      "guests": getRandomNumber(1, 5),
      "checkin": checkIn[0],
      "checkout": checkOut[0],
      "features": houseDescription,
      "description": '',
      "photos": housePhotos
    },

    "location": {
      "x": getRandomNumber(300, 900),
      "y": getRandomNumber(130, 630)
    }
  },

  {
    "author": {
      "avatar": "img/avatars/user05.png"
    },

    "offer": {
      "title": advertisementsTitles,
      "address": '600, 350',
      "price": getRandomNumber(1000, 1000000),
      "type": houseType[2],
      "rooms": getRandomNumber(1, 5),
      "guests": getRandomNumber(1, 5),
      "checkin": checkIn[0],
      "checkout": checkOut[0],
      "features": houseDescription,
      "description": '',
      "photos": housePhotos
    },

    "location": {
      "x": getRandomNumber(300, 900),
      "y": getRandomNumber(130, 630)
    }
  },

  {
    "author": {
      "avatar": "img/avatars/user06.png"
    },

    "offer": {
      "title": advertisementsTitles,
      "address": '600, 350',
      "price": getRandomNumber(1000, 1000000),
      "type": houseType[2],
      "rooms": getRandomNumber(1, 5),
      "guests": getRandomNumber(1, 5),
      "checkin": checkIn[0],
      "checkout": checkOut[0],
      "features": houseDescription,
      "description": '',
      "photos": housePhotos
    },

    "location": {
      "x": getRandomNumber(300, 900),
      "y": getRandomNumber(130, 630)
    }
  },

  {
    "author": {
      "avatar": "img/avatars/user07.png"
    },

    "offer": {
      "title": advertisementsTitles,
      "address": '600, 350',
      "price": getRandomNumber(1000, 1000000),
      "type": houseType[3],
      "rooms": getRandomNumber(1, 5),
      "guests": getRandomNumber(1, 5),
      "checkin": checkIn[0],
      "checkout": checkOut[0],
      "features": houseDescription,
      "description": '',
      "photos": housePhotos
    },

    "location": {
      "x": getRandomNumber(300, 900),
      "y": getRandomNumber(130, 630)
    }
  },

  {
    "author": {
      "avatar": "img/avatars/user08.png"
    },

    "offer": {
      "title": advertisementsTitles,
      "address": '600, 350',
      "price": getRandomNumber(1000, 1000000),
      "type": houseType[3],
      "rooms": getRandomNumber(1, 5),
      "guests": getRandomNumber(1, 5),
      "checkin": checkIn[1],
      "checkout": checkOut[1],
      "features": houseDescription,
      "description": '',
      "photos": housePhotos
    },

    "location": {
      "x": getRandomNumber(300, 900),
      "y": getRandomNumber(130, 630)
    }
  }
];

document.querySelector('.map').classList.remove('map--faded');
// Размещение маркеров
var mapListPin = document.querySelector('.map__pins');
var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');

for (var i = 0; i < advertisements.length; i++) {
  var mapPin = templateMapPin.cloneNode(true);

  mapPin.style = 'left: ' + advertisements[i].location.x + 'px; top: ' + advertisements[i].location.y + 'px;';
  mapPin.querySelector('img').src = advertisements[i].author.avatar;
  mapPin.querySelector('img').alt = advertisements[i].offer.title[i];
  mapListPin.appendChild(mapPin);
}

// Размещение карточек объявлений
var mapListCard = document.querySelector('.map');
var templateMapCard = document.querySelector('template').content.querySelector('.map__card');
console.log(mapListCard);

for (var i = 0; i < advertisements.length; i++) {
  templateMapCard.querySelector('.popup__title').textContent = advertisements[i].offer.title[i];
  templateMapCard.querySelector('.popup__text--address').textContent = advertisements[i].offer.address;
  templateMapCard.querySelector('.popup__text--price').textContent = advertisements[i].offer.price + '₽/ночь';
  templateMapCard.querySelector('.popup__type').textContent = advertisements[i].offer.type;
  templateMapCard.querySelector('.popup__text--capacity').textContent = advertisements[i].offer.rooms + ' комнаты для ' + advertisements[i].offer.guests + ' гостей';
  templateMapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisements[i].offer.checkin + ', выезд до ' + advertisements[i].offer.checkout;
  templateMapCard.querySelector('.popup__features').children[i].textContent = advertisements[i].offer.features[i];
  templateMapCard.querySelector('.popup__description').textContent = advertisements[i].offer.description;
  //templateMapCard.querySelector('.popup__photos').children[i].src = advertisements[i].offer.photos[0];
  templateMapCard.querySelector('.popup__avatar').src = advertisements[i].author.avatar;

  mapListCard.insertBefore(templateMapCard, mapListCard[1]);
}

/* Функция доавления маркера через фрагмент
var renderMapPins = function (map) {
  var mapPin = templateMapPin.cloneNode(true);

  mapPin.style = 'left: ' + map[i].location.x + 'px; top: ' + map[i].location.y + 'px;';
  mapPin.querySelector('img').src = map[i].author.avatar;
  mapPin.querySelector('img').alt = map[i].offer.title[i];

  return mapPin;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < advertisements.length; i++) {
  fragment.appendChild(renderMapPins(advertisements[i]));
}
mapListPin.appendChild(fragment);
*/
