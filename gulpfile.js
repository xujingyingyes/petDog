var gulp = require('gulp'); //gulp基础包
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var startServerDir = './dist/';
var projectFileDir = 'html/info/';
var file = 'introduce.html';
var host = '127.0.0.1';
var watchDir = startServerDir + projectFileDir;
var  rename = require("gulp-rename"),//重命名
uglify = require("gulp-uglify"),//压缩js
ngmin = require('gulp-ngmin'),//angular依赖
ngAnnotate = require('gulp-ng-annotate'),//angular依赖
minifycss = require("gulp-minify-css"),//压缩css
htmlmin = require('gulp-htmlmin'),//html压缩
imagemin = require('gulp-imagemin'),//图片压缩
pngcrush = require('imagemin-pngcrush'),
concat = require("gulp-concat"),//合并
jshint = require('gulp-jshint'),//js检测
autoprefixer = require('gulp-autoprefixer'),//补充前缀
rev = require('gulp-rev-append'),//版本号自动更新
notify = require('gulp-notify');//提示信息

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

// 检查js
gulp.task('jslint', function () {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({message: 'jslint task ok'}));
});
//合并压缩js代码
gulp.task('minifyjs', function () {
    var jsOption = {
        compress: true//类型：Boolean 默认：true 是否完全压缩
        // preserveComments: 'all' //保留所有注释}//排除混淆关键字
    };
    return gulp.src(['./dist/js/**/*.js', './dist/js/*.js','!src/js/all.js'])//这里先压其它js，最后再压缩app.js避免注入时顺序出错
        .pipe(concat('all.js'))
        .pipe(ngAnnotate())
        .pipe(ngmin({dynamic: false}))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./dist0/js'))
        .pipe(notify({message: 'js task ok'}));
});

//html压缩
gulp.task('html', function () {
    var htmlOptions = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src(['./dist/html/**/*.html','./dist/*.html'])
        .pipe(rev())
        .pipe(htmlmin(htmlOptions))
        .pipe(gulp.dest('./dist0/html'))
        .pipe(notify({message: 'html task ok'}));
});

// 合并、压缩、重命名css
gulp.task('minifycss', function () {
    var cssOption = {
        advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
        compatibility: '*',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
        keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
        keepSpecialComments: '*'
        //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    };
    return gulp.src(['./dist/css/**/*.css', './dist/css/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            remove: true //是否去掉不必要的前缀 默认：true
        }))
        //.pipe(concat('main.css'))
        //.pipe(gulp.dest('dist/css'))
        //.pipe(rename({suffix: '.min'}))
        .pipe(minifycss(cssOption))
        .pipe(gulp.dest('./dist0/css'))
        .pipe(notify({message: 'css task ok'}));
});

// 压缩图片
gulp.task('img', function () {
    var imgOption = {
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
        svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
        use: [pngcrush()] //使用pngquant深度压缩png图片的imagemin插件
    };
    return gulp.src(['./dist/image/**/*.png','./dist/image/*.png'])
        .pipe(imagemin(imgOption))
        .pipe(gulp.dest('./dist0/image'))
        .pipe(notify({message: 'img task ok'}));
});

// 默认任务
gulp.task('default', function () {
    gulp.run('minifyjs', 'minifycss', 'html', 'img');

    // 监听html文件变化
    gulp.watch(['./dist/html/**/*.html','./dist/*.html'], function () {
        gulp.run('html');
    });

    // 监听css文件变化
    gulp.watch(['./dist/css/**/*.css', './dist/css/*.css']);

    // 监听js文件变化
    gulp.watch(['js/**/*.js', 'js/*.js']);

    // 监听img文件变化
    gulp.watch(['./dist/image/**/*.png','./dist/image/*.png']);
});
