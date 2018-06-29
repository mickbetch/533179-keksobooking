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

  window.utils = {
    getRandomNumber: getRandomNumber,
    shuffleArray: shuffleArray,
    compareRandom: compareRandom,
    getRandomArrayElement: getRandomArrayElement,
    getRandomArrayLength: getRandomArrayLength
  };
})();
