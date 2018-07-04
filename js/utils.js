'use strict';
(function () {

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

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

  var getRandomArrayElement = function (arr) {
    return arr[getRandomNumber(0, arr.length - 1)];
  };

  var getRandomArrayLength = function (arr) {
    var randomLength = getRandomNumber(0, arr.length);
    return arr.slice(0, randomLength);
  };

  var cleanNode = function (parentElement) {
    while (parentElement.firstChild) {
      parentElement.removeChild(parentElement.firstChild);
    }
  };

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

  var hideErrorMessage = function (error) {
    error.classList.add('hidden');
    return error;
  };

  window.utils = {
    cleanNode: cleanNode,
    syncTwoSelect: syncTwoSelect,
    hideErrorMessage: hideErrorMessage,
    getRandomNumber: getRandomNumber,
    shuffleArray: shuffleArray,
    compareRandom: compareRandom,
    getRandomArrayElement: getRandomArrayElement,
    getRandomArrayLength: getRandomArrayLength
  };
})();
