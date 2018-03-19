# Swibe
A simple slide menu in CSS and JavaScript for modern interfaces and cool projects

## ℹ️ About
- Repository: https://github.com/barcia/bramework
- Support: https://barcia.cc/contacto
- Changelog: [CHANGELOG.md](https://github.com/barcia/swibe/blob/master/CHANGELOG.md)



## 📍 Features
* **Simple** and hackable
* **Lighweight**: 3.1KiB of JS and 1.2KiB of CSS
* **Vanilla JavaScript**, whithout heavy dependencies
* All fluid transitions and animations **use only CSS3**
* Includes **touch events** to open and close the menu with natural gestures in touchscreen devices
* With a ***responsive sensitive*** mode
* Easily **configurable**
* **Open Source** under MIT License



## 🛫 Getting Started

1. [Download the last release](https://github.com/barcia/swibe/releases/latest)
2. Add `swibe.min.js` and `swibe.min.css` to yout webpage.
  ```html
  <link rel="stylesheet" href="swibe.min.css">
  <script type="text/javascript" src="swibe.min.js"></script>
  ```
3. Add the **id** `swibe-trigger` to the element who will open the menu.
  ```html
  <button id="swibe-trigger">Menu</button>
  ```
4. Add the *id* `swibe-menu` to the element who will contain the menu
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

> You can see this example working in [demo.html](https://github.com/barcia/swibe/blob/master/demo.html)
s



## 🔧 Configuration


### UI Settings
All **UI settings** are in the `.css` file. Better and a class to your Swibe Menu and modify the base CSS Variables or add your own styles.

Interesting CSS Variables:

* `--swibe-width`: The **width of menu**. (Default: `300px`)
* `--swibe-transition-duration`: The animation duration in ms. (Default: `300ms`)
* `--swibe-transition-function`: The speed curve of an animation. (Default: `ease-in-out`)
* `--swibe-shadow-opacity`: The shadow opacity (from `0` to `1`). (Default: `.5`)

> If you want add your own styles, you can use the `.swibe-menu` class or add your own classes.


### *Responsive Sensitive* mode
The *Responsive Sensitive* mode is for when we want the menu to work only below a screen width

You only have to modify `swibe.js` adding the `breakpoint` option in `config` object:

For example, add `breakpoint: 600` to do work the menu only under 600px screen width.



## 💻 Developing

### Prerequisites
You must have installed [Node](https://nodejs.org/en/download/), [NPM](https://www.npmjs.com/get-npm) and [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

### Setting up development environment
Normally, you only must have Gulp *watching* with the `gulp` command, and write your code in all files inside */src/*

### Building
This project use [Gulp](https://gulpjs.com) as task runner.

**Development tasks:**
- `gulp` - The default task. Build all, create a light web server, put in *watch* all source files and reload de browser with any change.

- `gulp build` - Execute all this tasks: *gulp css*, *gulp js*.

- `gulp css` - Process *swibe.scss* file and apply the PostCSS plugins creating *style.css* and *style.min.css* in */dist/*.

- `gulp js` - Process *swibe.js* file creating *script.min.js* in */dist/*.



## 🤓 Credits
Developed by Iván Barcia  
[Web](https://barcia.cc) · [Email](mailto:ivan@barcia.cc) · [Twitter](http://www.twitter.com/bartzia) · [GitHub](http://www.github.com/barcia)



## 📄 License
This project is under [MIT License](https://github.com/barcia/bramework/blob/master/LICENSE)
