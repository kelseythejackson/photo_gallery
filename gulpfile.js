(function () {
   'use strict';
   // this function is strict...
}());

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    maps = require("gulp-sourcemaps"),
  concat = require("gulp-concat"),
     del = require("del");

gulp.task('concatScripts', function(){
  return gulp.src(['js/filter.js', 'js/lightbox.js'])
  .pipe(concat('app.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function(){
  return gulp.src('scss/app.scss')
  .pipe(maps.init())
  .pipe(sass())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function(){
  gulp.watch('scss/**/*.scss', ['compileSass']);
  gulp.watch('js/*.js', ['concatScripts']);
});

gulp.task('clean', function(){
  del(['dist', 'css/*', 'js/app.js']);
});

gulp.task('serve', ['watchFiles']);

gulp.task('build', ['compileSass'], function(){
  return gulp.src(['css/app.css', 'js/app.js', 'index.html', 'img/**'], { base: './'})
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function(){
  gulp.start('build');
});
