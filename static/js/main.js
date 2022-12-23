"use strict";

var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("form-step");
  x[n].style.display = "block";
  var btnPrev = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var agree = document.querySelector('.form-confic');

  if (n == 0) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "inline";
    createCaptcha();
  }

  if (n == x.length - 1) {
    nextBtn.innerHTML = "Подтвердить";
    nextBtn.classList.add('btn-done');
    agree.style.display = "block";
  } else {
    nextBtn.innerHTML = "Далее";
    nextBtn.classList.remove('btn-done');
    agree.style.display = "none";
  }
}

function nextPrev(n) {
  var x = document.getElementsByClassName("form-step");
  var form = document.getElementById('regForm');
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    form.parentNode.lastElementChild.style.display = 'block'; 
    form.style.display = 'none';
    // document.getElementById("regForm").submit();

    return false;
  }

  showTab(currentTab);
}

function validateForm() {
  var x,
      y,
      i,
      valid = true;
  x = document.getElementsByClassName("form-step");
  y = x[currentTab].getElementsByClassName("validate");

  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    } else {
      y[i].classList.remove('invalid');
      y[i].className += " validGreen";
    }
  }

  var errCaptcha = document.getElementById("errCaptcha");
  var reCaptcha = document.getElementById("reCaptcha");
  var recaptcha = reCaptcha.value;

  if (reCaptcha.value !== '') {
    var validateCaptcha = 0;

    for (var z = 0; z < 5; z++) {
      if (recaptcha.charAt(z) != captcha[z]) {
        validateCaptcha++;
      }
    }

    if (recaptcha == "") {
      errCaptcha.innerHTML = "";
      valid = false;
    } else if (validateCaptcha > 0 || recaptcha.length > 6) {
      errCaptcha.innerHTML = "Не совпадает";
      valid = false;
    } else {
      errCaptcha.innerHTML = "";
      return valid;
    }
  }

  return valid;
}

var captcha = new Array();

function createCaptcha() {
  var activeCaptcha = document.getElementById("captcha");

  for (var q = 0; q < 5; q++) {
    if (q % 2 == 0) {
      captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
    } else {
      captcha[q] = Math.floor(Math.random() * 10 + 0);
    }
  }

  var theCaptcha = captcha.join("");
  activeCaptcha.innerHTML = "".concat(theCaptcha);
} // let changeCap = document.querySelector('.changeCapcha');
// changeCap.addEventListener('click', createCaptcha);


