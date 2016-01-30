var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');


gulp.task('scripts', function() {
    return gulp.src('assets/js/**/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/scripts'));
});

gulp.task('less', function() {
  var lessTask = gulp.src('assets/less/style.less')
    .pipe(sourcemaps.init())
      .pipe(less())
      .on('error', function(err) {
        console.error(err);
        gutil.beep();
        this.emit('end');
      })
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/style'));

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

gulp.task('default', ['scripts', 'less', 'watchcss', 'watchjs' ]);
gulp.task('deploy', ['scripts', 'less']);


