var gulp = require("gulp"); //gulp基础包
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var startServerDir = "./dist/";
var projectFileDir = "html/info/";
var file = "introduce.html";
var host = "127.0.0.1";
var watchDir = startServerDir + projectFileDir;

console.log("open =====>  http:" + host + ":9000/" + projectFileDir + file);
gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: startServerDir
        },
        host: host,
        port: 9000,
        //startPath: projectFileDir + file,
        startPath: "index.html",
        open: "external"
    });
    gulp.watch(
        [
            startServerDir + "*.html",
            startServerDir + "html/*.html",
            watchDir + "*.html",
            startServerDir + "js/*.js",
            startServerDir + "css/*.css",
            startServerDir + "image/*"
        ],
        reload
    );
});
gulp.task("default", ["browser-sync"]);

const htmlmin = require("gulp-htmlmin"),
    jsmin = require("gulp-uglify"),
    cssmin = require("gulp-clean-css"),
    assetRev = require("gulp-asset-time"),
    image = require("gulp-image"),
    zip = require("gulp-zip"),
    clean = require("gulp-clean"),
    options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    },
    output = {
        dev: "./dist/",
        build: "./dest/"
    };

gulp.task("delete", function() {
    return gulp.src(output.build).pipe(clean());
});

gulp.task("copy", ["delete"], function() {
    return gulp.src(`${output.dev}**`).pipe(gulp.dest(output.build));
});

gulp.task("html-rev", function() {
    gulp
        .src([`${output.build}**/*.html`, `${output.build}*.html`])
        .pipe(htmlmin(options))
        .pipe(assetRev())
        .pipe(gulp.dest(output.build));
});

gulp.task("css-rev", function() {
    gulp
        .src([`${output.build}css/*.css`, `${output.build}css/**/*.css`])
        .pipe(cssmin())
        .pipe(assetRev())
        .pipe(gulp.dest(`${output.build}css`));
});

gulp.task("js-min", function() {
    gulp
        .src(`${output.build}js/*.js`)
        .pipe(jsmin())
        .pipe(gulp.dest(`${output.build}js`));
});

// 非常吃cpu，没必要在start里面去掉
gulp.task("img-min", function() {
    gulp
        .src(`${output.build}image/**/*.*`)
        .pipe(image())
        .pipe(gulp.dest(`${output.build}image`));
});

gulp.task("build-zip", function() {
    gulp
        .src(`${output.build}**`)
        .pipe(zip("dest.zip"))
        .pipe(gulp.dest(`${output.build}`));
});

gulp.task("build", ["copy"], function() {
    gulp.start("html-rev", "css-rev", "js-min", "img-min");
    gulp.start("build-zip");
});