$(document).ready(function () {
  //sandwich
  var sandwichToggle = function sandwichToggle() {
    var sandwichElements = document.querySelectorAll('.sandwich');
    sandwichElements.forEach(function (item) {
      item.addEventListener('click', showSandwichTarget);
    });

    function showSandwichTarget() {
      var navTarget = document.querySelector('.nav-wrap');
      var body = document.querySelector('body');
      this.classList.toggle('is-active');
      body.classList.toggle('is-active');
      navTarget.classList.toggle('is-active');
    }
  };

  sandwichToggle(); //lang add remove active

  var langToggle = function langToggle(el, elActive, cls) {
    var langItems = document.querySelectorAll(el);

    function setActiveClass() {
      if (document.querySelector(elActive) != null) {
        document.querySelector(elActive).classList.remove(cls);
      }

      this.classList.add(cls);
    }

    langItems.forEach(function (item) {
      item.addEventListener('click', setActiveClass);
    });
  };

  langToggle('.lang-link', '.lang-link.is-active', 'is-active');
  $(".mask").mask("+7 (999) 999-99-99"); //     let select = () => {
  // 		let selectCurrent = document.querySelectorAll('.select-header'),
  // 			selectItem = document.querySelectorAll('.select-item');
  // 		selectCurrent.forEach((item) => {
  // 			item.addEventListener('click', (e) => {
  // 				e.currentTarget.parentElement.classList.toggle('is-open');
  // 			})
  // 		});
  // 		selectItem.forEach((item) => {
  // 			item.addEventListener('click', (e) => {
  // 				e.currentTarget.closest('.select').querySelector('.select-current').innerHTML = e.currentTarget.innerHTML;
  // 				e.currentTarget.closest('.select').classList.remove('is-open');
  //                 let itemVal = 0;
  //                 let itemValue = item.getAttribute('data-value');
  //                 itemVal = itemValue;
  //                 let currentValue = document.querySelector('.select-current').setAttribute('data-value', itemValue);
  //                 let literPrice = document.querySelector('.js-price-select');
  //                 literPrice.innerHTML = itemVal;
  //                 inputRange();
  // 			})
  // 		});
  // 	};
  //     select();
  //     //range
  //   let inputRange = function inputRange() {
  //     let elem = document.querySelector('input[type="range"]');
  //     let rangeValue = function rangeValue() {
  //         let newValue = elem.value;
  //         let target = document.querySelector('.range-value');
  //         let priceTotal = document.querySelector('.js-price-total');
  //         let priceProfit = document.querySelector('.js-price-profit');
  //         let error = document.querySelector('.error');
  //         let currentSelectValue =  document.querySelector('.select-current').getAttribute('data-value');
  //         let profitVal = 0;
  //         let sum = (newValue * currentSelectValue);
  //         function returnChanges() {
  //             error.classList.remove('error-is-active')
  //             elem.setAttribute('max', 10000);
  //         }
  //         if(currentSelectValue!=0) {
  //             profitVal = 49.59;
  //         }
  //         function rangeChange() {
  //             error.classList.add('error-is-active');
  //             setTimeout(() => returnChanges(), 2000);
  //             if(profitVal != 0) {
  //                 error.classList.remove('error-is-active');
  //                 elem.removeEventListener('input', rangeChange);
  //             }
  //         }
  //         elem.addEventListener('input', rangeChange);
  //         let profit = Math.round(newValue * (profitVal - currentSelectValue)).toFixed(2);
  //         target.innerHTML = newValue;    
  //         priceTotal.innerHTML = sum;
  //         priceProfit.innerHTML = profit;
  //     };
  //     rangeValue();
  //     elem.addEventListener("input", rangeValue);
  //   };
  //   inputRange(); //input
}); //mask

