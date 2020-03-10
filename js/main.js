'use strict';
var OBJECTS = 8;
var TITLES = ['Название объявления по сдаче жилья 1', 'Название объявления по сдаче жилья 2', 'Название объявления по сдаче жилья 3', 'Название объявления по сдаче жилья 4', 'Название объявления по сдаче жилья 5', 'ННазвание объявления по сдаче жилья 6', 'Название объявления по сдаче жилья 7', 'Название объявления по сдаче жилья 8'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var DESCRIPTIONS = [
  'Описание объявления по сдаче жилья 1',
  'Описание объявления по сдаче жилья 2',
  'Описание объявления по сдаче жилья 3',
  'Описание объявления по сдаче жилья 4',
  'Описание объявления по сдаче жилья 5',
  'Описание объявления по сдаче жилья 6',
  'Описание объявления по сдаче жилья 7',
  'Описание объявления по сдаче жилья 8'
];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ROOMS = [1, 2, 3, 4];
var GUESTS = [1, 2, 3, 4, 5, 6];
var price = {
  min: 0,
  max: 1000000
}
var MIN_PRICES_PER_TYPE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
}
var mapBlockWidth = document.querySelector('.map').clientWidth;
var locationY = {
  minY: 130,
  maxY: 630
}
var locationX = {
  minX: 0,
  maxX: mapBlockWidth
}

var MAIN_PIN_CENTER_X = 570;
var MAIN_PIN_CENTER_Y = 375;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_WIDTH = 65;
var PIN_HEIGHT = 50;
var PIN_WIDTH = 70;
var PIN_IMAGE_SIZE = 40;
//Массивы значений
var getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
var getRandomArrayElement = function(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
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

//Функция создания массива случайных объявлений
var getAdvertsList = function () {
  var advertsList = [];
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
      advertsList.push(advert);
    }
    return advert, advertsList;
  };

//Функция создания меток на карте.
var createMapPins = function (advertsList) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map-pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertsList.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinElementImage = pinElement.querySelector('img');
    pinElement.style.left = advertsList[i].location.x + PIN_WIDTH/2 + 'px';
    pinElement.style.top = advertsList[i].location.y + PIN_HEIGHT/2 + 'px';
    pinElementImage.src = advertsList[i].author.avatar;
    pinElementImage.alt = advertsList[i].offer.title;
    fragment.appendChild(pinElement);
  }
  document.querySelector('.map_pins').appendChild(fragment);
}
/*
//Функция создания карточки с объявлением об аренде
var getAdvertCard = function(advert) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = advert.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advert.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getLivingType(advert.offer.type);
  var getLivingType = function (liveType) {
    switch(liveType) {
      case 'flat': 'Квартира'; break;
      case 'bungalo': 'Бунгало'; break;
      case 'house': 'Дом'; break;
      case 'palace': 'Дворец'; break;
      default: 'Тип жилья';
    }
  }
  cardElement.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = advert.offer.features;
  cardElement.querySelector('.popup__description').textContent = advert.offer.description;
  cardElement.querySelector('.popup__photos').src = advert.offer.photos;
  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
  return cardElement;
}

//Вставить полученный DOM-элемент в блок .map перед блоком.map__filters-container
document.querySelector('.map').insertBefore(getAdvertCard(), document.querySelector('.map__filters-container'));
*/
//Задание 7. Активный режим
var setActiveState = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  var fieldsetList = document.querySelectorAll('fieldset');
  for (var i = 0; i <= fieldsetList.length - 1; i++) {
    if (fieldsetList[i].disabled) {
      fieldsetList[i].classList.remove('disabled');
    }
  }
  getAdvertObject(advert);
}
//Перевод в активное состояние по нажатию мыши и enter
var onMainPin = function () {
var mainPinButton = document.querySelector('.map__pin--main');
mainPinButton.addEventListener('mousedown', function (evt) {
  if (evt.which == 1) {
    setActiveState();
  };
  fillinAddressInput();
});
mainPinButton.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    setActiveState();
  }
});
}
onMainPin();

// Взаимодействие с меткой приводит к заполнению поля адреса
var fillinAddressInput = function (addressValue) {
  var addressInput = document.querySelector('#address');
  addressInput.value = addressValue;
}

var getmainPinCenter = function () {
  var mainPinCEnter = Math.floor(MAIN_PIN_CENTER_X + MAIN_PIN_WIDTH/2) + ', ' + Math.floor(MAIN_PIN_CENTER_Y + MAIN_PIN_HEIGHT/2);
  return mainPinCEnter;
}

fillinAddressInput(getmainPinCenter());

// Валидация
