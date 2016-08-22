var gulp = require("gulp");
var del = require("del");
var ts = require('gulp-typescript');
var merge = require('merge2');  // Require separate installation
const tslint = require("gulp-tslint"); 

// runs ts lint with settings defined tslint.json
gulp.task("ts:lint", function () {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

// clean the contents of the distribution directory
gulp.task("ts:clean:libs", function () {
    return del("public/lib/**/*");
});

gulp.task("ts:clean:src", function () {
    return del("public/app/**/*");
});

// copy polyfills
gulp.task("ng2:polyfills", function () {
    return gulp.src([
        "node_modules/core-js/client/shim.min.js",
        "node_modules/zone.js/dist/zone.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/systemjs/dist/system.src.js"
    ])
        .pipe(gulp.dest("public/lib"));
});

// copy ng2 and dependencies
gulp.task("ng2:libs", ["ng2:polyfills"], function () {
    return gulp.src([
        "node_modules/@angular/**/*.js",
        "node_modules/@angular/**/*.map",
        "node_modules/rxjs/**/*.js",
        "node_modules/rxjs/**/*.map"
    ], { base: './node_modules/' })
        .pipe(gulp.dest("public/lib"));
});

// transpile typescript files into output folder
var tsProject = ts.createProject('tsconfig.json');
gulp.task('ts:build', ["ts:lint", "ts:clean:src"], function () {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(ts(tsProject));

    return merge([
        tsResult.dts.pipe(gulp.dest('public/definitions')),
        tsResult.js.pipe(gulp.dest('public/app'))
    ]);
});

gulp.task("ts:rebuild", ["ts:lint", "ts:clean:libs", "ts:clean:src", "ng2:libs", "ts:build"]);
