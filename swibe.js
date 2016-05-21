/**
 * Swibe
 * MIT License
 * https://github.com/barcia/swibe
 * Made in Galiza by Iván Barcia | @bartzia | barcia.cc
 */

swibe();

function swibe() {
  'use strict';

  // Variables
  var button;
  var menu;
  var body;
  var shadow;
  var slideXCurrent;
  var slideXPrevious;
  var slideYCurrent;
  var touchX;
  var touchY;

  // Config
  // 1. In px. Width of the area to the left of the screen that detects the
  //    slide movement to open the menu
  // 2. In px. Min pixeles of movement that are required to close the menu
  // 3. In deg. Max angle of slide movement who is accepted to close the menu
  var conf = {
    slideZone: 20, // 1
    minMov: 15, // 2
    maxAngle: 10, // 3
    strings: {
      buttonId: "swibe-button",
      menuId: "swibe-menu",
      shadowId: "swibe-shadow",
      shadowClass: "swibe-shadow",
      menuOpenClass: "swibe-menu--open",
      shadowOpenCLass: "swibe-shadow--enabled"
    }
  };

  // Utilities
  function calcMov(finalPoint, initialPoint) {
    var mov = (finalPoint - initialPoint);
    return mov;
  }

  function calcAngle(Y, X) {
    var theta = Math.atan(Y / X);
    var angle = theta * 180 / Math.PI;
    return angle;
  }



  window.addEventListener('load', loadMenu); // Load the menu at beginning

  function loadMenu() {
    body = document.body;
    button = document.getElementById(conf.strings.buttonId);
    menu = document.getElementById(conf.strings.menuId);

    if (body && button && menu) {
      button.addEventListener('click', openMenu);
      body.addEventListener('touchstart', touchStart);
      body.addEventListener('touchmove', slideMenu);
      createShadow(); // Create the shadow at beginning
    }
  }

    function createShadow() {
      shadow = document.createElement('div');
      body.appendChild(shadow);
      shadow.id = conf.strings.shadowId;
      shadow.classList.add(conf.strings.shadowClass);
      shadow.addEventListener('click', closeMenu);
    }



  function openMenu() {
    menu.classList.add(conf.strings.menuOpenClass); // Add menu open class
    body.style.overflowY="hidden"; // Remove body vertical scroll
    shadow.classList.add(conf.strings.shadowOpenCLass); // Enable shadow
    return true;
  }



  function closeMenu() {
    menu.classList.remove(conf.strings.menuOpenClass); // Remove menu open class
    body.style.overflowY=null; // Restore body scroll to default
    shadow.classList.remove(conf.strings.shadowOpenCLass); // Disable shadow
    return true;
  }



  function touchStart(event) {
    var touch = event.targetTouches[0];
    touchX = touch.pageX;
    touchY = touch.pageY;
    slideXCurrent = touchX;
    slideXPrevious = touchX;
    slideYCurrent = touchY;
  }



  function slideMenu(event) {
    var touch = event.targetTouches[0];

    slideXPrevious = slideXCurrent;
    slideXCurrent = touch.pageX;
    slideYCurrent = touch.pageY;

    var movX = calcMov(slideXCurrent, touchX);
    var movY = calcMov(slideYCurrent, touchY);

    var angle = calcAngle(movY , movX);

    if (angle < 0) {
      angle *= -1; // Convert angle to positive
    }



    if (slideXCurrent > slideXPrevious && touchX < conf.slideZone) {
      openMenu(); // If slide right from sliding zone, open menu
    }

    if (slideXCurrent < slideXPrevious && (touchX - slideXCurrent) > conf.minMov && angle < conf.maxAngle) {
      closeMenu(); // If slide left everywhere, close menu
    }
  }

}
