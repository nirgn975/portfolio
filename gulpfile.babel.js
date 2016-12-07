'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import swPrecache from 'sw-precache';
const $ = gulpLoadPlugins();

// Minify the HTML.
gulp.task('minify-html', () => {
  return gulp.src('_site/**/*.html')
    .pipe($.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    }))
    .pipe(gulp.dest('_site'));
});

// Optimize images.
gulp.task('minify-images', () => {
  gulp.src('images/**/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('_site/images'));
});

// Concatenate, transpiles ES2015 code to ES5 and minify JavaScript.
gulp.task('scripts', () => {
  gulp.src([
    // Note: You need to explicitly list your scripts here in the right order
    //       to be correctly concatenated
    './_scripts/main.js'
  ])
    .pipe($.concat('main.min.js'))
    .pipe($.babel())
    .pipe($.uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('scripts'));
});

// Minify and add prefix to css.
gulp.task('css', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return gulp.src('css/main.css')
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.cssnano())
    .pipe(gulp.dest('_site/css'));
});

// Compile scss to css.
gulp.task('scss', () => {
    return gulp.src('scss/main.scss')
        .pipe($.sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(gulp.dest('css'));
});

// Watch change in files.
gulp.task('serve', ['jekyll-build'], () => {
  browserSync.init({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: '_site',
    port: 3000
  });

  // Warch html changes.
  gulp.watch([
    'css/**/*.css',
    'scripts/**/*.js',
    '_includes/**/*.html',
    '_layouts/**/*.html',
    '_posts/**/*.md',
    'index.html'
  ], ['jekyll-build', browserSync.reload]);

  // Watch scss changes.
  gulp.watch('scss/**/*.scss', ['scss']);

  // Watch JavaScript changes.
  gulp.watch('_scripts/**/*.js', ['scripts']);
});

gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var rootDir = '_site';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,json}'],
    stripPrefix: rootDir
  }, callback);
});

// Revert config file for gulp serve in local.
gulp.task('travis-edit-config', () => {
  return gulp.src('./_config.yml')
    .pipe($.replace('http://lifelongstudent.io', 'http://127.0.0.1:8000'))
    .pipe(gulp.dest('./'));
});

gulp.task('jekyll-build', ['scripts', 'scss'], $.shell.task([ 'jekyll build' ]));

// Default task.
gulp.task('build', () =>
  runSequence(
    'travis-edit-config',
    'scss',
    'jekyll-build',
    'minify-html',
    'css',
    'generate-service-worker',
    'minify-images'
  )
);


// Remove 404.html from service worker, because firebase don't serve the page
// in a GET request, and return 404 code.
gulp.task('cleanup-sw-deploy', () => {
  return gulp.src('./_site/sw.js')
    .pipe($.replace('/404.html', ''))
    .pipe(gulp.dest('./_site/'));
});

gulp.task('jekyll-build-for-deploy', $.shell.task([ 'jekyll build' ]));

gulp.task('firebase', $.shell.task([ 'firebase deploy' ]));

gulp.task('deploy', () => {
  runSequence(
    'scss',
    'scripts',
    'jekyll-build-for-deploy',
    'minify-html',
    'css',
    'generate-service-worker',
    'cleanup-sw-deploy',
    'minify-images',
    'firebase'
  )
});
