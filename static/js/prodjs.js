"use strict";

$(document).ready(function () {
  $('.js-slider-prod').slick({
    dots: true,
    arrows: false,
    appendDots: $('.slick-slider-dots')
  });
  $('.js-slider-prod2').slick({
    dots: true,
    arrows: false,
    appendDots: $('.slick-slider-dots2')
  });
  $('.js-slider-prod3').slick({
    dots: true,
    arrows: false,
    appendDots: $('.slick-slider-dots3')
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


  if ($(window).width() > 1600) {
    scrollIt(950);
  } else if ($(window).width() > 1200) {
    scrollIt(650);
  } else if ($(window).width() > 800) {
    scrollIt(500);
  } else {
    scrollIt(210);
  } // And finally let's repeat the process for touch events
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
  }); //sliderprod2

  $('.js-slider-img').slick({
    dots: true,
    arrows: false,
    appendDots: $('.slick-slider-dotsimg')
  });
  $('.js-slider-img2').slick({
    dots: true,
    arrows: false,
    appendDots: $('.slick-slider-dotsimg2')
  });
  $('.js-slider-img3').slick({
    dots: true,
    arrows: false,
    appendDots: $('.slick-slider-dotsimg3')
  });
  $('.js-slider-img4').slick({
    dots: true,
    arrows: false,
    appendDots: $('.slick-slider-dotsimg4')
  });
});