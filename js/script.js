"use strict"
// Сохранение позиции скролла перед перезагрузкой страницы.
window.onbeforeunload = function() {
   sessionStorage.setItem("scrollPosition", window.scrollY);
};
// Восстанавливаем позицию скролла после загрузки страницы.
window.onload = function() {
   const scrollPosition = sessionStorage.getItem("scrollPosition");
   if (scrollPosition) {
       window.scrollTo(0, scrollPosition);
   }
};
// 0==}::::::::::::::::> Основной код. <::::::::::::::::{==0
const preloader = document.querySelector(".preloader");
const preloaderLogo = document.querySelector(".preloader__logo");
const content = document.querySelector(".content-hidden");
const burger = document.getElementById("burger");
const body = document.querySelector("body");
const burgerLines = document.querySelector(".header__burgerLines");
const header = document.querySelector(".header");
const navigation = document.querySelector(".header__navigation");
const listItems = document.querySelectorAll(".header__list-item");
const links = document.querySelectorAll(".header__navigation a") // Ссылки внутри меню.
// Создание прелоадера.
window.addEventListener("load", () => {
   preloaderLogo.classList.add("visible"); // Отображение логотипа.
   setTimeout(() => {
      preloaderLogo.classList.remove("visible"); // Удаление логотипа перед фоном.
   }, 3000); // Логотип виден 3 секунды.
   setTimeout(() => {
      preloader.classList.add("hidden"); // Удаление фона и отображение контента.
   }, 5000); // Исчезновение фона через 5 секунд.
   setTimeout(() => {
      content.classList.add("content-visible"); // Отображение всего контента сайта чарез 6.5 секунд.
   }, 6500);
});

document.addEventListener("DOMContentLoaded", () => {
   navigation.classList.add("hidden"); // Изначальное состояние навигации.
   burger.addEventListener("click", () => {
      // Имитация клика на бургер с целью закрытия меню.
      links.forEach((link) => { // Обходим все ссылки меню.
         link.addEventListener("click", () => { // Добавляем каждой ссылке обработчик событий.
            if (navigation.classList.contains("active")) { // Если меню открыто, вызываем закрытие меню.
               burger.click(); // Имитация клика на бургер для закрытия меню.
            }
         });
      }); // Теперь это рёбаное меню закрывается при клике на ссылку! \m/ (^,...,^) \m/
      // Переключение классов.
      navigation.classList.toggle("active");
      navigation.classList.toggle("hidden");
      burgerLines.classList.toggle("active");
      header.classList.toggle("active");
      body.classList.toggle("overflow");
      // Работа с навигацией.
      if (navigation.classList.contains("active")) {
         listItems.forEach((item, index) => { // Если навигация открыта, элементы списка выезжают.
            item.style.transitionDelay = `${(index + 1) * 0.2}s`; // Задержка для анимации.
            item.style.transform = "translateX(0)"; // Элементы выезжают.
         });
      } else {
         listItems.forEach((item, index) => { // Если навигация закрыта, элементы списка возвращаются.
            item.style.transitionDelay = `${(listItems.length - index) * 0.2}s`; // Обратная задержка для анимации.
            item.style.transform = "translateX(-750px)"; // Элементы возвращаются обратно.
         });
         // Очистка после завершения анимации.
         setTimeout(() => {
            listItems.forEach(item => {
               item.style.transform = ""; // Сбрасывание transform.
               item.style.transitionDelay = ""; // Сбрасывание delay.
            });
         }, (listItems.length * 0.2 + 1) * 1000); // Время, достаточное для завершения анимации.
      }
   });
});

window.addEventListener("resize", () => {
   // Проверка ширины экрана и класса "active" у меню.
   if (window.innerWidth >= 768 && navigation.classList.contains("active")) {
      navigation.classList.remove("active");
      navigation.classList.add("hidden");
      burgerLines.classList.remove("active");
      header.classList.remove("active");
      body.classList.remove("overflow");
      listItems.forEach(item => {
         item.style.transitionDelay = "0s"; // Сброс задержки.
         item.style.transform = "translateX(0px)"; // Возвращание элементов на нужную позицию.
      });
   }
});

// Слайдер с отзывами.
const sliderContainer = document.querySelector(".section-reviews__slider-container");
const review = document.querySelectorAll(".section-reviews__review");
const prevBtn = document.querySelector(".section-reviews__prev-btn");
const nextBtn = document.querySelector(".section-reviews__next-btn");
let currentIndex = 0;
// Функция для смены слайда.
function updateSlider() {
   const offset = -currentIndex * 100; // Рассчёт смещения. Минус для сдвига влево.
   sliderContainer.style.transform = `translateX(${offset}%)`;
}
// Кнопка "Вперёд".
nextBtn.addEventListener("click", () => {
   currentIndex = (currentIndex + 1) % review.length; // Зацикливание слайдов.
   updateSlider();
 });
 // Кнопка "Назад".
prevBtn.addEventListener("click", () => {
   currentIndex = (currentIndex - 1 + review.length) % review.length; // Зацикливание слайдов.
   updateSlider();
 });