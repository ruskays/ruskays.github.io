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
  }); // I hope this over-commenting helps. Let's do this!
  // Let's use the 'active' variable to let us know when we're using it

  var active = false; // First we'll have to set up our event listeners
  // We want to watch for clicks on our scroller

  document.querySelector('.scroller').addEventListener('mousedown', function () {
    active = true; // Add our scrolling class so the scroller has full opacity while active

    document.querySelector('.scroller').classList.add('scrolling');
  }); // We also want to watch the body for changes to the state,
  // like moving around and releasing the click
  // so let's set up our event listeners

  document.body.addEventListener('mouseup', function () {
    active = false;
    document.querySelector('.scroller').classList.remove('scrolling');
  });
  document.body.addEventListener('mouseleave', function () {
    active = false;
    document.querySelector('.scroller').classList.remove('scrolling');
  }); // Let's figure out where their mouse is at

  document.body.addEventListener('mousemove', function (e) {
    if (!active) return; // Their mouse is here...

    var x = e.pageX; // but we want it relative to our wrapper

    x -= document.querySelector('.sliderwrapper').getBoundingClientRect().left; // Okay let's change our state

    scrollIt(x);
  }); // Let's use this function

  function scrollIt(x) {
    var transform = Math.max(0, Math.min(x, document.querySelector('.sliderwrapper').offsetWidth));
    document.querySelector('.after').style.width = transform + "px";
    document.querySelector('.scroller').style.left = transform - 25 + "px";
  } // Let's set our opening state based off the width, 
  // we want to show a bit of both images so the user can see what's going on


  scrollIt(950); // And finally let's repeat the process for touch events
  // first our middle scroller...

  document.querySelector('.scroller').addEventListener('touchstart', function () {
    active = true;
    document.querySelector('.scroller').classList.add('scrolling');
  });
  document.body.addEventListener('touchend', function () {
    active = false;
    document.querySelector('.scroller').classList.remove('scrolling');
  });
  document.body.addEventListener('touchcancel', function () {
    active = false;
    document.querySelector('.scroller').classList.remove('scrolling');
  });
  $('.js-slider-prod').slick({
    dots: true,
    arrows: false,
    appendDots: $('.slick-slider-dots')
  });
});