"use strict";

document.addEventListener('DOMContentLoaded', function(){
  //select
  var select = function select() {
    var selectCurrent = document.querySelectorAll('.select__header'),
        selectItem = document.querySelectorAll('.select__item');
    selectCurrent.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.currentTarget.parentElement.classList.toggle('is-open');
      });
    });
    selectItem.forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.currentTarget.closest('.select').querySelector('.select__current').innerHTML = e.currentTarget.innerHTML;
        e.currentTarget.closest('.select').classList.remove('is-open');
      });
    });
  };

  select(); //range

  var inputRange = function inputRange() {
    var elem = document.querySelector('input[type="range"]');

    var rangeValue = function rangeValue() {
      var newValue = elem.value;
      var target = document.querySelector('.range-value');
      target.innerHTML = newValue;
    };

    elem.addEventListener("input", rangeValue);
  };

  inputRange(); //input

  var fileInput = document.getElementById("file-upload-input");
  var fileSelect = document.getElementsByClassName("file-upload-select")[0];

  fileSelect.onclick = function () {
    fileInput.click();
  };

  fileInput.onchange = function () {
    var filename = fileInput.files[0].name;
    var selectName = document.getElementsByClassName("file-select-name")[0];
    selectName.innerText = filename;
  }; //sandwich


  var sandwichToggle = function sandwichToggle() {
    var sandwichElements = document.querySelectorAll('.sandwich');
    sandwichElements.forEach(function (item) {
      item.addEventListener('click', showSandwichTarget);
    });

    function showSandwichTarget() {
      var navTarget = document.querySelector('.nav');
      this.classList.toggle('is-active');
      navTarget.classList.toggle('is-active');
    }

    document.addEventListener('click', function (e) {
      var navTarget = document.querySelector('.nav-wrap');
      var navActive = document.querySelector('.nav');
      var sandwich = document.querySelector('.sandwich');
      var divContains = e.composedPath().includes(navTarget);

      if (!divContains) {
        navActive.classList.remove('is-active');
        sandwich.classList.remove('is-active');
      }
    });
  };

  sandwichToggle();
});