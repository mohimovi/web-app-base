var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var browser = require('browser-sync');

var path = {
    src: {
        sass: [
            'src/style/*.sass'
        ],
        js: [
            'src/js/*.js',
            '!src/js/*.min.js'
        ],
        html: [
            'src/*.html',
            'src/*/*.html'
        ]
    },
    dest: {
        css: 'public/css',
        js: 'public/js',
        html: 'public'
    }
}

gulp.task('default', ['server', 'watch']);

gulp.task('server', function () {
    browser({
        server: {
            baseDir: './public'
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(path.src.html, ['html']);
    gulp.watch(path.src.sass, ['sass']);
    gulp.watch(path.src.js, ['js']);
});

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.dest.html))
        .pipe(browser.reload({ stream: true }));
});
 
gulp.task('sass', function () {
    gulp.src(path.src.sass)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest(path.dest.css))
        .pipe(browser.reload({ stream: true }));
});

gulp.task('js', function () {
    gulp.src(path.src.js)
        .pipe(uglify())
        .pipe(gulp.dest(path.dest.js))
        .pipe(browser.reload({ stream: true }));
});
