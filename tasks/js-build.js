const gulp = require('gulp');
const babel = require('gulp-babel');

// JSのビルド
function jsBuild() {
  const jsPath = {
    src: [
      'src/js/*.js',
      '!src/js/_*.js'
    ],
    dist: 'dist/js/',
  };
  return gulp.src(jsPath.src)
    .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(gulp.dest(jsPath.dist));
}

exports.jsBuild = jsBuild;
