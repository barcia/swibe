/**
 * Swibe 1.0.0-beta.4
 * MIT License
 * https://github.com/barcia/swibe
 */

export default function Swibe(customConfig) {

	const defaultConfig = {
		menu: "swibe-menu",
		trigger: "swibe-menu-trigger",
		state: "closed",
		width: 300, // px
		time: 300, // ms
		breakpoint: undefined, // px
		shadowOpacity: 0.5, // Between 0 and 1
		zIndex: 999
	};

	const config = Object.assign(defaultConfig, customConfig);

	let state;



	document.addEventListener('DOMContentLoaded', function () {
		// If all elements exists, init.
		if (action.get()) {
			action.init();
			if (config.breakpoint) {
				responsive.match(responsive.mediaQueryList);
				responsive.mediaQueryList.addListener(responsive.match)
			} else {
				action.addListeners();
			}
		};
	});



	const responsive = {
		mediaQueryList: window.matchMedia('(max-width: ' + config.breakpoint + 'px)'),
		match(event) {
			if (event.matches) {
				action.addListeners();
			} else {
				action.close();
				action.removeListeners();
			}
		}
	}



	const menu = {
		get() {
			this.element = document.getElementById(config.menu);
			return (this.element) ? true : false;
		},
		base() {
			this.element.style.position = 'fixed';
			this.element.style.top = 0;
			this.element.style.left = -config.width + 'px';
			this.element.style.width = config.width + 'px';
			this.element.style.maxWidth = 'calc(100vw - 40px)';
			this.element.style.height = '100vh';
			this.element.style.transition = 'left ease-in-out';
			this.element.style.transitionDuration = config.time + 'ms';
			this.element.style.willChange = 'left';
			this.element.style.overflowY = 'auto';
			this.element.style.zIndex = config.zIndex;
		},
		open() {
			this.element.style.left = 0;
			this.element.setAttribute('data-state', 'open');
		},
		close() {
			this.element.style.left = -config.width + 'px';
			this.element.setAttribute('data-state', 'closed');
		}
	};



	const trigger = {
		get() {
			this.element = document.getElementById(config.trigger);
			return (this.element) ? true : false;
		},
		tap() {
			state ? action.close() : action.open();
		}
	};



	const shadow = {
		create() {
			this.element = document.createElement('div');
			this.element.id = config.menu+'-shadow';
			this.element.style.position = 'fixed';
			this.element.style.backgroundColor = 'hsl(0, 0%, 0%)';
			this.element.style.top = 0;
			this.element.style.left = 0;
			this.element.style.zIndex = config.zIndex - 1;
			this.element.addEventListener('click', action.close);
			document.body.appendChild(this.element);
			return true;
		},
		enable() {
			this.element.style.width = '100vw';
			this.element.style.height = '100vh';
			this.element.style.opacity = config.shadowOpacity;
			this.element.style.transition = 'opacity ease-in-out, height step-start, width step-start';
			this.element.style.transitionDuration = config.time + 'ms';
			this.element.setAttribute('data-state', 'enabled');
			return true;
		},
		disable() {
			this.element.style.width = 0;
			this.element.style.height = 0;
			this.element.style.opacity = 0;
			this.element.style.transition = 'opacity ease-in-out, height step-end, width step-end';
			this.element.style.transitionDuration = config.time + 'ms';
			this.element.setAttribute('data-state', 'disabled');
			return true;
		}
	};

	const touch = {
		tap(event) {
			let tap = event.touches[0];
			this.tapX = tap.clientX;
			this.tapY = tap.clientY;
			this.slideX = this.tapX;
			this.slideY = this.tapY;
			return true;
		},
		slide(event) {
			let slide = event.touches[0];
			this.slideX = slide.clientX;
			this.slideY = slide.clientY;

			if (!state) {
				if (touch.gre.open(this.tapX, this.tapY, this.slideX, this.slideY)) {
					action.open();
					return true;
				} else {
					return false;
				};
			} else {
				if (touch.gre.close(this.tapX, this.tapY, this.slideX, this.slideY)) {
					action.close();
					return true;
				} else {
					return false;
				};
			}
		},

		// Swibe Gesture Recognition Engine
		gre: {
			// Check if the conditions are right to open the menu
			open(tapX, tapY, slideX, slideY) {
				this.openCond1 = tapX < 20;
				this.openCond2 = slideX > tapX;

				if (this.openCond1 && this.openCond2) {
					return true;
				} else {
					return false;
				};
			},

			// Check if the conditions are right to close the menu
			close(tapX, tapY, slideX, slideY) {
				this.distX = this.calcDist(tapX, slideX);
				this.distY = this.calcDist(tapY, slideY);
				this.angle = this.calcAngle(this.distX, this.distY);

				this.closeCond1 = slideX < tapX;
				this.closeCond2 = this.distY < 280;
				this.closeCond3 = this.distX < -30;
				this.closeCond4 = this.angle > (90 - 35);
				this.closeCond5 = this.angle < (90 + 35);

				if (this.closeCond1 && this.closeCond2 && this.closeCond3 && this.closeCond4 && this.closeCond5) {
					return true;
				} else {
					return false;
				};
			},

			// Auxiliar function to calculate the distance of our slide
			calcDist(initialPoint, finalPoint) {
				return finalPoint - initialPoint;
			},

			// Auxiliar function to calculate the angle of our slide
			calcAngle(x, y) {
				return ((Math.atan(y / x) * 180) / Math.PI) + 90;
			}
		}
	};

	const action = {
		get() {
			if (menu.get() && trigger.get() && shadow.create()) {
				return true;
			} else {
				console.warn("Swibe items not loaded");
				return false;
			};
		},
		addListeners() {
			trigger.element.addEventListener('click', trigger.tap, false);
			document.addEventListener('touchstart', touch.tap, false);
			document.addEventListener('touchmove', touch.slide, false);
		},
		removeListeners() {
			trigger.element.removeEventListener('click', trigger.tap, false);
			document.removeEventListener('touchstart', touch.tap, false);
			document.removeEventListener('touchmove', touch.slide, false);
		},
		init() {
			// Add basic styles to menu
			menu.base();

			// Set initial status
			config.state == 'closed' ? action.close() : action.open();
		},
		open() {
			menu.open();
			shadow.enable();
			state = true;
		},
		close() {
			menu.close();
			shadow.disable();
			state = false;
		}
	};
};
