'use strict';

(function () {
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

  var createMapCard = function (template, advertment) {
    template.querySelector('.popup__title').textContent = advertment.offer.title;
    template.querySelector('.popup__text--address').textContent = advertment.offer.address;
    template.querySelector('.popup__text--price').textContent = advertment.offer.price + '₽/ночь';
    template.querySelector('.popup__type').textContent = window.data.HOUSE_LABELS[advertment.offer.type];
    template.querySelector('.popup__text--capacity').textContent = advertment.offer.rooms + ' комнаты для ' + advertment.offer.guests + ' гостей';
    template.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertment.offer.checkin + ', выезд до ' + advertment.offer.checkout;
    template.querySelector('.popup__features').appendChild(renderFeaturesElem(advertment.offer.features, template.querySelector('.popup__features')));
    template.querySelector('.popup__description').textContent = advertment.offer.description;
    template.querySelector('.popup__photos').appendChild(renderPhotoElem(advertment.offer.photos, template.querySelector('.popup__photos')));
    template.querySelector('.popup__avatar').src = advertment.author.avatar;

    return template;
  };

  window.offer = {
    createMapCard: createMapCard
  };
})();
