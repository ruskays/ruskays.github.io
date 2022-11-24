"use strict";
let sandwichElements = document.querySelectorAll('.sandwich');
    sandwichElements.forEach(function (item) {
      item.addEventListener('click', showSandwichTarget);
    });

    function showSandwichTarget() {
      let navTarget = document.querySelector('.sidebar');
      this.classList.toggle('is-active');
      navTarget.classList.toggle('is-active');
    }

    document.addEventListener('click', function (e) {
      let navTarget = document.querySelector('.sidebar');
      let sandwich = document.querySelector('.sandwich');
      let divContains = e.composedPath().includes(navTarget);

      if (!divContains) {
        navTarget.classList.remove('is-active'); // navActive.classList.remove('is-active');

        sandwich.classList.remove('is-active');
      }
    });
document.addEventListener('DOMContentLoaded', function () {
  var catToggle = function catToggle() {
    var catItem = document.getElementsByClassName('cat-item');
    var catWrap = document.getElementsByClassName('cat-item__wrap');

    for (var i = 0; i < catWrap.length; i++) {
      catWrap[i].addEventListener('click', toggleItem, false);
    }

    function toggleItem() {
      var itemClass = this.parentNode.className;

      for (var _i = 0; _i < catItem.length; _i++) {
        catItem[_i].className = 'cat-item close';
      }

      if (itemClass == 'cat-item close') {
        this.parentNode.className = 'cat-item open';
      }
    }
  };

  catToggle(); //sandwich

  
});

if( window.innerWidth >= 600 ){
      //выполнять

//обьявление переменных
let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

//функция запуска всех переменных
window.onload = function() {
    canvas = document.getElementById('canvas1')
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height)
    flowField.animate(0)
}

//обновление анимации и что бы канвас нормально выглядел при смене разрешения
window.addEventListener('resize', ()=> {
    cancelAnimationFrame(flowFieldAnimation)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height)
    flowField.animate(0)
})

//анимация с участием мыши
const mouse = {
    x: 0,
    y: 0,
}
window.addEventListener('mousemove', (e) => {
    // console.log(e)
    mouse.x = e.x
    mouse.y = e.y
})

//тут сам обьект 
class FlowFieldEffect {
    #ctx
    #width
    #height
    constructor(ctx, width, height) {
        this.#ctx = ctx
        // цвет заливки элементов
        // this.#ctx.strokeStyle = 'white'
       
        this.#ctx.lineWidth = .3
        this.#width = width
        this.#height = height
        // this.x = 0
        // this.y = 0
        // this.angle = 0
        this.lastTime = 0
        //тоже к fps
        this.interval = 1000/60 //smoothAnimation
        this.timer = 0
        this.cellSize = 15
        this.gradient
        this.#createGradient()
         //цвет заливки элементов градиентом
         this.#ctx.strokeStyle = this.gradient
         this.radius = 5
         this.vr = 0.03
    }

    #createGradient() {
        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop("0.1", '#ff5c33')
        this.gradient.addColorStop("0.2", '#ff66b3')
        this.gradient.addColorStop("0.4", '#cccfff')
        this.gradient.addColorStop("0.6", '#b3ffff')
        this.gradient.addColorStop("0.8", '#80ff80')
        this.gradient.addColorStop("0.9", '#ffff33')
        
        
    }
    //что рисуем
    #drawLine(angle,x, y) {
        let positionX = x
        let positionY = y
        let dx = mouse.x - positionX
        let dy = mouse.y - positionY
        let distance = dx * dx + dy * dy;
        if (distance > 600000) distance = 600000
        else if (distance < 50000) distance = 50000
        //длина линии в нашем случае
        const length = distance/10000
        this.#ctx.beginPath()
        this.#ctx.moveTo(x, y)
        //перемещение линии 
        
        // this.#ctx.lineTo(x + length, y + length); //перемещение линии автоматически
        this.#ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length); //взаимодействие с мышью
        this.#ctx.stroke()
    }
    //тут как анимируем
    animate(timeStamp) {
        //скоростьь отображения анимации fps типо
        const deltaTime = timeStamp - this.lastTime
        this.lastTime = timeStamp

        //условия перерисовки анимации
        if(this.timer > this.interval) {
            // this.angle += 0.1;
        //тут перересовка линии при движении
        this.#ctx.clearRect(0, 0, this.#width, this.#height)
            this.radius += this.vr
            //путь анимации если доходит до точки то возвращается назад
            if(this.radius > 5 || this.radius < -5) this.vr *= -1
        //анимация линии автоматом по sin and cos
        // this.#draw(this.#width/3 + Math.sin(this.angle) * 100, this.#height/2 + Math.cos(this.angle) * 100)
        // this.x += 0.5
        // this.y += 0.5
        // console.log('animb')
        // console.log(timeStamp)
        
        for(let y = 0; y < this.#height; y+= this.cellSize) {
            for (let x= 0; x < this.#width; x +=this.cellSize) {
                const angle = (Math.cos(x * 0.01) + Math.sin(y * 0.01)) * this.radius
                this.#drawLine(angle, x, y)
            }
        }
        


        this.timer = 0
        } else {
            this.timer +=deltaTime
        } 
        
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
    }
}
 }