"use strict";

document.addEventListener('DOMContentLoaded', function () {
  //preloader
  $('.js-banner').slick({
    fade: true,
    nextArrow: '.js-banner__next',
    prevArrow: '.js-banner__prev',
    dots: true,
    appendDots: $('.js-banner-dots')
  });
  var image = document.getElementsByClassName('paralax-img');
  new simpleParallax(image, {
    scale: 1.3,
    delay: .6,
    transition: 'cubic-bezier(0,0,0,1)'
  }); 

  var sandwichToggle = function sandwichToggle() {
    // Выбираем элементы, которые нам нужны. В примере мы ищем элементы с классом "sandwich"
    var sandwichElements = document.querySelectorAll('.sandwich'); // Проходим циклом по всем эдементам и на каждый элемент вешаем слушателя, который по клику будет переключать класс

    sandwichElements.forEach(function (item) {
      item.addEventListener('click', showSandwichTarget);
    });

    function showSandwichTarget() {
      var navTarget = document.querySelector('.nav-wrap');
      this.classList.toggle('is-active');
      navTarget.classList.toggle('is-active');
    }
  };

  sandwichToggle();
});