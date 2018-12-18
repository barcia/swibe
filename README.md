# Swibe
[![npm version](https://badge.fury.io/js/swibe.svg)](https://badge.fury.io/js/swibe)

A simple slide menu in JS

## About
- [Web](http://barcia.github.io/standarize)
- [Repository](https://github.com/barcia/standarize)
- [Issues](https://github.com/barcia/standarize/issues)
- [Changelog](https://github.com/barcia/swibe/blob/master/CHANGELOG.md)



## Getting Started

1. [Download the last release](https://github.com/barcia/swibe/releases/latest) or install it with [npm](https://www.npmjs.com/package/swibe):
  ```js
  npm install swibe
  ```

2. Import *swibe.min.js* in your code.
  ```js
  import Swibe from './swibe.min.js';
  ```

3. Start a Swibe menu instace with
```js
new Swibe();
```
 (See [config](https://github.com/barcia/swibe#configuration))


4. Add a **trigger** and a **menu** items
    ```html
    <button id="swibe-menu-trigger">Menu</button>
    ```

    ```html
    <nav id="swibe-menu">
      <ul>
        <li><a>Item</a></li>
        <li><a>Item</a></li>
        <li><a>Item</a></li>
        <li><a>Item</a></li>
      </ul>
    </nav>
    ```

    > You can see this example working in [demo.html](https://github.com/barcia/swibe/blob/master/docs/demo/index.html)




## Configuration

These are all settings with their default values
```js
new Swibe({
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
});
```

* `menu`: _String_. The menu _**id**_.
* `trigger`: _String_. The _**id**_ of the element that opens the menu.
* `breakpoint`: _Number_. If you enter a value (in **pixels**), the menu will not work when the screen is wider.
* `width`: _Number_. The **width** of menu **in pixels**. Still, the menu never will be wider than the screen.
* `time`: _Number_. The animation time. In **miliseconds**.
* `shadowOpacity`: _Number_. The **opacity** of the shadow when the menu is open. Number **between 0 and 1**.
* `aria`: _Boolean_. By default, Swibe adds basic accessibility stuff to menu and trigger. Please, disable it only if you add these things manually.
* `initialState`: _Boolean_. Indicates if the menu is open or closed at startup.
* `selfClose`: _Boolean_. Indicates if the menu close by clicking on itself. This is useful when the links are links to page sections, load some Ajax, etc. and the page is not reloaded.
* `zIndex`: _Number_. `z-index` property of the _menu_. The _shadow_ has one point less..



### User Interface
* By default, _Swibe_ menu only add the **most basic styles for work**, but **not** for a good **UI**. Anyway, the demo has a **[basic stylesheet](https://github.com/barcia/swibe/blob/master/docs/demo/demo.css)** for a good UI, you can see it and use it.

* The three main elements of the Swibe menu: the _trigger_, the _menu_ and the _shadow_ has the data-attribute `data-state` with the value `true` or `false` if the menu is open or closed. You can use it with CSS or JavaScript.



## Accessibility
* Swibe menu add some basic **accessibility** stuff to _menu_ and _trigger_ elements. You can disable it with `aria: false`if you want add it manually.

* If the _trigger_ has **not text content** (For example, a _hamburguer_ icon), you should add it the `aria-label=''` attribute.

* I strongly recommend use a `<button>` as a _trigger_.

> If you can suggest improvements in a11y, are welcome.



## Credits
Developed by Iván Barcia
[Web](https://barcia.gal) · [Twitter](http://www.twitter.com/bartzia) · [GitHub](http://www.github.com/barcia)



## License
This project is under [MIT License](https://github.com/barcia/swibe/blob/master/LICENSE)
