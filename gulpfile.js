var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var startServerDir = './dist/';
var projectFileDir = 'html/info/';
var file = 'introduce.html';
var host = '127.0.0.1';
var watchDir = startServerDir + projectFileDir;

console.log('open =====>  http:' + host +':9000/' + projectFileDir + file);
gulp.task('browser-sync',function () {
    browserSync({
        server:{
            baseDir: startServerDir
        },
        host: host,
        port: 9000,
        //startPath: projectFileDir + file,
        startPath: 'index.html',
        open: 'external'
    });
    gulp.watch(
        [
            startServerDir + '*.html',
            startServerDir + 'html/*.html',
            watchDir + '*.html',
            startServerDir + 'js/*.js',
            startServerDir + 'css/*.css',
            startServerDir + 'image/*'
        ],
        reload
    );
});
gulp.task('default',['browser-sync']);
