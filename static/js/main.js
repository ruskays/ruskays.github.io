"use strict";

document.addEventListener('DOMContentLoaded', function () {

  //активный класс lang
  $('.lang-item').on('click', function() {
    $('.lang-item').removeClass('is--active');
    $(this).addClass('is--active')
  })

  //slider banner
  $('.js-banner').slick({
    fade: true,
    nextArrow: '.js-banner__next',
    prevArrow: '.js-banner__prev',
    dots: true,
    appendDots: $('.js-banner-dots')
  });


  //паралакс 
  let paralaxImg = () => {
    var image = document.getElementsByClassName('paralax-img');
    new simpleParallax(image, {
      scale: 1.3,
      delay: .6,
      transition: 'cubic-bezier(0,0,0,1)'
    }); 

  }
  paralaxImg()
  
  //sendwich
  let sandwichToggle = function sandwichToggle() {
    // Выбираем элементы, которые нам нужны. В примере мы ищем элементы с классом "sandwich"
    var sandwichElements = document.querySelectorAll('.sandwich'); // Проходим циклом по всем эдементам и на каждый элемент вешаем слушателя, который по клику будет переключать класс

    sandwichElements.forEach(function (item) {
      item.addEventListener('click', showSandwichTarget);
    });

    function showSandwichTarget() {
      var navTarget = document.querySelector('.header-right__wrap');
      var headerTarget = document.querySelector('.slide-cont');
      var wrapper = document.querySelector('.wrapper');
      this.classList.toggle('is-active');
      navTarget.classList.toggle('is-active');
      wrapper.classList.toggle('is-active');
      headerTarget.classList.toggle('is-active');
    }
  };

  sandwichToggle();
});