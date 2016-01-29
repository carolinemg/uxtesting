var gulp = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var gulpif = require('gulp-if');
var less = require('gulp-less');


gulp.task('scripts', function() {
    return gulp.src('assets/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function () {
    return gulp.src('assets/images/*')
        .pipe(changed('dist/images'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('less', function() {
  var lessTask = gulp.src('assets/less/theme.less')
    .pipe(sourcemaps.init())
      .pipe(less())
      .on('error', function(err) {
        console.error(err);
        gutil.beep();
        this.emit('end');
      })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));

  return lessTask;
});


gulp.task('watchcss', function() {
  gulp.watch('assets/less/*.less', ['less']);
});

gulp.task('watchjs', function() {
  gulp.watch('assets/js/**/*.js', ['scripts']);
});

gulp.task('watchimage', function() {
  gulp.watch('assets/images/*', ['images']);
});

gulp.task('default', ['scripts', 'less', 'images', 'watchcss', 'watchimage' , 'watchjs' ]);
gulp.task('deploy', ['scripts', 'less']);


