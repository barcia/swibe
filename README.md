# Swibe
A simple slide menu in JS

## Getting started
1. Install the [npm package](https://www.npmjs.com/package/swibe):

    ```js
    npm install swibe
    ```

2. Add the basic markup
    ```html
    <button id="swibe-menu-trigger">Menu</button>

    <nav id="swibe-menu">
      <ul>
        <li><a>Item</a></li>
        <li><a>Item</a></li>
        <li><a>Item</a></li>
        <li><a>Item</a></li>
      </ul>
    </nav>
    ```

3. Import Swibe in your code, create a new instance and initialize it.
    ```js
    import Swibe from 'swibe';

    const menu = new Swibe({});

    menu.init();
    ```


You can instead load it into the HTML.
```js
<!-- Downloaded file -->
<script src="swibe.min.js"></script>

<!-- With UNPKG -->
<script src="https://unpkg.com/swibe"></script>
```

You can see a basic working demo in `/docs/index.html`

## API

* `init()`: Initialize your Swibe instance
* `open()`: Open the menu
* `close()`: Close the menu
* `toggle()`: Toggle the menu


## Options

  ```js
  import Swibe from 'swibe';

  const menu = new Swibe({
    transition: '200ms',
    breakpoint: '960px',
    enableCallback: moveMainNav,
    disableCallback: restoreMainNav
  });

  menu.init();
  ```

* `menuID: 'swibe-menu'` | The menu ID
* `triggerID: 'swibe-menu-trigger'` | The trigger ID
* `width: '300px'` | The menu width
* `transition: '300ms'` | Transition time to open and close the menu
* `shadowOpacity: 0.5` | Shadow background opacity
* `zIndex: 999` | Menu z-index property.
* `breakpoint: undefined` | The breakpoint where menu enable or disable. (Else, is enabled everytime)
* `disableCallback: undefined` | Function that run every time that menu is disabled. (Only works if you use a breakpoint)
* `enableCallback: undefined` | Function that run every time that menu is enabled. (If don't use a breakpoint, only works one time at init)
* `openCallback: undefined` | Function that run every time that menu is opened
* `closeCallback: undefined` | Function that run every time that menu is closed

## Changelog
See [Releases](https://github.com/barcia/swibe/releases).

## Credits
Developed by Iván Barcia

Project tested on [BrowserStack](https://www.browserstack.com/)


## License
This project is under [MIT License](https://github.com/barcia/swibe/blob/master/LICENSE)
