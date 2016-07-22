var gulp    = require('gulp');
var serve   = require('gulp-serve');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var cheerio = require('gulp-cheerio');
var cssmin  = require('gulp-cssmin');
var domSrc  = require('gulp-dom-src');

gulp.task('serve', serve('./'));

gulp.task('js', function(){

    domSrc({ file: 'index.html', selector: 'script', attribute: 'src' })
        .pipe(concat('app.full.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));

});

gulp.task('html', function(){

    gulp.src('index.html')
        .pipe(cheerio(function($){

            $('script').remove();
            $('link').remove();
            $('body').append('<script src="app.full.js"></script>');
            $('head').append('<link href="app.full.css" rel="stylesheet">')

        }))
        .pipe(gulp.dest('./dist'));

});

gulp.task('css', function(){

    domSrc({ file: 'index.html', selector: 'link', attribute: 'href' })
        .pipe(cssmin())
        .pipe(concat('app.full.css'))
        .pipe(gulp.dest('./dist'));

});

gulp.task('build', ['css','js','html']);