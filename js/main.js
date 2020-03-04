'use strict';

//Массивы значений
var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

var getRandomArrayElement = function(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

var guests = [0, 1, 2, 3, 4, 5, 6];

//Функция перемешивания элементов массива
var getShuffledArray = function shuffle(arr){
  var j, temp;
  for(var i = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
// Функция получения разной длины массива
var getRandomArrayLength = function(array) {
  var clone = array.slice();
  clone.length = getRandomNumber(1, array.length);
  return clone;
}
// Функция для получения перемешенного массива рандомной длины
var getRandomArray = function(arr) {
  var newArray = getRandomArrayLength(getShuffledArray(arr));
  return newArray;
}
var OBJECTS = 8; //массива из 8 сгенерированных JS объектов
var objectsList = [];
var TITLES = ['Уютная квартира', 'Большая красивая квартира', 'Маленькая светлая комната', 'Дизайнерские аппартаменты', 'Аппартаменты для большой семьи', 'Недорогая комната', 'Студия-лофт', 'Огромная студия'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var DESCRIPTIONS = [
  'Описание1',
  'Описание2',
  'Описание3',
  'Описание4',
  'Описание5',
  'Описание6',
  'Описание7',
  'Описание8'
];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ROOMS = [1, 2, 3, 4];
var GUESTS = [1, 2, 3, 4, 5, 6];
var price = {
  min: 1000,
  max: 100000
}
var mapBlock = document.querySelector('.map').clientWidth;
var locationY = {
  minY: 130,
  maxY: 630
}
var locationX = {
  minX: 130,
  maxX: mapBlock
}
//Задание 1
var getObject = function () {
  for (var i = 0; i <= OBJECTS; i++) {
    var advert = {
      author: {
        avatar: 'img/avatars/user0' + getRandomNumber(1, 8) + '.png',
        },
      offer: {
        title: getRandomArrayElement(TITLES),
        address: location.x + ', ' + location.y,
        price: getRandomNumber(price.min, price.max),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomArrayElement(ROOMS),
        guests: getRandomArrayElement(GUESTS),
        checkin: getRandomArrayElement(CHECKIN),
        checkout: getRandomArrayElement(CHECKOUT),
        features: getRandomArray(FEATURES),
        description: getRandomArrayElement(DESCRIPTIONS),
        photos: getRandomArrayElement(PHOTOS)
        },
      location: {
        x: getRandomNumber(locationX.minX, locationX.maxX),
        y: getRandomNumber(locationY.minY, locationY.maxY)
        }
      };
      objectsList.push(advert);
    }
    return objectsList;
  };

//Задание 2. У блока .map уберите класс .map--faded.
var map = document.querySelector('.map');
map.classList.remove('map--faded');

//Задание 3. Создание DOM-элементов.
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map-pin');

var addMark = function (advert, index) {
  var pinButton = document.createElement('button');
  var pinImage = document.createElement('img');
  pinButton.appendChild(pinImage);

  pinButton.classList.add('map__pin');
  pinButton.style.left = advert.location.x + 'px';
  pinButton.style.top = advert.location.y + 'px';

  pinImage.src = advert.author.avatar;
  pinImage.classList.add('alt');
  pinImage.alt = advert.offer.title;
  pinImage.style.width = '40' + 'px';
  pinImage.style.height = '40' + 'px';
  pinImage.draggable = false;

  return pinButton;
}
//Задание 4. Отрисовка сгенерированных DOM-элементов в блок .map__pins.
var createFragment = function (mapMarks) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < mapMarks.length; i++) {
    fragment.appendChild(addMark(mapMarks[i], i))
  }
  return fragment;
}

var addMToMap = function (map, mapMarks) {
  map.appendChild(mapMarks);
}
