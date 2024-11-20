ymaps.ready(init);
function init() {
    const myMap = new ymaps.Map("map", {
        center: [53.877900, 30.316478], // Координаты студии.
        zoom: 15, // Масштаб.
        controls: ['zoomControl', 'typeSelector', 'geolocationControl'],
        type: "yandex#satellite", // Тип карты (спутниковая карта).
    });
    // Добавление метки.
    const myPlacemark = new ymaps.Placemark([53.877900, 30.316478], {
        hintContent: "N-Art Tattoo Studio", // Подпись к метке.
        balloonContent: "Мы находимся здесь!", // Выводится при клике.
    }, {
      // Изменение на кастомную иконку для метки.
      iconLayout: 'default#image',
      iconImageHref: '../img/others/map-marker.png', // Путь к png-файлу.
      iconImageSize: [50, 50], // Размер иконки.
      iconImageOffset: [-25, -25] // Смещение иконки, чтобы она указывала на точку (обычно половинный размер).
  });
    // Размещение метки на карте.
    myMap.geoObjects.add(myPlacemark);
};