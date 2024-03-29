"use strict";

$(document).ready(function () {
  $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    fixedContentPos: false,
    callbacks: {
      open: function open() {
        $('.white-popup-close').on('click', function (event) {
          event.preventDefault();
          $.magnificPopup.close();
        });
        $('html').css('overflow', 'hidden');
        $("body").css('overflow', 'scroll');
      },
      close: function close() {
        $('html').css('overflow', 'visible');
        $('body').css('overflow', 'visible');
      },
    }
  });



  $('.js-slider').on('init', function () {
    $('.js-slider').removeClass('dn');
  });
  $('.js-slider').slick({
    centerMode: false,
    slidesToShow: 3,
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
        centerPadding: '40px',
        slidesToShow: 1
      }
    }]
  });

   //sandwich
  $('.sandwich-wrap').on('click', function() {
    $('.sandwich').toggleClass('is-active');
    $('.header-mobInfo').slideToggle()
  })
  

  //клик вне области

  var div = document.querySelector('.header');
  document.addEventListener('click', function (e) {
    var withinBoundaries = e.composedPath().includes(div);
    var slideTogle = document.querySelector('.header-mobInfo');
    var sandwichWrap = document.querySelector('.sandwich-wrap');

    if (!withinBoundaries) {
      sandwichWrap.firstElementChild.classList.remove('is-active');
      // sandwich.classList.remove('is-active');
      slideTogle.style.display = "none";
    }
  }); 
  
  
  //форма и валидация
  function formSet(formID) {
    let form = document.getElementById(formID);
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        let myForm = document.querySelector('.form');
        let formOk = document.querySelector('._formOk');
        let formError = document.querySelector('._formError')
        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('/js/smart.php', {
                method: 'POST',
                body: formData
            });

            if(response.ok) {
                
                let result = await response;
                // console.log(result);
                myForm.classList.add('hidden');
                formOk.classList.add('is-active');
                ym(93341694,'reachGoal','call');
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                myForm.classList.add('hidden');
                formError.classList.add('is-active');
               
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
        url: "/js/ymaps-api.js",
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
            let ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map-nav__wrapper'><div class='map-nav__block'>" + "<div id='zoom-in' title='Приблизить'><i class='map-nav__icon-plus'></i> <span>Приблизить</span></div>" + "<div id='zoom-out' title='Отдалить'><i class='map-nav__icon-minus'></i><span>Отдалить</span></div>" + "</div></div>", {
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
      
            let MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div class="map__title">$[properties.iconContent]</div>');
            for (let i = 0; i < pointer.length; ++i) {
              let ballunstolitsa = new ymaps.Placemark(pointer[i], {
                iconContent: '',
                balloonContent: modalContent[i],
              }, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: '/images/content/pin.svg',
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