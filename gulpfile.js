// Dependencies
const gulp         = require('gulp');
const rename       = require('gulp-rename');
const notify       = require("gulp-notify");
const plumber      = require('gulp-plumber');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const uglify       = require('gulp-uglify-es').default;
const postcss      = require('gulp-postcss');
const cssnano      = require('cssnano');
const browserSync  = require('browser-sync').create();


// Path
const path = {
  src: './src/',
  dist: './dist/',
  docs: './docs/'
};


// Sourcefiles
const sourcefiles = {
  css: path.src + 'swibe.scss',
  js: path.src + 'swibe.js'
};


// Tasks
const task = {
  css: 'css',
  js: 'js',
  all: 'build'
};





// FUNCTIONS

/**
 * Build all
 */
const build = function() {
  cssTask();
	jsTask();
	console.log("Builded All");
}



/**
 * Error function
 */
const reportError = function (error) {
	notify({
		title: 'Gulp error',
		subtitle: error.plugin,
		message: error.message,
		sound: 'Basso',
		timeout: 3
	}).write(error);
	console.error(error.toString());
	this.emit('end');
};



/**
 * Init browserSync
 */
const initBrowserSync = function() {
		browserSync.init({
			browser: 'google chrome',
			server: './'
		});
};



/**
 * Watch
 */
const watch = function() {
	gulp.watch(path.docs + '*.html', [browserSync.reload]);
	gulp.watch(sourcefiles.css, [task.css]);
	gulp.watch(sourcefiles.js, [task.js]);
};



/**
 * CSS
 */
const cssTask = function() {
	return gulp.src(sourcefiles.css)
	.pipe(plumber({errorHandler: reportError}))
	.pipe(sourcemaps.init())
	.pipe(sass())
  .pipe(gulp.dest(path.dist))
	.pipe(postcss([
		cssnano({
			autoprefixer: false,
			safe: true,
			sourcemap: false
		})
	]))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(path.dist))
	.pipe(browserSync.stream());
};



/**
 * JS
 */
const jsTask = function() {
	return gulp.src(sourcefiles.js)
	.pipe(plumber({errorHandler: reportError}))
	.pipe(sourcemaps.init())
	.pipe(uglify({}))
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(path.dist))
	.pipe(browserSync.stream());
};





/**
 * TASKS
 */

// Default - Build all, start BrowserSync and Watch
gulp.task('default', function () {
	initBrowserSync();
	watch();
});

gulp.task(task.all, function() { build() });
gulp.task(task.css, function() { cssTask() });
gulp.task(task.js, function() { jsTask() });
