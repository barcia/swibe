/**!
 * Swibe v.4.0.0
 * MIT License
 * https://github.com/barcia/swibe
 * By Iván Barcia | @bartzia | barcia.cc
 */

function Swibe(customConfig) {

	const defaultConfig = {
		menu: "swibe-menu",
		trigger: "swibe-menu-trigger",
		state: "closed",
		width: "300"
	};


	const config = Object.assign(defaultConfig, customConfig);



	const style = {
		menu: {
			default: {
				position: "fixed",
				top: 0,
				left: -config.width+"px",
				width: config.width+"px",
				maxWidth: "calc(100vw -40px)",
				height: "100vw",
				transition: "left 300ms ease-in-out",
				willChange: "left",
				overflowY: "auto",
				zIndex: "999"
			},
			opened: {
				transform: "translateX(" + config.width + ")"
			}
		},
		shadow: {
			default: {
				position: "fixed",
				top: 0,
				left: 0
			},
			disabled: {
				width: "0",
				height: "0",
				backgroundColor: "hsla(0, 0%, 0%, 0)",
				transition: "background-color 300ms ease-in-out, height 300ms step-end, width 300ms step-end"
			},
			enabled: {
				width: "100vw",
				height: "100vw",
				backgroundColor: "hsla(0, 0%, 0%, .5)",
				transition: "background-color 300ms ease-in-out, height 300ms step-start, width 300ms step-start"
			}
		}
	}



	let state;



	const element = {
		get() {
			this.menu = document.getElementById(config.menu);
			this.trigger = document.getElementById(config.trigger);

			if (!this.menu || !this.trigger) {
				console.warn("Items not loaded");
				return false;
			} else {
				return true;
			}
		}
	};



	const action = {
		open() {
			state = true;
			element.menu.setAttribute('data-state', 'open');
			shadow.enable();
			element.menu.style.left = "0";
		},

		close() {
			state = false;
			element.menu.setAttribute('data-state', 'closed');
			shadow.disable();
			element.menu.style.left = style.menu.default.left;

		}
	}



	const shadow = {
		create() {
			element.shadow = document.createElement('div');
			// element.shadow.id = 'swibe-shadow';
			document.body.appendChild(element.shadow);
			element.shadow.addEventListener('click', action.close);
			element.shadow.style.position = style.shadow.default.position;
			element.shadow.style.top = style.shadow.default.top;
			element.shadow.style.left = style.shadow.default.left;
		},
		enable() {
			// element.shadow.setAttribute('data-state', 'open');
			element.shadow.style.width = style.shadow.enabled.width;
			element.shadow.style.height = style.shadow.enabled.height;
			element.shadow.style.backgroundColor = style.shadow.enabled.backgroundColor;
			element.shadow.style.transition = style.shadow.enabled.transition;
		},
		disable() {
			// element.shadow.setAttribute('data-state', 'closed');
			element.shadow.style.width = style.shadow.disabled.width;
			element.shadow.style.height = style.shadow.disabled.height;
			element.shadow.style.backgroundColor = style.shadow.disabled.backgroundColor;
			element.shadow.style.transition = style.shadow.disabled.transition;
		}
	}



	document.addEventListener("DOMContentLoaded", function () {

		// If all elements exists…
		if (element.get()) {

			// Create the shadow
			shadow.create();

			// Initial status
			config.state == "closed" ? action.close() : action.open();
			element.menu.style.position = style.menu.default.position;
			element.menu.style.top = style.menu.default.top;
			element.menu.style.left = style.menu.default.left;
			element.menu.style.width = style.menu.default.width;
			element.menu.style.maxWidth = style.menu.default.maxWidth;
			element.menu.style.height = style.menu.default.height;
			element.menu.style.transition = style.menu.default.transition;
			element.menu.style.willChange = style.menu.default.willChange;
			element.menu.style.overflowY = style.menu.default.overflowY;
			element.menu.style.zIndex = style.menu.default.zIndex;

			// element.trigger.addEventListener("click", action.open);
			element.trigger.addEventListener("click", function() {
				if (state) {
					action.close();
				} else {
					action.open();
				}
			});


		}


	});


}


new Swibe();
