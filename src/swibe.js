/**!
 * Swibe v.3.3.0
 * MIT License
 * https://github.com/barcia/swibe
 * Made in Galiza by Iván Barcia | @bartzia | barcia.cc
 */

const swibe = {

  status: false, //Initial status of the menu. false = closed, true = opened

  config: {
    breakpoint: 600,
    triggerId: 'swibe-trigger',
    menuId: 'swibe-menu',
    shadowId: 'swibe-shadow',
    menuOpenClass: 'swibe-menu--open',
    shadowOpenCLass: 'swibe-shadow--enabled'
  },

  load() {
    document.addEventListener('DOMContentLoaded', function() {
      swibe.loadQueue();
      return true;
    });
    window.addEventListener('resize', swibe.resize);
  },

    loadQueue() {
      swibe.windowWidth = screen.width;
      if (! swibe.config.breakpoint || (swibe.windowWidth < swibe.config.breakpoint)) {
        swibe.menu.getItems();
        if (swibe.menu.check()) {
          swibe.shadow.create();
          swibe.triggerElement.addEventListener('click', swibe.open);
          swibe.bodyElement.addEventListener('touchstart', swibe.touch.tap);
          swibe.bodyElement.addEventListener('touchmove', swibe.touch.slide);
          return true;
        };
        // This open the menu at the beginning, if you choose them.
        if (swibe.status) {
          swibe.openQueue();
        }
      } else {
        return false;
      }
    },


  open() {
    if (! swibe.status && (! swibe.config.breakpoint || (swibe.windowWidth < swibe.config.breakpoint))) {
      swibe.openQueue();
    } else {
      return false;
    }
  },

    openQueue() {
      swibe.menu.open();
      swibe.shadow.enable();
      swibe.bodyElement.style.overflowY='hidden';
      swibe.status = true;
    },


  close() {
    if (swibe.status) {
      swibe.closeQueue();
    }
  },

    closeQueue() {
      swibe.menu.close();
      swibe.shadow.disable();
      swibe.bodyElement.style.overflowY=null;
      swibe.status = false;
    },

  resize() {
    if (swibe.windowWidth > screen.width) {
        swibe.close();
    };
    swibe.loadQueue();
  },


  menu: {
    // Get all needed HTML elements
    getItems() {
      swibe.bodyElement = document.body; // Get the body element
      swibe.menuElement = document.getElementById(swibe.config.menuId);
      swibe.triggerElement = document.getElementById(swibe.config.triggerId);
    },

    // Check if all needed elements are loaded correctly
    check() {
      if (swibe.bodyElement && swibe.triggerElement && swibe.menuElement) {
        return true;
      } else {
        console.warn("[SWIBE] Some needed elements of the DOM aren't loaded correctly. Review the HTML Id's and the docs: https://github.com/barcia/swibe/blob/master/README.md");
        return false;
      }
    },

    open() {
        swibe.menuElement.classList.add(swibe.config.menuOpenClass);
    },

    close() {
        swibe.menuElement.classList.remove(swibe.config.menuOpenClass);
    },
  },


  shadow: {
    create() {
      if (! swibe.shadowElement) {
        swibe.shadowElement = document.createElement('div');
        swibe.shadowElement.id = swibe.config.shadowId;
        swibe.shadowElement.addEventListener('click', swibe.close);
        swibe.bodyElement.appendChild(swibe.shadowElement);
      };
    },

    enable() {
      swibe.shadowElement.classList.add(swibe.config.shadowOpenCLass);
    },

    disable() {
      swibe.shadowElement.classList.remove(swibe.config.shadowOpenCLass);
    }
  },


  touch: {
    tap(event) {
      this.tapX = event.targetTouches[0].clientX;
      this.tapY = event.targetTouches[0].clientY;
      this.slideX = this.tapX;
      this.slideY = this.tapY;
    },

    slide() {
      this.slideX = event.targetTouches[0].clientX; // The last X coord where we touch when slide
      this.slideY = event.targetTouches[0].clientY; // The last Y coord where we touch when slide

      if ((swibe.touch.gre(this.tapX, this.tapY, this.slideX, this.slideY)) === 'open') {
          swibe.open();
        } else if ((swibe.touch.gre(this.tapX, this.tapY, this.slideX, this.slideY)) === 'close') {
          swibe.close();
        };

    },

    calcDist(initialPoint, finalPoint) {
      return finalPoint - initialPoint;
    },

    calcAngle(x, y) {
      return ((Math.atan(y / x) * 180) / Math.PI) + 90;
    },

    // Gesture Recognition Engine
    gre(tapX, tapY, slideX, slideY) {

      this.distX = swibe.touch.calcDist(tapX, slideX);
      this.distY = swibe.touch.calcDist(tapY, slideY);
      this.angle = swibe.touch.calcAngle(this.distX, this.distY);

      console.log('Angle: '+this.distX * -1);

      this.openCond1 = tapX < 20;
      this.openCond2 = slideX > tapX;

      if (this.openCond1 && this.openCond2) {
        return 'open';
      };

      this.closeCond1 = slideX < tapX;
      this.closeCond2 = this.distY < 280;
      this.closeCond3 = this.angle > (90 - 35);
      this.closeCond4 = this.angle < (90 + 35);
      this.closeCond5 = this.distX < -30;

      if (this.closeCond1 && this.closeCond2 && this.closeCond3 && this.closeCond4 && this.closeCond5) {
        return 'close';
      };

    }
  }

};



swibe.load();
