const gulp = require('gulp');
const { nunjucksBuild } = require('./tasks/nunjucks-build');
const { sassBuild } = require('./tasks/sass-build');
// const { jsBuild } = require('./tasks/js-build');
const { imagemin } = require('./tasks/imagemin');
const { browsersync } = require('./tasks/browsersync');
const { webpack } = require('./tasks/webpack');

gulp.task('watch-files', (done) => {
  gulp.watch('./src/nunjucks/**/*.njk', gulp.series(nunjucksBuild, browsersync.reload));
  gulp.watch('./src/sass/**/*.scss', gulp.series(sassBuild, browsersync.reload));
  gulp.watch('./src/js/**/*.js', gulp.series(webpack, browsersync.reload));
  done();
});

exports.webpack = webpack;

gulp.task('imagemin', gulp.series(imagemin));
// gulp.task('build', gulp.series(nunjucksBuild, sassBuild));
gulp.task('build', gulp.series(nunjucksBuild, sassBuild, webpack));
gulp.task('default', gulp.series(browsersync.server, 'watch-files'));
