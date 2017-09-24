swibe();

function swibe() {
  'use strict';

  // Variables
  var trigger;
  var menu;
  var menuType;
  var body;
  var windowWidth;
  var shadow;
  var touchX = null;
  var touchY = null;
  var slideX = null;
  var slideY = null;
  var movX   = null;
  var movY   = null;
  var angle  = null;

  // Strings
  var strings = {
      triggerId      : 'swibe-trigger',
      menuId         : 'swibe-menu',
      shadowClass    : 'swibe-shadow',
      menuOpenClass  : 'swibe-menu--open',
      shadowOpenCLass: 'swibe-shadow--enabled'
    };



  // Load menu after it is loaded the DOM
  window.addEventListener('DOMContentLoaded', loadMenu, false);
  // Execute the 'windowResize' function when the screen size change
  window.addEventListener('resize', windowResize, false);

  // FUNCTIONS
  /**
   * This function load all necesary DOM element
   */
  function loadMenu() {
    body = document.body; // Get the body element
    menu = document.getElementById(strings.menuId); // Get the menu element by the ID
    trigger = document.getElementById(strings.triggerId); // Get the trigger element by the ID
    windowWidth = screen.width; // This is for detect only horizontal resize after

    // If all elements exist, check the menu type
    if (body && menu && trigger) {

      if (checkMenuType() == 'default') {
        trigger.addEventListener('click', openMenu, false);
        body.addEventListener('touchstart', touchStart, false);
        body.addEventListener('touchmove', slideMenu, false);
        createShadow();
        return true;
      }
      else if (checkMenuType() == 'responsive') {
        trigger.removeEventListener('click', openMenu, false);
        body.removeEventListener('touchstart', touchStart, false);
        body.removeEventListener('touchmove', slideMenu, false);
        return true;
      }

    }
    // Debug message
    else if(menu || trigger) {
      console.warn("[SWIBE] Some needed elements of the DOM aren't loaded correctly. Review the HTML Id's and the docs: https://github.com/barcia/swibe/blob/master/README.md");
      return false;
    }
    // Debug message
    else if((! menu) && (! trigger)) {
      console.info("[SWIBE] You are loading the Swibe menu, but you don't have the trigger and menu elements (or you don't have the needed Id's). Review the docs: https://github.com/barcia/swibe/blob/master/README.md");
      return false;
    }

  }



    /**
     *  This function return us the type of menu
     *  @return {string} [returns 'default' or 'responsive']
     */
    function checkMenuType() {

      // Get the CSS properties for check the menu type
      var triggerDisplay = window.getComputedStyle(trigger, null).getPropertyValue('display');
      var menuLeft = window.getComputedStyle(menu, null).getPropertyValue('left');

      // The menu is the "responsive" variant
      if ((triggerDisplay == 'none') && ((! (parseInt(menuLeft.substring(0, menuLeft.length - 2)) < 0 )))) {
        return 'responsive';
      }
      // Debug message
      else if ((triggerDisplay == 'none') || ((! (parseInt(menuLeft.substring(0, menuLeft.length - 2)) < 0 )))) {
        console.warn("[SWIBE] You have one element (trigger or menu) with the 'responsive' variant but the other haven't it. Review the HTML classes and the docs: https://github.com/barcia/swibe/blob/master/README.md");
        return false;
      }
      else { // Is default menu
        return 'default';
      }

    }



    /**
     *  Detect only the horizontal resize, and close the menu only if it
     *  increases because is when the menu can change its type
     */
    function windowResize() {
      if (windowWidth < screen.width) {
          closeMenu();
      }
      loadMenu();
      return;
    }



    /**
     * Creates the DOM item who will be the shadow when menu opens. We append
     * a class to style it with CSS (that minify it at beginning).
     *
     * When we click(or touch) the shadow, the menu closes.
     */
    function createShadow() {
      if (shadow == undefined) {
        shadow = document.createElement('div');
        body.appendChild(shadow);
        shadow.classList.add(strings.shadowClass);
        shadow.addEventListener('click', closeMenu, false);
      }
    }



  // Open the menu
  function openMenu() {
    menu.classList.add(strings.menuOpenClass); // Add menu open class
    shadow.classList.add(strings.shadowOpenCLass); // Enable shadow
    body.style.overflowY='hidden'; // Remove body vertical scroll
  }



  // Close the menu
  function closeMenu() {
    menu.classList.remove(strings.menuOpenClass); // Remove menu open class
    body.style.overflowY=null; // Restore body scroll to default
    if (! (shadow == undefined)) {
      shadow.classList.remove(strings.shadowOpenCLass); // Disable shadow
    }
  }



  //Detects when we touch the screen and save the coords
  function touchStart(event) {
    touchX = event.targetTouches[0].clientX;
    touchY = event.targetTouches[0].clientY;
    slideX = touchX;
    slideY = touchY;
  }



  // Detects when we slide our finger over the screen
  function slideMenu(event) {

    slideX = event.targetTouches[0].clientX; // The last X coord where we touch when slide
    slideY = event.targetTouches[0].clientY; // The last Y coord where we touch when slide

    movX = calcMov(touchX, slideX); // Calculates how we move in X
    movY = calcMov(touchY, slideY); // Calculates how we move in Y

    angle = calcAngle(movY, movX); // Calc the angle with x-axis

    if (angle < 0) {
      angle *= -1; // Convert angle to positive
    }

    if (swibeGRE() === open) {
      openMenu();
    }

    if (swibeGRE() === close) {
      closeMenu();
    }
  }

    // Calculates how we move
    function calcMov(initialPoint, finalPoint) {
      var mov = (finalPoint - initialPoint);
      return mov;
    }

    // Calculates the angle at which we move
    function calcAngle(X, Y) {
      return Math.atan(X / Y) * 180 / Math.PI;
    }

    // Swibe Gesture Recognition Engine.
    // A number of variables and conditions who try to know what you want to do
    // when you slide your finger.
    function swibeGRE() {

      // Open conditions
      var openCond1 = (touchX < 20) ? true : false; // Touch in left side of screen
      var openCond2 = (slideX > touchX) ? true : false; // Slide right

      var openConditions = openCond1 && openCond2;


      // Close conditions
      var closeCond1 = (slideX < touchX) ? true : false; // Slide left
      var closeCond2 = (movY < 280) ? true : false; // Don't slide much in Y
      var closeCond3_ratio = 1.3; // If you slide with more angle, you have to slide more in X
      var closeCond3_1 = ((angle < 10) && (-movX) > (10 * closeCond3_ratio)) ? true : false;
      var closeCond3_2 = ((angle < 20) && (-movX) > (20 * closeCond3_ratio)) ? true : false;
      var closeCond3_3 = ((angle < 30) && (-movX) > (30 * closeCond3_ratio)) ? true : false;
      var closeCond3_4 = ((angle < 40) && (-movX) > (40 * closeCond3_ratio)) ? true : false;
      var closeCond3_5 = ((angle < 50) && (-movX) > (50 * closeCond3_ratio)) ? true : false;
      var closeCond3_6 = ((angle < 60) && (-movX) > (60 * closeCond3_ratio)) ? true : false;
      var closeCond3_7 = ((angle < 70) && (-movX) > (70 * closeCond3_ratio)) ? true : false;
      var closeCond3_8 = ((angle < 80) && (-movX) > (80 * closeCond3_ratio)) ? true : false;
      var closeCond3_9 = ((angle < 90) && (-movX) > (90 * closeCond3_ratio)) ? true : false;

      var closeConditions = closeCond1 && closeCond2 && (closeCond3_1 || closeCond3_2 || closeCond3_3 || closeCond3_4 || closeCond3_5 || closeCond3_6 || closeCond3_7 || closeCond3_8 || closeCond3_9);


      if (openConditions) {
        return open;
      }

      if (closeConditions) {
        return close;
      }
    }

}
