"use strict";

$(document).ready(function () {
  $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    callbacks: {
      open: function open() {
        $('.form-close').on('click', function (event) {
          event.preventDefault();
          $.magnificPopup.close();
        });
        $('body').css('overflow', 'hidden');
      },
      close: function close() {
        $('body').css('overflow', 'visible');
      }
    }
  });
  $('.js-slider').on('init', function () {
    $('.js-slider').removeClass('dn');
  });
  $('.js-slider').slick({
    centerMode: false,
    slidesToShow: 3,
    focusOnSelect: true,
    dots: false,
    infinite: false,
    nextArrow: $(".slider-nav__next"),
    prevArrow: $(".slider-nav__prev"),
    responsive: [{
      breakpoint: 905,
      settings: {
        centerMode: false,
        centerPadding: '40px',
        slidesToShow: 2
      }
    }, {
      breakpoint: 575,
      settings: {
        arrows: false,
        centerMode: false,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }]
  }); //sandwich

  var sandwichToggle = function sandwichToggle() {
    // Выбираем элементы, которые нам нужны. В примере мы ищем элементы с классом "sandwich"
    var sandwichElements = document.querySelectorAll('.sandwich'); // Проходим циклом по всем эдементам и на каждый элемент вешаем слушателя, который по клику будет переключать класс

    sandwichElements.forEach(function (item) {
      item.addEventListener('click', showSandwichTarget);
    });

    function showSandwichTarget() {
      this.classList.toggle('is-active');
      var slideTogle = document.querySelector('.header-mobInfo');
      slideTogle.classList.toggle('is-active');
    }
  };

  sandwichToggle(); //клик вне области

  var div = document.querySelector('.header');
  document.addEventListener('click', function (e) {
    var withinBoundaries = e.composedPath().includes(div);
    var slideTogle = document.querySelector('.header-mobInfo');
    var sandwich = document.querySelector('.sandwich');

    if (!withinBoundaries) {
      sandwich.classList.remove('is-active');
      slideTogle.classList.remove('is-active');
    }
  }); //lazy laod yandeax map

  // document.addEventListener('DOMContentLoaded', function () {
  //   setTimeout(initYandexMap, 5000);
  // });
  // document.addEventListener('scroll', initYandexMapOnEvent);
  // document.addEventListener('mousemove', initYandexMapOnEvent);
  // document.addEventListener('touchstart', initYandexMapOnEvent);

  // function initYandexMapOnEvent(e) {
  //   initYandexMap();
  //   e.currentTarget.removeEventListener(e.type, initYandexMapOnEvent);
  // }

  // function initYandexMap() {
  //   if (window.yandexMapDidInit) {
  //     return false;
  //   }

  //   window.yandexMapDidInit = true;
  //   var script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9ec0336b62f79a432fbfd667876eb5f4790f8b03fd3e2455227e9b9903e7cc52&amp;width=100%25&amp;height=388&amp;lang=ru_RU&amp;scroll=true';
  //   document.getElementById("YandexMap").appendChild(script);
  // } 
  
  //форма и валидация
  function formSet(formID) {
    let form = document.getElementById(formID);
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });

            if(response.ok) {
                
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('ошибка')
            }
        } else {
            // alert('Заполните обязательные поля');
            form.classList.remove('_sending');
        }
    }
    //маска телефона
    let phoneInp = document.getElementById('formTel');
   

    let showhide = document.getElementById('cheaderinput');
    let patternMask = new IMask(phoneInp, {
      mask: '+{7}(000)000-00-00',
      lazy: true,  // make placeholder always visible
      placeholderChar: '_'     // defaults to '_'
    });
    phoneInp.addEventListener('focus', function() {
      patternMask.updateOptions({ lazy: false });
    }, true);
    phoneInp.addEventListener('blur', function() {
      patternMask.updateOptions({ lazy: true });
      // NEXT IS OPTIONAL
      if (!patternMask.masked.rawInputValue) {
        patternMask.value = '';
      }
    }, true);

    function formValidate(form) {
        
        let error = 0;
        let formReg = form.querySelectorAll('._reg');

        
        for (let index = 0; index < formReg.length; index++) {
            const input = formReg[index];
            formRemoveError(input);
            //проверка тела

            if(input.classList.contains('_tell')) {
                if(input.value.length < 16 ){
                    formAddError(input);
                    input.focus();
                    error++;
                }
            }
             else {
                
                if(input.value === '') {
                    formAddError(input);
                    error++;
                } else {
                    showSucces(input);
                }
            }
        } 
        return error
    }
    //обработка ошибок
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
       
    }
    //показать если поле заполнено правильно
    function showSucces(input) {
        input.parentElement.classList.add('_succes');
    }

    
    //функция проверки телефона
    // function phoneTest(input) {
    //     return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
    // }
    
}
formSet('form');

	
	$(function () {

    if ($("#map").length > 0) {

      $.ajax({
        url: "/static/js/ymaps-api.js",
        dataType: "script",
        success: function() {
            ymaps.ready(init);
          function init() {
            var myMap = new ymaps.Map('map', {
              center: [51.612367, 39.241107],
              searchControlProvider: 'yandex#search',
              zoom: 15,
              controls: []
            }, {
              zoomControlPosition: {
                right: 0,
                top: 0
              },
              suppressMapOpenBlock: true,
            });
            var pointer = [
              [51.612367, 39.241107]
            ];
            var modalContent = [
              ['<div class="map__modal"><span class="map__modal_title">Офис:</span><span class="map__modal_subtitle">г. Воронеж, ул. Цимлянская, 8А</span><a href="https://2gis.ru/voronezh/search/51.612367%2C%2039.241107/geo/4363472024371205/39.241107%2C51.612367?m=39.241107%2C51.612367%2F17.86" target="_blank">Как добраться?</a></div></div>'],
            ];
      
      
            $(".map-address").click(function () {
              myMap.panTo(pointer[parseInt($(this).data('i')) - 1], {
                delay: 1500,
              });
      
            });
      
            // Создадим пользовательский макет ползунка масштаба.
            ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map-nav__wrapper'><div class='map-nav__block'>" + "<div id='zoom-in' title='Приблизить'><i class='map-nav__icon-plus'></i> <span>Приблизить</span></div>" + "<div id='zoom-out' title='Отдалить'><i class='map-nav__icon-minus'></i><span>Отдалить</span></div>" + "</div></div>", {
              build: function () {
                ZoomLayout.superclass.build.call(this);
                this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);
                $('#zoom-in').bind('click', this.zoomInCallback);
                $('#zoom-out').bind('click', this.zoomOutCallback);
              },
              clear: function () {
                $('#zoom-in').unbind('click', this.zoomInCallback);
                $('#zoom-out').unbind('click', this.zoomOutCallback);
                ZoomLayout.superclass.clear.call(this);
              },
              zoomIn: function () {
                var map = this.getData().control.getMap();
                map.setZoom(map.getZoom() + 1, {
                  checkZoomRange: true
                });
              },
              zoomOut: function () {
                var map = this.getData().control.getMap();
                map.setZoom(map.getZoom() - 1, {
                  checkZoomRange: true
                });
              }
            }),
              zoomControl = new ymaps.control.ZoomControl({
                options: {
                  layout: ZoomLayout
                }
              });
      
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div class="map__title">$[properties.iconContent]</div>');
            for (i = 0; i < pointer.length; ++i) {
              ballunstolitsa = new ymaps.Placemark(pointer[i], {
                iconContent: '',
                balloonContent: modalContent[i],
              }, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: '/static/images/content/pin.svg',
                iconImageSize: [35, 35],
                iconImageOffset: [-14, -14],
                iconContentOffset: [60, 5],
                iconContentLayout: MyIconContentLayout
              });
      
              myMap.controls.add(zoomControl);
              myMap.behaviors.disable('scrollZoom');
              myMap.behaviors.disable('multiTouch');
              myMap.geoObjects.add(ballunstolitsa);
                myMap.geoObjects.events.add('click', function (e) {
                myMap.setZoom(16, { duration: 1000 });
                var targetObject = e.get('target');
                // myMap.setCenter(targetObject.geometry.getCoordinates());
              });      
            }      
            myMap.events.add('click', function () {
              myMap.balloon.close();
            });
      
            //получить Текущий Центр И Увеличить
            var pixelCenter = myMap.getGlobalPixelCenter('map');
      
            function onResizeMap() {
              if (!($("#contactsMap").length)) {
                if ($(window).width() > '900') {
                  myMap.setCenter([51.612367, 39.241107]);
                  var pixelCenter2 = myMap.getGlobalPixelCenter('map');
                } else if ($(window).width() > '750') {
                  myMap.setCenter([51.612367, 39.237107]);
                } else {
                  myMap.setCenter([51.612367, 39.241107]);
                }
              }
            } onResizeMap();
      
            window.onresize = function () {
              onResizeMap();
            };      
          }
        }
      });    
    }    
  });


});