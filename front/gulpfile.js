var gulp = require('gulp');

var tsConfig = require('./tsconfig.json');

var bower = require('gulp-bower');
var tsd = require('gulp-tsd');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var webpack = require('gulp-webpack');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var copy = require('gulp-copy');
var autoprefixer = require('gulp-autoprefixer');
require('es6-promise').polyfill(); // for autoprefixer
var cssmin = require('gulp-cssmin');
var del = require('del');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");

gulp.task('bower', function() {
  return bower('./src/commons')
});

gulp.task('tsd', function (callback) {
  tsd({
      command: 'reinstall',
      latest: true,
      config: './tsd.json'
  }, callback);
});

// TypeScript Task
gulp.task('ts_main', ['tsd'], function () {
  return gulp.src(['./src/ts/**/*.ts'])
    .pipe(webpackStream({
      displayErrorDetails: true,
      devtool: 'source-map',
      resolve: {
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
      },
      entry: {main: './src/ts/main/app.ts'},
      output: {
        filename: 'js/[name]-app.js'
      },
      plugins: [
        new BowerWebpackPlugin({
          modulesDirectories: ["bower_components"],
          manifestFiles:      "bower.json",
          includes:           /.*/,
          excludes:           [],
          searchResolveModulesDirectories: true
        }),
        new webpack.optimize.UglifyJsPlugin()
      ],
      module: {
        loaders: [
          {
            test: /\.ts$/,
            loader: "awesome-typescript-loader"
          },
          {
            test: /\.css$/,
            loader: "style-loader!css-loader"
          }
        ]
      }
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('ts', ['ts_main']);

gulp.task('html', function(){
  var result = gulp.src(['./src/**/*.html'])
  .pipe(htmlmin({
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeCDATASectionsFromCDATA: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    removeOptionalTags: true
  }))
  .pipe(gulp.dest('./dist'));
  return result;
});

gulp.task('image', function(){
  var result = gulp.src(['./src/**/*.{png,jpg,gif}', '!./src/commons/**/demo/**'])
  .pipe(imagemin())
  .pipe(gulp.dest('./dist'));
  return result;
});

gulp.task('commons', ['bower'], function(){
  var result = gulp.src(['./src/commons/**/*.{js,css}', './src/fonts/**', '!**/demo/**'], { base: 'src' })
  .pipe(gulp.dest('./dist'));
  return result;
});

gulp.task('css', function(){
  var result = gulp.src(['./src/**/*.css', '!**/commons/**'])
  .pipe(autoprefixer({
    browsers: ['last 2 version', 'ie 8', 'ie 9']
  }))
  .pipe(cssmin())
  .pipe(gulp.dest('./dist'));
  return result;
});

gulp.task('clean', function(cb){
  del(['./dist'], cb);
});

gulp.task('connect', function(){
  connect.server({
    root: './dist',
    livereload: true
  });
});

// Watch
gulp.task('watch', function () {
    gulp.watch(['./src/ts/**/*.ts'], ['ts']);
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/**/*.{png,jpg,gif}', '!./src/commons/**/demo/**'], ['image']);
    gulp.watch(['./src/**/*.css', '!**/commons/**'], ['css']);
});

gulp.task('dist', ['bower', 'ts', 'html', 'image', 'commons', 'css']);
gulp.task('clean-for-release', function(cb){
  del(['./dist/maps'], cb);
});
gulp.task('release', function(cb) {
  runSequence('dist', 'clean-for-release', cb);
});

// Default Task
gulp.task('default', function(cb){
  runSequence('dist', ['connect', 'watch'], cb);
});
