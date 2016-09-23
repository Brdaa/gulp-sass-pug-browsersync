'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

const reload = browserSync.reload;

// Compile sass files to css
gulp.task('sass', function () {
  return gulp.src('./assests/css/*.sass')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browser: ['last 15 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('./site/css'))
      .pipe(browserSync.reload({stream:true}))
});

// Compile pug files to html
gulp.task('pug', () =>{
  return gulp.src('_pugfiles/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('./_include'))
    .pipe(gulp.dest('./site'))
});

gulp.task('js', function () {
  gulp.src("./assests/js/function.js")
  .pipe(rename("js/function.js"))
  .pipe(gulp.dest("./site"));
});

// the working directory
gulp.task('browser-sync', ['sass', 'pug', 'js'] ,function() {
    browserSync.init({
        server: {
            baseDir: "./site"
        }
    });
});



// Watch files comiling
gulp.task('watch', function () {
  gulp.watch('./assests/css/*.sass', ['sass']);
  gulp.watch('./_pugfiles/*.pug', ['pug']);
  gulp.watch('./site/*.html').on('change', reload);
  gulp.watch('./assests/js/*.js', ['js']);
  gulp.watch('./site/js/*.js').on('change', reload)
});


gulp.task('default', ['watch', 'browser-sync']);
