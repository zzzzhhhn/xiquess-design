const utils = require("./utils.js");
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const minifyCSS = require("gulp-minify-css");
gulp.task("sass", async function () {
  return gulp
    .src("../components/css/**/*.scss")
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest(utils.DIST_PATH + "/css"));
});
gulp.task("copy", function () {
  return gulp
    .src("../components/css/font/*")
    .pipe(gulp.dest(utils.DIST_PATH + "/css/font"));
});
