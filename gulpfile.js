// Dependencies
var gulp         = require('gulp');
var rename       = require('gulp-rename');
var notify       = require("gulp-notify");
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
let uglify       = require('gulp-uglify-es').default;
var postcss      = require('gulp-postcss');
var cssnano      = require('cssnano');
var browserSync  = require('browser-sync').create();

// Paths
var sourcePath = './src/';
var distPath   = './dist/';

// Tasks
var cssTask         = 'css';
var jsTask          = 'js';
var allTask         = 'all';
var browserSyncTask = 'sync';



var onError = function (err) {
  notify({
    title: 'Gulp: Sass error'
  }).write(err);
  console.log(err.toString());
  this.emit('end');
};


// Compile Scss files to CSS, and apply PostCSS plugins
gulp.task(cssTask, function () {
  var postcssPlugins = [
    cssnano({
      autoprefixer: false
    })
  ];
  var sassOptions = {
    outputStyle: 'expanded'
  };

  return gulp.src(sourcePath+'/swibe.scss')
  .pipe(plumber({ errorHandle: onError }))
  .pipe(sourcemaps.init())
  .pipe(sass(sassOptions).on('error', onError))
  .pipe(gulp.dest(distPath))
  .pipe(postcss(postcssPlugins))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(distPath));
});



// Concatenate and minify JS files
gulp.task(jsTask, function() {
  return gulp.src(sourcePath+'swibe.js')
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest(distPath));
});



// Watch
gulp.task('default', function () {
  gulp.watch(sourcePath+'swibe.scss', [cssTask]);
  gulp.watch(sourcePath+'swibe.js', [jsTask]);
});



// Browser Sync
gulp.task(browserSyncTask, function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(distPath+'style.min.css').on('change', browserSync.reload);
    gulp.watch(distPath+'script.min.js').on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
});



gulp.task(allTask, [cssTask, jsTask]);
