const gulp = require('gulp');
const sass = require('gulp-sass');

// SASSのビルド
function sassBuild() {
  const sassPath = {
    src: './src/sass/*.scss',
    dist: './dist/css',
  };
  return gulp.src(sassPath.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(sassPath.dist));
}

exports.sassBuild = sassBuild;
