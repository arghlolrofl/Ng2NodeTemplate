var gulp = require("gulp");
var del = require("del");
var flatten = require("gulp-flatten");
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

gulp.task("ts:clean:node", function () {
    return del(["node/**/*.js", "node/**/*.map"]);
});

// copy polyfills
gulp.task("ng2:polyfills", function () {
    return gulp.src([
        "node_modules/core-js/client/shim.min.js",
        "node_modules/zone.js/dist/zone.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/systemjs/dist/system.src.js",
        "node_modules/core-js/client/shim.min.js.map",
        "node_modules/zone.js/dist/zone.js.map",
        "node_modules/reflect-metadata/Reflect.js.map",
        "node_modules/systemjs/dist/system.src.js.map"
    ])
        .pipe(gulp.dest("public/lib"));
});

// copy ng2 and dependencies
gulp.task("ng2:maps", function () {
    return gulp.src([
        "node_modules/@angular/**/*.map",
        "node_modules/rxjs/**/*.map"
    ])
        .pipe(flatten())
        .pipe(gulp.dest("public/lib"));
});

// copy ng2 and dependencies
gulp.task("ng2:libs", ["ng2:polyfills", "ng2:maps"], function () {
    return gulp.src([
        "node_modules/@angular/**/*.js",
        "node_modules/rxjs/**/*.js"
    ], { base: "./node_modules/" })
        .pipe(gulp.dest("public/lib"));
});

gulp.task("move:src:maps", function () {
    return gulp.src("public/app/**/*.map")
        .pipe(flatten())
        .pipe(gulp.dest("public/lib"));
});

gulp.task("del:src:maps", ["move:src:maps"], function () {
    return del("public/app/**/*.map");
});
