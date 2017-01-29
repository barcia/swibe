# Swibe
### v3.1.0
A simple slide menu in CSS and JavaScript for modern interfaces and cool projects

## Table of contents
* [Swibe](#Swibe)
  * [About](#About)
  * [Features](#Features)
* [Getting Started](#getting-started)
* [Configuration](#configuration)
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
* Community: [Google + community](https://plus.google.com/communities/104938291205143609131/stream/8879dc2d-fed4-43a4-ba36-eca77af7d9db?hl=es-419)


### Features
* **Simple** and hackable
* **Lighweight**: 5.5Kb of JS and 814b of CSS
* **Vanilla JavaScript**, whithout heavy dependencies
* **Accessible** for people who use screen readers or just keyboards
* All fluid transitions and animations **use only CSS3**
* Includes **touch events** to open and close the menu with natural gestures in touchscreen devices
* With the _Swibe Gesture Recognition Engine_
* Easily **configurable**
* **Open Source** under MIT License


## Getting Started


**1. Add `swibe.js` and `swibe.min.css` to your webpage.**

```html
<link rel="stylesheet" href="swibe.min.css">
<script type="text/javascript" src="swibe.js"></script>
```


**2. Add _id_ `swibe-trigger` to the element who will open the menu.**

```html
<button id="swibe-trigger">Menu</button>
```


**3. Add _id_ `swibe-menu` and _class_ `swibe-menu` to the element who will contain the menu (recommends `nav`).**

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

All **UI settings** are in the `.css` file. (Better change it in `.scss` file, and compile it to .css)

Interesting variables in `swibe.scss`:

* `$swibe-width`: The **width of menu**. (Default: `300px`)
* `$swibe-transition-duration`: The animation duration in ms. (Default: `300ms`)
* `$swibe-transition-function`: The speed curve of an animation. (Default: `ease-in-out`)
* `$swibe-shadow-opacity`: The shadow opacity (from `0` to `1`). (Default: `.5`)


> If you want add your own styles, you can use the `.swibe-menu` class or add your own classes.


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
