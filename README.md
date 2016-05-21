# Swibe
A simple slide menu in CSS and JavaScript for modern intefaces and cool projects

* [Links](#links)
* [Features](#features)
* [Getting Started](#getting-started)
* [Configuration](#configuration)
* [Changelog](#changelog)
* [License](#license)
* [Credits](#credits)



## Links
* [Project site](https://projects.barcia.cc/bramework)
* [Demo](https://barcia.github.io/swibe/)
* [Code](https://github.com/barcia/swibe)
* [Download](https://github.com/barcia/swibe/archive/master.zip)
* [Issues](https://github.com/barcia/swibe/issues)
* [Docs](https://github.com/barcia/swibe/blob/master/README.md)
* [Support](https://gitter.im/barcia/swibe)



## Features
* **Simple** and hackable
* **Lighweight**: 2.4Kb of JS and 800b of CSS
* **Vanilla JavaScript**, whithout heavy dependencies
* All fluid transitions and animations **use only CSS3**
* Includes **touch events** to open and close the menu with natural gestures in touchscreen devices
* Easily **configurable**
* **Open Source** under MIT License


## Getting Started

**1. Add `swibe.js` and `swibe.css` to your webpage.**

```html
<link rel="stylesheet" href="swibe.css">
<script type="text/javascript" src="swibe.js"></script>
```


**2. Add _id_ `swibe-menu-button` to the element who will open the menu.**

```html
<span id="swibe-menu-button">Menu</span>
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


> You can see it in [index.html](https://github.com/barcia/swibe/blob/master/index.html)



## Configuration

### CSS

  * `$swibe-width`: The width of menu. (Default: `300px`)
  * `$swibe-transition-duration`: The animation duration in ms. (Default: `300ms`)
  * `$swibe-transition-function`: The speed curve of an animation. (Default: `ease-in-out`)
  * `$swibe-shadow-opacity`: The shadow opacity (from `0` to `1`). (Default: `.5`)


> If you want add your own styles, you cas use the `.swibe-menu` class.


### JavaScript

  * `slideZone`: In px. Width of the area to the left of the screen that detects the slide movement to open the menu. (Pay attention to body margins) (Default: `20`)
  * `minMov`: In px. Min. pixels of movement that are required to close the menu (Default: `15`)
  * `maxAngle`: In deg. Max. angle of slide movement who is accepted to close the menu. (Default: `10`)



## Changelog
See [commits](https://github.com/barcia/swibe/commits/master)



## License
See [LICENSE.md](https://github.com/barcia/swibe/blob/master/LICENSE.md)



## Credits
Developed with :heart: by [Iván Barcia](https://barcia.cc) in Galiza, SPAIN.

* https://barcia.cc
* https://twitter.com/@bartzia
* https://github.com/barcia
