/**
 * Swibe 1.0.1
 * MIT License
 * https://github.com/barcia/swibe
 */

export default function Swibe(customConfig) {

	let state;

	const defaultConfig = {
		menu: "swibe-menu",
		trigger: "swibe-menu-trigger",
		breakpoint: undefined, // px
		width: 300, // px
		time: 300, // ms
		shadowOpacity: 0.5, // Between 0 and 1
		aria: true,
		initialState: false,
		selfClose: false,
		zIndex: 999
	};

	const config = Object.assign(defaultConfig, customConfig);


	// If all elements exists, init after the DOM is loaded.
	document.addEventListener('DOMContentLoaded', function () {
		swibe.load() && swibe.init();
	});


	const swibe = {
		load() {
			if (menu.get() && trigger.get()) {
				return true;
			} else {
				console.warn("Swibe items not loaded");
				return false;
			};
		},
		init() {
			menu.init();
			trigger.init();
			shadow.init();

			// Add event listeners
			if (config.breakpoint) {
				responsive.checkMediaQuery(responsive.mediaQuery);
				responsive.mediaQuery.addListener(responsive.checkMediaQuery)
			} else {
				this.addListeners();
			}

			// Set initial status
			config.initialState == false ? swibe.close() : swibe.open();
			return true;
		},
		addListeners() {
			trigger.element.addEventListener('click', swibe.toggle, false);
			document.addEventListener('touchstart', interaction.tap, false);
			document.addEventListener('touchmove', interaction.slide, false);
			document.addEventListener("keydown", interaction.keypress, false);
			config.selfClose && menu.element.addEventListener('click', swibe.close, false);
			return true;
		},
		removeListeners() {
			trigger.element.removeEventListener('click', swibe.toggle, false);
			document.removeEventListener('touchstart', interaction.tap, false);
			document.removeEventListener('touchmove', interaction.slide, false);
			document.removeEventListener("keydown", interaction.keypress, false);
			config.selfClose && menu.element.removeEventListener('click', swibe.close, false);
			return true;
		},
		open() {
			menu.open();
			trigger.open();
			shadow.open();
			document.body.style.overflow = 'hidden';
			state = true;
			return true;
		},
		close() {
			menu.close();
			trigger.close();
			shadow.close();
			document.body.style.overflow = null;
			state = false;
			return true;
		},
		toggle() {
			this.state ? swibe.close() : swibe.open();
			return true;
		}
	};


	const menu = {
		get() {
			this.element = document.getElementById(config.menu);
			return (this.element) ? true : false;
		},
		init() {
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
			config.aria && this.element.setAttribute('aria-labelledby', config.trigger);
			return true;
		},
		open() {
			this.element.style.left = 0;
			this.element.setAttribute('data-state', true);
			config.aria && this.element.setAttribute('aria-hidden', false);
			return true;
		},
		close() {
			this.element.style.left = -config.width + 'px';
			this.element.setAttribute('data-state', false);
			config.aria && this.element.setAttribute('aria-hidden', true);
			return true;
		}
	};


	const trigger = {
		get() {
			this.element = document.getElementById(config.trigger);
			return (this.element) ? true : false;
		},
		init() {
			config.aria && this.element.setAttribute('aria-controls', config.menu);
			config.aria && this.element.setAttribute('aria-haspopup', true);
			return true;
		},
		open() {
			this.element.setAttribute('data-state', true);
			config.aria && this.element.setAttribute('aria-expanded', true);
			return true;
		},
		close() {
			this.element.setAttribute('data-state', false);
			config.aria && this.element.setAttribute('aria-expanded', false);
			return true;
		},
	};


	const shadow = {
		init() {
			this.element = document.createElement('div');
			this.element.id = config.menu+'-shadow';
			this.element.style.position = 'fixed';
			this.element.style.backgroundColor = 'hsl(0, 0%, 0%)';
			this.element.style.top = 0;
			this.element.style.left = 0;
			this.element.style.zIndex = config.zIndex - 1;
			this.element.addEventListener('click', swibe.close);
			config.aria && this.element.setAttribute('aria-hidden', true);
			document.body.appendChild(this.element);
			return true;
		},
		open() {
			this.element.style.width = '100vw';
			this.element.style.height = '100vh';
			this.element.style.opacity = config.shadowOpacity;
			this.element.style.transition = 'opacity ease-in-out, height step-start, width step-start';
			this.element.style.transitionDuration = config.time + 'ms';
			this.element.setAttribute('data-state', true);
			return true;
		},
		close() {
			this.element.style.width = 0;
			this.element.style.height = 0;
			this.element.style.opacity = 0;
			this.element.style.transition = 'opacity ease-in-out, height step-end, width step-end';
			this.element.style.transitionDuration = config.time + 'ms';
			this.element.setAttribute('data-state', false);
			return true;
		}
	};


	const interaction = {
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
				if (interaction.gre.open(this.tapX, this.tapY, this.slideX, this.slideY)) {
					swibe.open();
					return true;
				} else {
					return false;
				};
			} else {
				if (interaction.gre.close(this.tapX, this.tapY, this.slideX, this.slideY)) {
					swibe.close();
					return true;
				} else {
					return false;
				};
			}
		},

		keypress(event) {
			if (event.key === "Escape" && state) {
				swibe.close();
			};
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
				this.distX = slideX - tapX;
				this.distY = slideY - tapY;
				this.angle = ((Math.atan(this.distY / this.distX) * 180) / Math.PI) + 90;

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
			}
		}
	};


	const responsive = {
		mediaQuery: window.matchMedia('(max-width: ' + config.breakpoint + 'px)'),
		checkMediaQuery(event) {
			if (event.matches) {
				swibe.addListeners();
			} else {
				swibe.close();
				swibe.removeListeners();
			};
			return true;
		}
	};
};
