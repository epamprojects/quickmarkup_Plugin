var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    connectLivereload = require('connect-livereload'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

var componentVendor = './src/components/**/';

var path = {
    'indexHtml' : './src/*.html',
    'indexScss' : './src/*.scss',
    'indexJs'   : './src/*.js'
   };


var destVendor = './build/';

var compiledDist = {
    'css' : destVendor +'styles'
};

/**
 * init gulp server
 * */
gulp.task('connect', function () {
    connect.server({
        root: '',
        port: 8000,
        livereload: true
    });
});

/**
 * livereload indexHtml*/
gulp.task('indexHtml', function(){
    gulp.src(path.indexHtml)
        .pipe(connect.reload())
});

/**
 * livereload indexJs*/
gulp.task('indexJs', function(){
    gulp.src(path.indexJs)
        .pipe(connect.reload())
});

/**
 * livereload indexScss*/
gulp.task('indexScss', function(){
    return gulp.src(path.indexScss)
        .on('error', function(err){ console.log(err.message); })
        .pipe(sass())
        .on('error', function(err){ console.log(err.message); })
        .pipe(concat('mainSass.css'))
        .pipe(gulp.dest(compiledDist.css))
        .pipe(connect.reload())
});


/**
 * live reload*/
gulp.task('watch', ['indexHtml',
                    'indexScss',
                    'indexJs'], function () {
    gulp.watch(path.indexHtml,  ['indexHtml']);
    gulp.watch(path.indexScss,  ['indexScss']);
    gulp.watch(path.indexJs,  ['indexJs']);
});


gulp.task('default',['connect', 'watch']);