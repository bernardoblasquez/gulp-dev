/*
    var paths = {}
    - objeto que contem os caminhos das pastas do projeto
    - o objetivo é facilitar a mudança dessas pastas quando esse conjunto de
    tasks for utilizado em outro projeto.

*/

var gulp = require('gulp'),
    sassCompiler = require('gulp-sass'),
    browserSync = require('browser-sync').create();

var paths = {

  baseDirServer:'./app',
  project:'./app/**/*',
  html: './app/**/*.html',
  js:'./app/js/**/*.js',

  sass:{
    src: './app/scss/**/*.scss'
  },
  css: {
    src: './app/css/**/*.css',
    dest: './app/css/'
  }

};

gulp.task('compileSassToCSS', function(){
    gulp.src(paths.sass.src)
    .pipe(sassCompiler())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream())
})

// Static server
gulp.task('server', function() {

    browserSync.init({
        server: {
            baseDir: paths.baseDirServer
        }
    });

    gulp.watch(paths.sass.src).on('change', function(event){
      
      console.log(event); 
      // a variável event mostra o caminho e o arquivo que está sendo manipulado

      gulp.src(paths.sass.src)
      .pipe(sassCompiler())
      .pipe(gulp.dest(paths.css.dest))
      .pipe(browserSync.stream())
      
    });

    gulp.watch(paths.html).on('change', browserSync.reload);
    gulp.watch(paths.js).on('change', browserSync.reload);
});
