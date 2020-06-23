/**
 * Swibe 2.0.0-beta.1
 * MIT License
 * https://github.com/barcia/swibe
 */

import gre from './gre'


export default class Swibe {

	constructor({
		menuID = 'swibe-menu',
		triggerID = 'swibe-menu-trigger',
		width = '300px',
		transition = '300ms',
		shadowOpacity = 0.5,
		zIndex = 999,
		breakpoint = undefined,
		disableCallback = undefined,
		enableCallback = undefined,
		openCallback = undefined,
		closeCallback = undefined
	}) {
		this.menuID = menuID;
		this.triggerID = triggerID;
		this.state = false;
		this.width = width;
		this.transition = transition;
		this.shadowOpacity = shadowOpacity;
		this.zIndex = zIndex;
		this.breakpoint = breakpoint;
		this.disableCallback = disableCallback;
		this.enableCallback = enableCallback;
		this.openCallback = openCallback;
		this.closeCallback = closeCallback;
	}



	init() {
		Menu.init(this);
		Trigger.init(this);

		if (Menu.element && Trigger.element) {

			// Init shadow
			Shadow.init(this);

			// Responsive handler or enable
			if (this.breakpoint) {
				const mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint})`);
				const checkMediaQuery = () => mediaQuery.matches ? this._enable(this) : this._disable(this);
				checkMediaQuery()
				mediaQuery.addListener(checkMediaQuery)
			} else {
				this._enable(this)
			}

			// Keyboard handler
			document.addEventListener('keydown', event => {
				if (this.state && event.key === 'Escape') {
					this.close();
				};
			})

		}
	}



	_enable() {
		if (typeof this.enableCallback === 'function') { this.enableCallback() }
		Trigger.element.addEventListener('click', () => this.toggle() )
		Shadow.element.addEventListener('click', () => this.close() )
		document.addEventListener('touchstart', event => Interaction.touchstart(event))
		document.addEventListener('touchmove', event => this._tactileHandlerAction(event))
	}



	_disable() {
		this.close()
		if (typeof this.disableCallback === 'function') { this.disableCallback() }
		// Trigger.element.removeEventListener('click', () => this.toggle())
		// Shadow.element.removeEventListener('click', () => this.close())
		document.removeEventListener('touchstart', event => Interaction.touchstart(event))
		document.removeEventListener('touchmove', event => this._tactileHandlerAction(event))
	}



	_tactileHandlerAction(event) {
		if (!this.state) {
			Interaction.open(event) && this.open();
		} else {
			Interaction.close(event) && this.close();
		}
	}





	open() {
		Menu.open();
		Trigger.open();
		Shadow.open();
		Body.open();
		this.state = true
		if (typeof this.openCallback === 'function') { this.openCallback() }
	}



	close() {
		Menu.close();
		Trigger.close();
		Shadow.close();
		Body.close();
		this.state = false
		if (typeof this.closeCallback === 'function') { this.closeCallback() }
	}



	toggle() {
		this.state ? this.close() : this.open();
	}
}






const Trigger = {
	init({ menuID, triggerID }) {
		this.element = document.querySelector(`#${triggerID}`)
		if (this.element) {
			this.element.setAttribute('aria-controls', menuID);
			this.element.setAttribute('aria-haspopup', true);
			this.element.setAttribute('aria-expanded', false);
		}
	},

	open() {
		this.element.setAttribute('aria-expanded', true);
	},

	close() {
		this.element.setAttribute('aria-expanded', false);
	}
}





const Menu = {
	init({ menuID, width, transition, zIndex, triggerID }) {
		this.width = width;
		this.element = document.querySelector(`#${menuID}`);
		if (this.element) {
			this.element.style.position = 'fixed';
			this.element.style.top = 0;
			this.element.style.left = `-${this.width}`;
			this.element.style.width = this.width;
			this.element.style.maxWidth = 'calc(100vw - 40px)';
			this.element.style.height = '100vh';
			this.element.style.transition = 'left ease-in-out';
			this.element.style.transitionDuration = transition;
			this.element.style.willChange = 'left';
			this.element.style.overflowY = 'auto';
			this.element.style.zIndex = zIndex;
			this.element.setAttribute('aria-hidden', true);
			this.element.setAttribute('aria-labelledby', triggerID);
		}
	},

	open() {
		this.element.style.left = 0;
		this.element.setAttribute('aria-hidden', false);
	},

	close() {
		this.element.style.left = `-${this.width}`;
		this.element.setAttribute('aria-hidden', true);
	},
}





const Shadow = {
	init({ menuID, zIndex, shadowOpacity, transition }) {
		this.menuID = menuID;
		this.zIndex = zIndex;
		this.shadowOpacity = shadowOpacity;
		this.transition = transition;
		this.element = document.createElement('div');
		this.element.id = `${this.menuID}-shadow`;
		this.element.style.position = 'fixed';
		this.element.style.backgroundColor = 'hsl(0, 0%, 0%)';
		this.element.style.top = 0;
		this.element.style.left = 0;
		this.element.style.zIndex = this.zIndex - 1;
		this.element.setAttribute('aria-hidden', true);
		document.body.appendChild(this.element);
	},

	open() {
		this.element.style.width = '100vw';
		this.element.style.height = '100vh';
		this.element.style.opacity = this.shadowOpacity;
		this.element.style.transition = 'opacity ease-in-out, height step-start, width step-start';
		this.element.style.transitionDuration = this.transition;
	},

	close() {
		this.element.style.width = 0;
		this.element.style.height = 0;
		this.element.style.opacity = 0;
		this.element.style.transition = 'opacity ease-in-out, height step-end, width step-end';
		this.element.style.transitionDuration = this.transition;
	}
}





const Interaction = {
	touchstart(event) {
		this.tap = event.touches[0];
		this.startX = this.tap.clientX;
		this.startY = this.tap.clientY;
		this.endX = this.startX;
		this.endY = this.startY;
	},

	touchmove(event) {
		this.slide = event.touches[0];
		this.endX = this.slide.clientX;
		this.endY = this.slide.clientY;
	},

	open(event) {
		this.touchmove(event)
		return gre.open(this) ? true : false
	},

	close(event) {
		this.touchmove(event)
		return gre.close(this) ? true : false
	}
}





const Body = {
	open() {
		document.body.style.overflow = 'hidden';
	},

	close() {
		document.body.style.overflow = ''; //IE11 Fallback
		document.body.style.overflow = null;
	}
}
