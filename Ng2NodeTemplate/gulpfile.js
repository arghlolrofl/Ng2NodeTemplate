var gulp = require("gulp");
var del = require("del");
const tslint = require('gulp-tslint');

gulp.task('tslint', function () {
    return gulp.src('src/**/*.ts')
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del(['public/app/**/*', 'public/lib/**/*' ]);
});

// copy dependencies
gulp.task('copy:libs', ['clean'], function () {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js'
    ])
        .pipe(gulp.dest('public/lib'));
});

// TypeScript compile
//gulp.task('compile', ['clean'], function () {
//    return gulp
//        .src('src/**/*.ts')
//        .pipe(typescript(tscConfig.compilerOptions))
//        .pipe(gulp.dest('public/app'));
//});

gulp.task('build', ['clean', 'tslint', 'copy:libs']);
