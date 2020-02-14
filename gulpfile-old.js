/*
    var paths = {}
    - objeto que contem os caminhos das pastas do projeto
    - o objetivo é facilitar a mudança dessas pastas quando esse conjunto de
    tasks for utilizado em outro projeto.

*/

var gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

var paths = {

  baseDirServer:'./app',
  project:'app/**/*',
  js:'app/js/**/*.js',

  styles: {
    src: 'app/css/**/*.css',
    dest: 'assets/css/'
  },



};

// Static server
gulp.task('server', function() {

    browserSync.init({
        server: {
            baseDir: paths.baseDirServer
        }
    });

    gulp.watch(paths.project).on('change', browserSync.reload);
});
