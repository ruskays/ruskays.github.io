"use strict";

$(document).ready(function () {
  //переключалка языка
  $(document).on('click', '.lang-item', function () {
    $('.lang-item').removeClass('lang-item--active');
    $(this).addClass('lang-item--active');
  });
});