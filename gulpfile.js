let $       = require('gulp-load-plugins')(),
    gulp    = require('gulp'),
    stylish = require('jshint-stylish');

gulp.task('sass', function () {
    return gulp
        .src('src/boverlay.scss')
        .pipe($.sass({
            outputStyle: 'compressed'
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('js', function () {
    return gulp
        .src('src/boverlay.js')
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish))
        .pipe($.concat('boverlay.js'))
        .pipe(gulp.dest('dist'))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.uglify())
        .pipe(gulp.dest('dist'));
});