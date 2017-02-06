# Swibe
### v3.2.0
A simple slide menu in CSS and JavaScript for modern interfaces and cool projects

## Table of contents
* [Swibe](#Swibe)
  * [About](#About)
  * [Features](#Features)
* [Getting Started](#getting-started)
* [Configuration](#configuration)
  * [*Responsive Sensitive* mode](#responsive-sensitive-mode)
  * [UI Settings](ui-settings)
  * [*Grunt* commands](#grunt-commands)
* [Support](#Support)
* [Contributing](#Contributing)
* [Changelog](#Changelog)
* [Credits](#Credits)
* [License](#License)

### About
* Project site: [projects.barcia.cc/bramework](https://projects.barcia.cc/swibe)
* Download: [(lastest version)](https://github.com/barcia/swibe/releases/latest)
* Demo: [demo.html](https://cdn.rawgit.com/barcia/swibe/master/demo.html)
* Code: [github.com/barcia/swibe](https://github.com/barcia/swibe)
* Docs: [README.md](https://github.com/barcia/swibe/blob/master/README.md)
* Issues: [github.com/barcia/swibe/issues](https://github.com/barcia/swibe/issues)
* Community: [Google+ community](https://plus.google.com/communities/104938291205143609131/stream/8879dc2d-fed4-43a4-ba36-eca77af7d9db?hl=es-419)


### Features
* **Simple** and hackable
* **Lighweight**: 2.7KiB of JS and 1014B of CSS
* **Vanilla JavaScript**, whithout heavy dependencies
* **Accessible** for people who use screen readers or just keyboards
* All fluid transitions and animations **use only CSS3**
* Includes **touch events** to open and close the menu with natural gestures in touchscreen devices
* With the _Swibe Gesture Recognition Engine_
* With a ***responsive sensitive*** mode
* Easily **configurable**
* **Open Source** under MIT License


## Getting Started

**0. Download the [last release](https://github.com/barcia/swibe/releases/latest)**


**1. Add `swibe.min.js` and `swibe.min.css` to your webpage.**

```html
<link rel="stylesheet" href="swibe.min.css">
<script type="text/javascript" src="swibe.min.js"></script>
```


**2. Add the _id_ `swibe-trigger` to the element who will open the menu.**

```html
<button id="swibe-trigger">Menu</button>
```


**3. Add the _id_ `swibe-menu` and _class_ `swibe-menu` to the element who will contain the menu (recommends `nav`).**

```html
<nav class="swibe-menu" id="swibe-menu">
  <ul>
    <li><a>Item</a></li>
    <li><a>Item</a></li>
    <li><a>Item</a></li>
    <li><a>Item</a></li>
  </ul>
</nav>
```


> You can see this example working in [demo.html](https://github.com/barcia/swibe/blob/master/demo.html)


## Configuration


### *Responsive Sensitive* mode
The *Responsive Sensitive* mode is for when we want the menu to be **hidden on small screens, but visible on large screens**. We can do this only adding two classes:

* Add the _class_  `swibe-trigger--responsive` to the element who will open the menu:
  ```html
  <button id="swibe-trigger  swibe-trigger--responsive">Menu</button>
  ```

* Add the _class_ `swibe-menu--responsive` to the element who will contain the menu.

  ```html
  <nav class="swibe-menu  swibe-menu--responsive" id="swibe-menu">
    <ul>
      <li><a>Item</a></li>
      <li><a>Item</a></li>
      <li><a>Item</a></li>
      <li><a>Item</a></li>
    </ul>
  </nav>
  ```
  
* You can change the **point when the menu change** between visible and invisible changing the **media queries** in the `.css` (or in the `.scss`) file.

> You can see this example working in [demo-responsive.html](https://github.com/barcia/swibe/blob/master/demo-responsive.html)


### UI Settings
All **UI settings** are in the `.css` file. (Better change it in `.scss` file, and compile it to .css)

Interesting variables in `swibe.scss`:

* `$swibe-width`: The **width of menu**. (Default: `300px`)
* `$swibe-transition-duration`: The animation duration in ms. (Default: `300ms`)
* `$swibe-transition-function`: The speed curve of an animation. (Default: `ease-in-out`)
* `$swibe-shadow-opacity`: The shadow opacity (from `0` to `1`). (Default: `.5`)


> If you want add your own styles, you can use the `.swibe-menu` class or add your own classes.


### *Grunt* commands
* **`grunt`** - Active grunt watch and when any `.swibe.scss` or `swibe.js` file change, execute the following tasks: `grunt css`, `grunt js`
* **`grunt sync`** - Create a local server for sync and test files in many devices in real time.
* **`grunt css`** - Process the `swibe.scss` and the PostCSS tasks creating `.tmp/swibe.css` and `swibe.min.css`
* **`grunt js`** - Minify `swibe.js` creating `swibe.min.js`
* **`grunt all`** - Execute `grunt css` and `grunt js` tasks

## Support
Visit the [Google+ Community](https://plus.google.com/communities/104938291205143609131/stream/8879dc2d-fed4-43a4-ba36-eca77af7d9db?hl=es-419)

## Contributing
You can notify bugs and propose new features in the project [issues](https://github.com/barcia/swibe/issues) section.


## Changelog
See [CHANGELOG.md](https://github.com/barcia/swibe/blob/master/CHANGELOG.md)

## Credits
Developed with ❤ by Iván Barcia in Galiza, SPAIN.   
[Web](https://barcia.cc) · [Email](mailto:ivan@barcia.cc) · [Twitter](http://www.twitter.com/bartzia) · [GitHub](http://www.github.com/barcia) · [Google+](https://plus.google.com/+IvanBarcia)

## License
Under **MIT License**. See [LICENSE.md](https://github.com/barcia/THEPROJECT/blob/master/LICENSE.md) for more info.
