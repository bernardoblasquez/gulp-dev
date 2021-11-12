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


    Sourcemaps
    - permite que ao inspecionar um elemento através do navegador
    este referencie arquivo sass ao invés do css, facilitando encontrar bugs
    e indicando onde está o respectivo estilo no sass
    - estrutura veja figura na pasta images
    - https://www.npmjs.com/package/gulp-sourcemaps


    Sass Lint
    - Task responsável por analizar o arquivo sass e 
    fornecer dicas de boas práticas;
    - Deve ser usado antes de rodar o compilador sass e estas duas 
    tasks estiverem na mesma função. Se ela rodar depois do compilador SASS 
    esta task irá analizar o CSS resultante da compilação.

    CSS Lint
    - Caso a o desenvolvedor ainda não esteja usando o Sass
    ele pode utilizar o CSS lint para aprender boas práticas com o CSS
    - Os feedbacks providos pelo Css-lint aparentemente são melhores que 
    a do sassLint (procure tirar as propriedades de ordem alfabética no sass
    e compare as duas saídas para ver qual é mais clara)


    Referencias:
    - https://www.youtube.com/watch?v=QgMQeLymAdU
    - https://www.npmjs.com/package/gulp-sass
    - https://www.npmjs.com/package/gulp-sourcemaps
    - https://browsersync.io/docs/gulp
    - https://www.npmjs.com/package/gulp-autoprefixer
    - 


*/

var gulp = require('gulp'),
    sassCompiler = require('gulp-sass')(require('sass')),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    inlineCss = require('gulp-inline-css');
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

// CONFIGURARÇÂO do Autoprefixer
// - package.json no final do arquivo: "browserslist"
// - https://github.com/browserslist/browserslist#queries
// - https://github.com/postcss/autoprefixer#using-environment-variables-to-support-css-grid-prefixes-in-create-react-app

return gulp.src(paths.sass.src)
   .pipe(sourcemaps.init())
      .pipe(sassCompiler({outputStyle: 'expanded'})
      .on('error', sassCompiler.logError))
      .pipe(autoprefixer())
   .pipe(sourcemaps.write('maps')) // cria e salva o arquivo de mapeamento, na pasta maps
   .pipe(gulp.dest(paths.css.dest))
   .pipe(browserSync.stream()) // atualiza estilo sem recarregar página
}


function CSS(){ 
   return gulp.src(paths.css.src)
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
   gulp.watch(paths.css.src).on('change', CSS);
   gulp.watch(paths.html).on('change', browserSync.reload);
   gulp.watch(paths.js).on('change', browserSync.reload);

}

function transformToInlineCSS() {
   return gulp.src('./app/*.html')
      .pipe(inlineCss({
         applyStyleTags: true,
         applyLinkTags: true,
         removeStyleTags: true,
         removeLinkTags: true
   }))
   .pipe(gulp.dest('build/'));
}

// possibilita chamar uma task via linha de comando
exports.compileScssToCss = compileSassToCss;
exports.watch = watch;
exports.transformToInlineCSS = transformToInlineCSS;
