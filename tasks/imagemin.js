const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');

// 画像の圧縮
function imageminFunc() {
  const imgPath = {
    src: './src/img/**/*.{jpg,jpeg,png,gif,svg}',
    dist: './dist/img',
  };
  return gulp.src(imgPath.src)
    .pipe(imagemin(
      [
        pngquant({quality: [0.65, 0.8], speed: 1}),
        mozjpeg({quality: 80}),
        imagemin.svgo(),
        imagemin.gifsicle()
      ]
    ))
    .pipe(gulp.dest(imgPath.dist));
}

exports.imagemin = imageminFunc;
