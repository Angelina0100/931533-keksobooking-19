'use strict';
//Массивы значений
var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var getRandomArrayElement = function(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
/*
var getRandomArray = function (arr, arrLength) {
 var newGeneratedArray = [];
 arrLength = getRandomNumber(0, arr.length);
 for (var i = 0; i < arrLength; i++) {
   newGeneratedArray.push(arr[i]);
 }
}
*/





var getObject = function () {
  var title = ['Уютная квартира', 'Большая красивая квартира', 'Маленькая светлая комната', 'Дизайнерские аппартаменты', 'Аппартаменты для большой семьи', 'Недорогая комната', 'Студия-лофт', 'Огромная студия'];
  var addresses = [
    '600, 350',
    '500, 100',
    '450, 450',
    '330, 210',
    '100, 360',
    '600, 500',
    '500, 470',
    '200, 350'
  ];
  var price = {
    min: 2000,
    max: 100000
  }
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var rooms = [1, 2, 3, 4];
  var guests = [0, 1, 2, 3, 4, 5, 6];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var descriptions = [
    'Сдается квартира на длительный срок',
    'Сдается квартира на короткий срок, оплата ежедневная',
    'Хороший вариант для студентов',
    'Сдаются аппартаменты для ценителей искусства',
    'Хороший вариант на длительный срок для семьи с детьми',
    'Бюджетный вариант для посетилей и гостей города',
    'Стильная квартира в самом центре Токио',
    'Большая площадь, выгодная цена, отличный ремонт'
  ];

  for (var i = 0; i < types.length; i++) {
    for (var j = 0; j < descriptions.length; j++) {
      types[i] = descriptions[j];
    }
  }

  return {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
    },

    'offer': {
      'title': getRandomArrayElement(title),
      'address': getRandomArrayElement(adresses),
      'price': getRandomNumber(price.min, price.max),
      'type': getRandomArrayElement(types),
      'rooms': getRandomArrayElement(rooms),
      'guests': getRandomArrayElement(guests),
      'checkin': getRandomArrayElement(checkin),
      'checkout': getRandomArrayElement(checkout),
      'features': getRandomArrayElement(features), // нужно из меющегося массива сгенерить новый
      'description': getRandomArrayElement(description),
      'photos': getRandomArrayElement(features)
      },

    'location': {
      'x': getRandomNumber(130, 630),
      'y': getRandomNumber(130, 630)
      }
  }
}

// У блока .map уберите класс .map--faded.
var map = document.querySelector('.map');
map.classList.remove('map--faded');
