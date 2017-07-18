var gulp = require("gulp");
var sass = require("gulp-sass");
var browserify = require("gulp-browserify");
var rename = require("gulp-rename");
var browserSync = require("browser-sync").create();

var config = {
    source: "./src/",
    dist: "./public/"
};

var paths = {
    html: "**/*.html",
    sass: "assets/scss/**/*.scss",
    mainSass: "assets/scss/main.scss"
};

var sources = {
    html: config.source + paths.html,
    // "./src/**/*.html" los parentesis dobles indica que no importa la profundidad de las carpetas nos traera los archivos que termina en .html
    sass: config.source + paths.sass,
    rootSass: config.source + paths.mainSass,
};

gulp.task("mover_html", () => {
    gulp.src(sources.html).pipe(gulp.dest(config.dist));
});

gulp.task("sass", () => {
    gulp.src(sources.rootSass).pipe(sass({outputStyle:"compressed"}).on("error", sass.logError)).pipe(gulp.dest(config.dist + "/assets/css"))
})

gulp.task("js", () => {
    gulp.src("./src/assets/js/*.js").pipe(browserify()).pipe(rename("misJavascripts.js")).pipe(gulp.dest(".publis/assets/js"))
});

gulp.task("sass-watch", ["sass"], (done) => {
    browserSync.reload();
    done();
});

gulp.task("serve", () =>{
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    })
    gulp.watch("./src/assets/scss/main.scss", ["sass-watch"])
})

