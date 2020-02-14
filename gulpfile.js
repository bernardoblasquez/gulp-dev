/*
    O objetivo dessas tasks é facilitar o estudo ou o desenvolvimento do front-end: 
    - pois automatiza algumas tarefas como o reload da página em 
    vários navegadores e dispositivos cada vez que um arquivo .html e .js é salvo; 
    - mantém o foco no local da página que está sendo estilizado; 
    - já vem com um pré-processador de sass configurado 
    -  
    

    var paths = {}
    - objeto que contem os caminhos das pastas do projeto
    - o objetivo é facilitar a mudança dessas pastas quando esse conjunto de
    tasks for utilizado em outro projeto.

    nomeDaPasta/\**\/*.scss
    - qualquer arquivo scss dento de nomeDaPasta

    Referencias:
    - https://www.youtube.com/watch?v=QgMQeLymAdU

*/

var gulp = require('gulp'),
    sassCompiler = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
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


function compileSassToCss(){
  // 1. onde está o arquivo Scss
  // 2. Passar o arquivo SASS pelo compilador
  // 3. Onde salvar o css compilado
  // 4. perpeuar alterações para todos os browsers. Apos configurar o browserSync
  // -  o uso do metodo browserSync.stream() permite atualização do CSS sem
  // recarrgar a páginas mantendo o foco no local da que etá sendo estilizado.

  return gulp.src(paths.sass.src)
    .pipe(sourcemaps.init())
      .pipe(sassCompiler())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream())
}

function watch(){
  // 1. Iniciar o brownserSync
 
  browserSync.init({
        server: {
            baseDir: paths.baseDirServer
        }
   });

   gulp.watch(paths.sass.src, compileSassToCss);
   gulp.watch(paths.html).on('change', browserSync.reload);
   gulp.watch(paths.js).on('change', browserSync.reload);

}

// possibilita chamar esta task via linha de comando
exports.compileScssToCss = compileSassToCss;
exports.watch = watch;
