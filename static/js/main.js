"use strict";

$(document).ready(function () {
  var sandwichToggle = function sandwichToggle() {
    // Выбираем элементы, которые нам нужны. В примере мы ищем элементы с классом "sandwich"
    var sandwichElements = document.querySelectorAll('.sandwich'); // Проходим циклом по всем эдементам и на каждый элемент вешаем слушателя, который по клику будет переключать класс

    sandwichElements.forEach(function (item) {
      item.addEventListener('click', showSandwichTarget);
    });

    function showSandwichTarget() {
      var targetId = this.getAttribute('data-target-id'),
          targetClassToggle = this.getAttribute('data-target-class-toggle');
      this.classList.toggle('is-active');

      if (targetId && targetClassToggle) {
        document.getElementById(targetId).classList.toggle(targetClassToggle);
      }
    }

    var sandwichForClick = document.querySelector('.sandwich');
    sandwichForClick.addEventListener('click', function () {
      document.querySelector('.nav-wrap').classList.add('nav-wrap--active');
    });
    document.querySelector('.js-close--menu').addEventListener('click', function () {
      document.querySelector('.nav-wrap').classList.remove('nav-wrap--active');
      sandwichForClick.classList.remove('is-active');
    });
  };

  sandwichToggle(); //переключалка языка

  $(document).on('click', '.lang-item', function () {
    $('.lang-item').removeClass('lang-item--active');
    $(this).addClass('lang-item--active');
  }); //клик вне эдемента меню 

  $(document).mouseup(function (e) {
    // событие клика по веб-документу
    var div = $(".nav-wrap--items"); // тут указываем ID элемента

    if (!div.is(e.target) // если клик был не по нашему блоку
    && div.has(e.target).length === 0) {
      // и не по его дочерним элементам
      $('.nav-wrap').removeClass('nav-wrap--active'); // скрываем его

      $('.sandwich').removeClass('is-active');
    }
  });
});