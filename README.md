# Swibe
v1.0.0-beta.4

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

3. Start a Swibe menu instace with `new Swibe();` (See [config](https://github.com/barcia/swibe#configuration))


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

This is the default Swibe config. You can customize each of then.
```js
new Swibe({
  menu: "swibe-menu",
  trigger: "swibe-menu-trigger",
  state: "closed",
  width: 300, // px
  time: 300, // ms
  breakpoint: undefined, // px
  shadowOpacity: 0.5, // Between 0 and 1
  zIndex: 999
});
```

If you put a `breakpoint`, the menu only work below the screen width that you set.


### User Interface
By default, Swibe menu only add the **most basic styles for work**, but **not** for a good **UI**. Anyway, the demo has a **[basic stylesheet](https://github.com/barcia/swibe/blob/master/docs/demo/swibe.css)** for a good UI, you can see it and use it.



## Credits
Developed by Iván Barcia
[Web](https://barcia.gal) · [Twitter](http://www.twitter.com/bartzia) · [GitHub](http://www.github.com/barcia)



## License
This project is under [MIT License](https://github.com/barcia/swibe/blob/master/LICENSE)
