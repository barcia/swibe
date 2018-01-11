/**!
 * Swibe v.3.3.0
 * MIT License
 * https://github.com/barcia/swibe
 * Made in Galiza by Iván Barcia | @bartzia | barcia.cc
 */


/* Swibe Menu */
const swibe = {

	/**
	 * 1. Initial status of the menu. false = Closed, true = Opened
	 *
	 * 2. If we declare a breakpoint, the menu only works when the screen width is
	 *    below (in px) than the breakpoint. Normally, if you declare the
	 *    breakpoint you have to do the necessary changes in the CSS to adapt it
	 *    to that breakpoint and that everything works well.
	 *
	 * 3. Here you can change some strings for ID's and Classes. These are the
	 *    ID's and Classes that Swibe will search in the HTML. Obviously, if you
	 *    customize it, change it also in the HTML and in the Scss/CSS.
	 */
	config: {
		initialStatus: false, /* 1 */
		//breakpoint: 600, /* 2 */
		triggerId: 'swibe-trigger', /* 3 */
		menuId: 'swibe-menu', /* 3 */
		menuOpenClass: 'swibe-menu--open', /* 3 */
		shadowId: 'swibe-shadow', /* 3 */
		shadowOpenCLass: 'swibe-shadow--enabled' /* 3 */
	},



	/**
	 * This function manage the init() function when the DOM is loaded. First, it
	 * get the screen width and check if is bigger than the breakpoint, if exists.
	 */
	load() {
		document.addEventListener('DOMContentLoaded', function() {
			swibe.userScreen.reset();
			if (swibe.userScreen.check()) {
				swibe.init();
				return true;
			} else {
				return false;
			};
		});
		window.addEventListener('resize', swibe.resize);
		return true;
	},



	/**
	 * Get and create all needed elements and events. Swibe will do this after
	 * DOM is loaded, and ever that we resize the screen.
	 */
	init() {
		swibe.elements.get();
		if (swibe.elements.check()) {
			swibe.shadow.create()
			swibe.triggerElement.addEventListener('click', swibe.open);
			swibe.documentElement.addEventListener('touchstart', swibe.touch.tap, false);
			swibe.documentElement.addEventListener('touchmove', swibe.touch.slide, false);
			swibe.checkInitialStatus();
			return true;
		} else {
			return false
		};
	},



	/**
	 * Execute all needed actions to succesfully open the Swibe menu
	 */
	open() {
		if (! swibe.status && (swibe.userScreen.check())) {
			swibe.menu.open();
			swibe.shadow.enable();
			swibe.bodyElement.style.overflowY='hidden';
			swibe.status = true;
			return true;
		} else {
			return false;
		};
	},



	/**
	 * Execute all needed actions to succesfully close the Swibe menu
	 */
	close() {
		if (swibe.status) {
			swibe.menu.close();
			swibe.shadow.disable();
			swibe.bodyElement.style.overflowY=null;
			swibe.status = false;
			return true;
		} else {
			return false;
		};
	},



	/**
	 * Execute all needed actions when resize the screen (or rotate a device)
	 */
	resize() {
		if (swibe.windowWidth > screen.width) {
			swibe.close();
		};
		if (swibe.userScreen.check()) {
			swibe.init();
		};
		swibe.userScreen.reset();
		return true;
	},



	/**
	 * This open the menu at the beggining if you configure it
	 */
	checkInitialStatus() {
		if (swibe.config.initialStatus) {
			swibe.open();
		};
	},



	elements: {
		/**
		 * Get all needed HTML elements
		 */
		get() {
			swibe.documentElement = document.documentElement;
			swibe.bodyElement = document.body;
			swibe.menuElement = document.getElementById(swibe.config.menuId);
			swibe.triggerElement = document.getElementById(swibe.config.triggerId);
		},

		/**
		 * Check if all required elements are loaded correctly
		 */
		check() {
			if (swibe.triggerElement && swibe.menuElement) {
				return true;
			} else {
				// console.warn("[SWIBE] Some needed elements of the DOM aren't loaded correctly. Review the HTML Id's and the docs: https://github.com/barcia/swibe/blob/master/README.md");
				return false;
			};
		}
	},



	userScreen: {
		/**
		 * Check if we have declarated a breakpoint. If we have it declarated, check
		 * if the screen width is bigger or smaller than the breakpoint.
		 */
		check() {
			if (! swibe.config.breakpoint || (swibe.windowWidth < swibe.config.breakpoint)) {
				return true;
			} else {
				return false;
			};
		},

		reset() {
			swibe.windowWidth = screen.width;
		}
	},



	menu: {
		/**
		 * Open action only for menu element
		 */
		open() {
			swibe.menuElement.classList.add(swibe.config.menuOpenClass);
			return true;
		},

		/**
		 * Close action only for menu element
		 */
		close() {
			swibe.menuElement.classList.remove(swibe.config.menuOpenClass);
			return true;
		},
	},



	shadow: {
		/**
		 * Create the DOM element for the shadow if it doesn't exist
		 */
		create() {
			if (! swibe.shadowElement) {
				swibe.shadowElement = document.createElement('div');
				swibe.shadowElement.id = swibe.config.shadowId;
				swibe.shadowElement.addEventListener('click', swibe.close);
				swibe.bodyElement.appendChild(swibe.shadowElement);
			};
			return true;
		},

		/**
		 * Shadow enable action
		 */
		enable() {
			swibe.shadowElement.classList.add(swibe.config.shadowOpenCLass);
			return true;
		},

		/**
		 * Shadow disable action
		 */
		disable() {
			swibe.shadowElement.classList.remove(swibe.config.shadowOpenCLass);
			return true;
		}
	},



	touch: {
		/**
		 * Capure the tap events in the screen
		 */
		tap(event) {
			var tap = event.touches[0];
			this.tapX = tap.clientX;
			this.tapY = tap.clientY;
			this.slideX = this.tapX;
			this.slideY = this.tapY;
			return true;
		},

		/**
		 * Capure the slide events in the screen
		 * 1. The current X coord where we touch when slide
		 * 2. The current Y coord where we touch when slide
		 */
		slide(event) {
			var slide = event.touches[0];
			this.slideX = slide.clientX; /* 1 */
			this.slideY = slide.clientY; /* 2 */

			if (! swibe.status) {
				if (swibe.gre.open(this.tapX, this.tapY, this.slideX, this.slideY)) {
					swibe.open();
					return true;
				} else {
					return false;
				};
			} else {
				if (swibe.gre.close(this.tapX, this.tapY, this.slideX, this.slideY)) {
					swibe.close();
					return true;
				} else {
					return false;
				};
			};
		}
	},



	// Swibe Gesture Recognition Engine
	gre: {
		/**
		 * Check if the conditions are right to open the menu
		 */
		open(tapX, tapY, slideX, slideY) {
			this.openCond1 = tapX < 20;
			this.openCond2 = slideX > tapX;

			if (this.openCond1 && this.openCond2) {
				return true;
			};
		},

		/**
		 * Check if the conditions are right to close the menu
		 */
		close(tapX, tapY, slideX, slideY) {
			this.distX = this.calcDist(tapX, slideX);
			this.distY = this.calcDist(tapY, slideY);
			this.angle = this.calcAngle(this.distX, this.distY);

			this.closeCond1 = slideX < tapX;
			this.closeCond2 = this.distY < 280;
			this.closeCond3 = this.angle > (90 - 35);
			this.closeCond4 = this.angle < (90 + 35);
			this.closeCond5 = this.distX < -30;

			if (this.closeCond1 && this.closeCond2 && this.closeCond3 && this.closeCond4 && this.closeCond5) {
				return true;
			};
		},

		/**
		 * Auxiliar function to calculate the distance of our slide
		 */
		calcDist(initialPoint, finalPoint) {
			return finalPoint - initialPoint;
		},

		/**
		 * Auxiliar function to calculate the angle of our slide
		 */
		calcAngle(x, y) {
			return ((Math.atan(y / x) * 180) / Math.PI) + 90;
		}
	}
};



/* Load Swibe Menu */
swibe.load();
