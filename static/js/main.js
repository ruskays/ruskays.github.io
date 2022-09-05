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
  $('.js-link-hover').on("mouseenter", function () {
    $(this).parent().prev().find('.zagimg').attr('src', $(this).attr('data-back-src'));
  }); //mobTabs Product

  var tab = function tab() {
    var tabNav = document.querySelectorAll('.tabs-nav__item'),
        // Выбираем элементы навигации табов
    tabContent = document.querySelectorAll('.tabs-content__item'),
        // Выбираем самы табы
    tabName; // Переменная для имени таба
    // Проходим циклом по каждому элементу навигации и навешиваем обработчик клика, который вызывает функцию selectTabNav

    tabNav.forEach(function (item) {
      item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
      tabNav.forEach(function (item) {
        // Удаляем активный класс у всех элементов навигации табов
        item.classList.remove('is-active');
      });
      this.classList.add('is-active'); // Добавляем активный укласс у элемента по которому кликнули

      tabName = this.getAttribute('data-tab-name'); // Получаем имя таба, который нам нужен

      selectTabContent(tabName); // Запускаем функцию, чтобы показать выбранный таб
    }

    function selectTabContent(tab) {
      // Проходим по всем табам и проверяем есть ли у элемента класс, равный имени таба(переменной tabName). Если есть, то добавляем класс активного таба, если нет, то удаляем этот класс
      tabContent.forEach(function (item) {
        var classList = item.classList;
        classList.contains(tab) ? classList.add('is-active') : classList.remove('is-active');
      });
    }
  };

  tab();
  
});