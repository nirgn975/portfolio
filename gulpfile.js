var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require("gulp-rename");
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var ghPages   	= require('gulp-gh-pages');
var cssmin      = require('gulp-cssmin');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Handle JavaScript files.
 * Minify all the files and concat them to one file.
 */
gulp.task('javascript', function(){
  return gulp.src([
      './assets/javascript/tools/semantic.min.js',
      './assets/javascript/custom/nav.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./_site/assets/javascript'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/javascript'));
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});


/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['javascript','sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});


/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 * Handle SASS files.
 * Convert SASS to CSS, minify all the files and add prefix.
 */
gulp.task('sass', function () {
    return gulp.src('assets/scss/main.scss')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(rename("main.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest('_site/assets/scss'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/scss'));
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch([
      'assets/scss/*/*.scss',
      'assets/scss/*.scss',
    ], ['sass']);
    gulp.watch('assets/javascript/*/*', ['javascript']);
    gulp.watch([
      'index.html',
      '_layouts/*.html',
      '_includes/*',
      '_posts/*.md',
      'assets/img/posts/*'
    ], ['jekyll-rebuild']);
});

/**
 * Waite for jekyll-build task and deploy the site to gh-pages branch.
 */
gulp.task('deploy', ['sass', 'javascript', 'jekyll-build'], function() {
  return gulp.src('./_site/**/*')
    .pipe(ghPages());
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
