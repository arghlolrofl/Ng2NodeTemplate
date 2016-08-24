var gulp = require("gulp");
var del = require("del");
var flatten = require("gulp-flatten");
var fs = require('fs');
var path = require('path');
var tslint = require("gulp-tslint");

const LIB_DESTINATION_PATH = "public/lib";

var filterNonExistingFiles = function (files, destination) {
    var fileNames = files.map(function (obj) {
        return path.basename(obj);
    });

    var exists = fileNames.map(function (obj) {
        return fs.existsSync(__dirname + destination + obj);
    });

    fileNames = [];
    for (var i = 0; i < files.length; i++)
        if (!exists[i])
            fileNames.push(files[i]);

    return fileNames;
};

// runs ts lint with settings defined tslint.json
gulp.task("LINT:src", function () {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

// clean the contents of the distribution directory
gulp.task("CLEAN:lib", function () {
    return del("public/lib/**/*");
});

gulp.task("CLEAN:src", function () {
    return del("public/app/**/*");
});

// Copy Angular2 dependencies into public/lib
gulp.task("COPY:ng2", function () {
    var existsNg2 = false;

    if (fs.existsSync(__dirname + "/public/lib/@angular"))
        existsNg2 = true;

    if (existsNg2) {
        console.log("[GULP] Skipping 'NG2.CopyDependency.Angular2' ...");
        return;
    }

    return gulp.src([
        "node_modules/@angular/**/*.js",
        "node_modules/@angular/**/*.map"
    ], { base: "./node_modules/" })
        .pipe(gulp.dest(LIB_DESTINATION_PATH));
});

// Copy rxjs dependencies into public/lib
gulp.task("COPY:rxjs", function () {
    var existsRxJs = false;

    if (fs.existsSync(__dirname + "/public/lib/rxjs"))
        existsRxJs = true;

    if (existsRxJs) {
        console.log("[GULP] Skipping 'NG2.CopyDependency.RxJs' ...");
        return;
    }

    return gulp.src([
        "node_modules/rxjs/**/*.js",
        "node_modules/rxjs/**/*.map"
    ], { base: "./node_modules/" })
        .pipe(gulp.dest(LIB_DESTINATION_PATH), { overwrite: false });
});

// copy polyfills
gulp.task("COPY:polyfills", function () {
    var files = [
        "node_modules/core-js/client/shim.min.js",
        "node_modules/zone.js/dist/zone.js",
        "node_modules/reflect-metadata/Reflect.js",
        "node_modules/systemjs/dist/system.src.js",
        "node_modules/core-js/client/shim.min.js.map",
        "node_modules/zone.js/dist/zone.js.map",
        "node_modules/reflect-metadata/Reflect.js.map",
        "node_modules/systemjs/dist/system.src.js.map"
    ];

    return gulp.src(filterNonExistingFiles(files, LIB_DESTINATION_PATH))
        .pipe(gulp.dest(LIB_DESTINATION_PATH));
});

// copy all dependencies
gulp.task("COPY:DEPENDENCIES", ["COPY:ng2", "COPY:rxjs", "COPY:polyfills"]);
