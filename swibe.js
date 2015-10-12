/**
 * Swibe menu
 * https://github.com/barcia/swibe-menu
 * Made in Galicia by Iván Barcia | @bartzia | ivanbarcia.eu
 */

"use strict";

var strings = {
  buttonID: "swibe-menu-button",
  menuId: "swibe-menu",
  menuOpenClass: "open",
  shadowClass: "swibe-shadow",
  shadowID: "swibe-shadow",
  shadowOpenCLass: "enabled"
}

var conf = {
  time: 200, //Tiempo en ms de la animaciones. Debe ser igual al del CSS
  slideZoneStart: 15, //En px, distancia al borde izquierdo dentro de la cual debemos empezar a tocar para deslizar el menú
  slideZoneEnd: 20 //En px, distancia al borde izquierdo fuera de la cual debemos parar de tocar para deslizar el menú
}

var activator;
var menu;
var body;
var shadow;
var slideStartX;
var slideEndX;
var shadowSlideStartX;
var shadowSlideEndX;

//Eventos que se realizan después de cargar la página
window.onload = loadMenu;

//Función que carga el menú
function loadMenu() {
  activator = document.getElementById(strings.buttonID);
  menu = document.getElementById(strings.menuId);
  if (activator && menu) {
    body = document.getElementsByTagName('body')[0];
    body.addEventListener('touchstart', slideStart);
    activator.addEventListener('click', slideMenu);
    body.addEventListener('touchend', slideEnd);
    console.info("Slide menu cargado correctamente.")
  }
}

//Función que abre el menú
function openMenu() {
  menu.classList.add(strings.menuOpenClass);
  body.style.overflowY="hidden";
}

//Función que crea la sombra
function createShadow() {
  shadow = document.createElement('div');
  body.appendChild(shadow);
  shadow.id = strings.shadowID;
  shadow.classList.add(strings.shadowClass);
  setTimeout(function(){
    shadow.classList.add(strings.shadowOpenCLass);
  }, 0.1);
  shadow.addEventListener('click', closeAll); //Añade evento a la sombra: Al hacer clic, ejecuta la función 'closeAll'
  shadow.addEventListener('touchstart', shadowSlideStart);
  shadow.addEventListener('touchend', shadowSlideEnd);
}

//Función que reúne las dos anteriores, ya que siempre van unidas
function slideMenu() {
  openMenu();
  createShadow();
}

//Función que cierra todo
function closeAll() {
  menu.classList.remove(strings.menuOpenClass);
  shadow.classList.remove(strings.shadowOpenCLass);
  body.removeAttribute("style");
  setTimeout(function(){
    shadow.remove();
  }, conf.time);
}

//Funciones para abrir todo deslizando desde el lateral izquierdo
function slideStart(event) {
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    slideStartX = touch.pageX;
    confirm.log(touch.pageX)
  }
}

function slideEnd(event) {
  var touch = event.changedTouches[0]
  slideEndX = touch.pageX;
  console.log()
  if (slideStartX < conf.slideZoneStart && slideEndX > conf.slideZoneEnd && !menu.classList.contains(strings.menuOpenClass)) {
    slideMenu();
  }
}

//Funciones para cerrar todo deslizando desde la sombra
function shadowSlideStart(event) {
  if (event.targetTouches.length == 1) {
    var touch = event.targetTouches[0];
    shadowSlideStartX = touch.pageX;
  }
}

function shadowSlideEnd(event) {
  var touch = event.changedTouches[0]
  shadowSlideEndX = touch.pageX;
  if (shadowSlideStartX > shadowSlideEndX) {
    closeAll();
  }
}