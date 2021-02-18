const gulp = require('gulp');
const webp = require('gulp-webp');
const svgmin = require('gulp-svgmin');
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const mincss = require('gulp-csso');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const server = require('browser-sync').create();

gulp.task('webp', () =>
  gulp.src('source/img/**/*.{jpg,png}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img/'))
);

gulp.task("sprite", function () {
  return gulp.src("source/img/svg/icon-*.svg")
      .pipe(svgmin())
      .pipe(svgstore({
          inlineSVG: true
      }))
      .pipe(rename("sprite.svg"))
      .pipe(gulp.dest("build/img/svg"));
});

gulp.task('svg', () => {
  return gulp.src('source/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/img/svg'));
});

gulp.task('clean', () => {
  return del('build');
});

gulp.task('copy', () => {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**/*.{svg,webp,jpg,png}',
    'source/js/*.js',
    'source/*.html',
    'source/css/*.css'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('html', () => {
  return gulp.src('source/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ 
      collapseWhitespace: true,
      ignoreCustomFragments: [ /<br>\s/gi ] 
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('style', () => {
  return gulp.src('source/css/style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ 
      autoprefixer() 
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'))
    .pipe(mincss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream())
});

gulp.task('js', () => {
  return gulp.src('source/js/*.js')
      .pipe(uglify().on('error', console.error))
      .pipe(gulp.dest('build/js'))
});

gulp.task ('server', function() {
  server.init({
      server: 'build/'
  });
  gulp.watch('source/css/*.css', gulp.series('style'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('js', 'refresh'));
  gulp.watch('source/img/svg/*.svg', gulp.series('svg', 'sprite', 'html', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('build', gulp.series('clean', 'copy', 'webp', 'sprite', 'html', 'style', 'js'));
gulp.task('start', gulp.series('build', 'server'));