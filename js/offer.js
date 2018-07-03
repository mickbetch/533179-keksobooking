'use strict';

(function () {

  var HOUSE_LABELS = {
    'palace': 'дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало'
  };

  var cleanNode = function (parentElement) {
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  };

  var createFeaturesElem = function (feature) {
    var featureElem = document.createElement('li');
    featureElem.classList.add('popup__feature', 'popup__feature--' + feature);
    return featureElem;
  };

  var renderFeaturesElem = function (featuresArr, parentElement) {
    cleanNode(parentElement);
    var featuresFragment = document.createDocumentFragment();
    for (var i = 0; i < featuresArr.length; i++) {
      featuresFragment.appendChild(createFeaturesElem(featuresArr[i]));
    }
    return featuresFragment;
  };

  var createPhotoElem = function () {
    var photoElem = document.createElement('img');
    photoElem.classList.add('popup__photo');
    photoElem.width = '45';
    photoElem.height = '40';
    photoElem.alt = 'Фотография жилья';
    return photoElem;
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

  var createMapCard = function (template, data) {
    template.querySelector('.popup__title').textContent = data.offer.title;
    template.querySelector('.popup__text--address').textContent = data.offer.address;
    template.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    template.querySelector('.popup__type').textContent = HOUSE_LABELS[data.offer.type];
    template.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    template.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    template.querySelector('.popup__features').appendChild(renderFeaturesElem(data.offer.features, template.querySelector('.popup__features')));
    template.querySelector('.popup__description').textContent = data.offer.description;
    template.querySelector('.popup__photos').appendChild(renderPhotoElem(data.offer.photos, template.querySelector('.popup__photos')));
    template.querySelector('.popup__avatar').src = data.author.avatar;

    return template;
  };

  window.offer = {
    createMapCard: createMapCard
  };
})();
