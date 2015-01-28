'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var gutil = require('gulp-util');
var ugly = require('gulp-uglify');

gulp.task('browserify', function() {
  return gulp.src('./src/main.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./js'));

});

gulp.task('ugly', ['browserify'], function() {
  return gulp.src('./js/main.js')
    .pipe(ugly())
    .pipe(gulp.dest('./js/min'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['browserify']);
});

gulp.task('default', ['browserify']);