!function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == ("undefined" == typeof exports ? "undefined" : _typeof(exports)) ? require("jquery") : jQuery);
}(function (e) {
  var t,
      n = navigator.userAgent,
      a = /iphone/i.test(n),
      i = /chrome/i.test(n),
      r = /android/i.test(n);
  e.mask = {
    definitions: {
      9: "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    },
    autoclear: !0,
    dataName: "rawMaskFn",
    placeholder: "_"
  }, e.fn.extend({
    caret: function caret(e, t) {
      var n;
      if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function () {
        this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && ((n = this.createTextRange()).collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select());
      })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
        begin: e,
        end: t
      });
    },
    unmask: function unmask() {
      return this.trigger("unmask");
    },
    mask: function mask(n, o) {
      var c, l, u, f, s, h, d;

      if (!n && this.length > 0) {
        var g = e(this[0]).data(e.mask.dataName);
        return g ? g() : void 0;
      }

      return o = e.extend({
        autoclear: e.mask.autoclear,
        placeholder: e.mask.placeholder,
        completed: null
      }, o), c = e.mask.definitions, l = [], u = h = n.length, f = null, e.each(n.split(""), function (e, t) {
        "?" == t ? (h--, u = e) : c[t] ? (l.push(new RegExp(c[t])), null === f && (f = l.length - 1), u > e && (s = l.length - 1)) : l.push(null);
      }), this.trigger("unmask").each(function () {
        function g() {
          if (o.completed) {
            for (var e = f; s >= e; e++) {
              if (l[e] && R[e] === m(e)) return;
            }

            o.completed.call(j);
          }
        }

        function m(e) {
          return o.placeholder.charAt(e < o.placeholder.length ? e : 0);
        }

        function p(e) {
          for (; ++e < h && !l[e];) {
            ;
          }

          return e;
        }

        function v(e, t) {
          var n, a;

          if (!(0 > e)) {
            for (n = e, a = p(t); h > n; n++) {
              if (l[n]) {
                if (!(h > a && l[n].test(R[a]))) break;
                R[n] = R[a], R[a] = m(a), a = p(a);
              }
            }

            y(), j.caret(Math.max(f, e));
          }
        }

        function b() {
          x(), j.val() != A && j.change();
        }

        function k(e, t) {
          var n;

          for (n = e; t > n && h > n; n++) {
            l[n] && (R[n] = m(n));
          }
        }

        function y() {
          j.val(R.join(""));
        }

        function x(e) {
          var t,
              n,
              a,
              i = j.val(),
              r = -1;

          for (t = 0, a = 0; h > t; t++) {
            if (l[t]) {
              for (R[t] = m(t); a++ < i.length;) {
                if (n = i.charAt(a - 1), l[t].test(n)) {
                  R[t] = n, r = t;
                  break;
                }
              }

              if (a > i.length) {
                k(t + 1, h);
                break;
              }
            } else R[t] === i.charAt(a) && a++, u > t && (r = t);
          }

          return e ? y() : u > r + 1 ? o.autoclear || R.join("") === S ? (j.val() && j.val(""), k(0, h)) : y() : (y(), j.val(j.val().substring(0, r + 1))), u ? t : f;
        }

        var j = e(this),
            R = e.map(n.split(""), function (e, t) {
          return "?" != e ? c[e] ? m(t) : e : void 0;
        }),
            S = R.join(""),
            A = j.val();
        j.data(e.mask.dataName, function () {
          return e.map(R, function (e, t) {
            return l[t] && e != m(t) ? e : null;
          }).join("");
        }), j.one("unmask", function () {
          j.off(".mask").removeData(e.mask.dataName);
        }).on("focus.mask", function () {
          var e;
          j.prop("readonly") || (clearTimeout(t), A = j.val(), e = x(), t = setTimeout(function () {
            j.get(0) === document.activeElement && (y(), e == n.replace("?", "").length ? j.caret(0, e) : j.caret(e));
          }, 10));
        }).on("blur.mask", b).on("keydown.mask", function (e) {
          if (!j.prop("readonly")) {
            var t,
                n,
                i,
                r = e.which || e.keyCode;
            d = j.val(), 8 === r || 46 === r || a && 127 === r ? (n = (t = j.caret()).begin, (i = t.end) - n == 0 && (n = 46 !== r ? function (e) {
              for (; --e >= 0 && !l[e];) {
                ;
              }

              return e;
            }(n) : i = p(n - 1), i = 46 === r ? p(i) : i), k(n, i), v(n, i - 1), e.preventDefault()) : 13 === r ? b.call(this, e) : 27 === r && (j.val(A), j.caret(0, x()), e.preventDefault());
          }
        }).on("keypress.mask", function (t) {
          if (!j.prop("readonly")) {
            var n,
                a,
                i,
                o = t.which || t.keyCode,
                c = j.caret();
            t.ctrlKey || t.altKey || t.metaKey || 32 > o || !o || 13 === o || (c.end - c.begin != 0 && (k(c.begin, c.end), v(c.begin, c.end - 1)), n = p(c.begin - 1), h > n && (a = String.fromCharCode(o), l[n].test(a)) && (function (e) {
              var t, n, a, i;

              for (t = e, n = m(e); h > t; t++) {
                if (l[t]) {
                  if (a = p(t), i = R[t], R[t] = n, !(h > a && l[a].test(i))) break;
                  n = i;
                }
              }
            }(n), R[n] = a, y(), i = p(n), r ? setTimeout(function () {
              e.proxy(e.fn.caret, j, i)();
            }, 0) : j.caret(i), c.begin <= s && g()), t.preventDefault());
          }
        }).on("input.mask paste.mask", function () {
          j.prop("readonly") || setTimeout(function () {
            var e = x(!0);
            j.caret(e), g();
          }, 0);
        }), i && r && j.off("input.mask").on("input.mask", function () {
          var e = j.val(),
              t = j.caret();

          if (d && d.length && d.length > e.length) {
            for (x(!0); t.begin > 0 && !l[t.begin - 1];) {
              t.begin--;
            }

            if (0 === t.begin) for (; t.begin < f && !l[t.begin];) {
              t.begin++;
            }
            j.caret(t.begin, t.begin);
          } else {
            for (x(!0); t.begin < h && !l[t.begin];) {
              t.begin++;
            }

            j.caret(t.begin, t.begin);
          }

          g();
        }), x();
      });
    }
  });
});