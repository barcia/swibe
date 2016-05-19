/**
 * Swibe
 * MIT License
 * https://github.com/barcia/swibe
 * Made in Galiza by Iván Barcia | @bartzia | barcia.cc
 */

swibe();

function swibe() {

  'use strict';

  var button;
  var menu;
  var body;
  var shadow;
  var slideXCurrent;
  var slideXPrevious;
  var touchX;

  // Config
  // 1. In px. Width of the area to the left of the screen that detects the
  //    slide movement to open the menu
  var conf = {
    slideZone: 20, // 1
    strings: {
      buttonId: "swibe-button",
      menuId: "swibe-menu",
      shadowId: "swibe-shadow",
      shadowClass: "swibe-shadow",
      menuOpenClass: "swibe-menu--open",
      shadowOpenCLass: "swibe-shadow--enabled"
    }
  };


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
  }



  function closeMenu() {
    menu.classList.remove(conf.strings.menuOpenClass); // Remove menu open class
    body.style.overflowY=null; // Restore body scroll to default
    shadow.classList.remove(conf.strings.shadowOpenCLass); // Disable shadow
  }



  function touchStart(event) {
    var touch = event.targetTouches[0];
    touchX = touch.pageX;
    slideXCurrent = touchX;
    slideXPrevious = touchX;
  }



  function slideMenu(event) {
    var touch = event.targetTouches[0];

    if (slideXCurrent > slideXPrevious && touchX < conf.slideZone) {
      openMenu(); // If slide right from sliding zone, open menu
    }

    if (slideXCurrent < slideXPrevious) {
      closeMenu(); // If slide left everywhere, close menu
    }

    slideXPrevious = slideXCurrent;
    slideXCurrent = touch.pageX;
  }
}
