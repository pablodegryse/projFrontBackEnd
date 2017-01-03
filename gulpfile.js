var gulp = require("gulp"),sourcemaps=require("gulp-sourcemaps"),
    autoprefixer=require("gulp-autoprefixer"),cleancss=require("gulp-clean-css"),concat=require("gulp-concat"),
    csslint=require("gulp-csslint"),jsUglify=require("gulp-uglify"),jsHint=require("gulp-jshint");

const PATHS ={
    CSS:{
        SRC:'./client/css/styles.css',
        DEST:'./client/css/'
    },
    CLIENTJS:{
        SRC:'./client/js/CanvasDrawer.js/',
        DEST:'./client/js/'
    },
    SERVERJS:{
        SRC:'./serverModules/*.js/'
    }
};
const AUTOPREFIX_OPTIONS={
    browsers:['last 2 versions']
};

//client css minify
gulp.task("css",function () {
    gulp.src(PATHS.CSS.SRC).pipe(autoprefixer(AUTOPREFIX_OPTIONS))
        .pipe(concat("styles.min.css"))
        .pipe(cleancss({debug:true,compatibility:'*'},function (details) {
            console.log("--> "+details.name+" original: "+details.stats.originalSize);
            console.log("--> "+details.name+" minified: "+details.stats.minifiedSize);
        })).pipe(gulp.dest(PATHS.CSS.DEST));
});

//client css linten
gulp.task("csslint",function () {
    gulp.src(PATHS.CSS.SRC)
        .pipe(csslint())
        .pipe(csslint.formatter());
});

//client js hinten en minify
gulp.task("clientjs",function () {
    //src pakken , dan jshint gebruiken,dan sourcemap init , dan concat, dan uglify,dan sourcemap write , dan destination
    gulp.src(PATHS.CLIENTJS.SRC).pipe(jsHint()).pipe(jsHint.reporter()).pipe(concat("CanvasDrawer.min.js")).pipe(jsUglify())
        .pipe(sourcemaps.write()).pipe(gulp.dest(PATHS.JS.DEST));
});

//server js hinten
gulp.task("serverjs",function () {
    gulp.src(PATHS.SERVERJS.SRC).pipe(jsHint()).pipe(jsHint.reporter());
});
