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
var path = require("path");
var del = require('del');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");
var sass = require('gulp-sass');
var templateCache = require('gulp-angular-templatecache');

gulp.task('bower', function() {
  return bower({
    command: 'install'
  });
});

gulp.task('tsd', function (callback) {
  tsd({
      command: 'reinstall',
      latest: true,
      config: './tsd.json'
  }, callback);
});

// TypeScript Task
gulp.task('ts_main', ['tsd', 'bower'], function () {
  return gulp.src(['./src/**/*'])
    .pipe(webpackStream({
      displayErrorDetails: true,
      devtool: 'source-map',
      resolve: {
        extensions: ['', '.ts', '.webpack.js', '.web.js', '.js', '.css']
       },
      entry: {main: './src/ts/main/app.ts'},
      output: {
        filename: 'js/[name]-app.js'
      },
      plugins: [
        new BowerWebpackPlugin({
          modulesDirectories: ["bower_components"],
          manifestFiles:      [".bower.json","bower.json"],
          includes:           /.*/,
          excludes:           [],
          searchResolveModulesDirectories: false
        }),
        // new webpack.optimize.UglifyJsPlugin()
      ],
      module: {
        loaders: [
          {
            test: /\.ts$/,
            loader: "awesome-typescript-loader"
          },
          {
            test: /\.css$/,
            loaders: ['style', 'css']
          },
        ]
      },
      sassLoader: {
        includePaths: [path.resolve(__dirname, "./bower_components")]
      }
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('ts', ['ts_main']);

gulp.task('main-template', function(){
  return gulp.src('./src/views/**/*.html')
    .pipe(templateCache('main-template.js', {
      root: '',
      module: 'main.app',
      standalone: false,
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function(){
  return gulp.src(['./src/index.html'])
    .pipe(htmlmin({
      removeComments: true,
      removeCommentsFromCDATA: true,
      removeCDATASectionsFromCDATA: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      removeOptionalTags: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('image', function(){
  var result = gulp.src(['./src/**/*.{png,jpg,gif}', '!./src/commons/**/demo/**'])
  .pipe(imagemin())
  .pipe(gulp.dest('./dist'));
  return result;
});


gulp.task('css', function(){
  return gulp.src('./src/**/*.scss')
    .pipe(sass())
    .on('error', function(err) {
      console.log(err.message);
    })
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'ie 8', 'ie 9']
    }))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist'));
});

gulp.task('font', ['bower'], function(){
  return gulp.src(
    ['./bower_components/bootstrap-sass/assets/fonts/bootstrap/*.{eot,woff2,woff,ttf,svg}'],
    { base: './bower_components/bootstrap-sass/assets/fonts/bootstrap/' }
    ).pipe(gulp.dest('./dist/fonts'));
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
    gulp.watch(['./src/index.html', './src/views/**/*.html'], ['html']);
    gulp.watch(['./src/views/**/*.html'], ['main-template']);
    gulp.watch(['./src/**/*.{png,jpg,gif}'], ['image']);
    gulp.watch(['./src/**/*.css', './src/**/*.scss'], ['css']);
});

gulp.task('dist', ['main-template','ts', 'css', 'image', 'html', 'font']);
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
