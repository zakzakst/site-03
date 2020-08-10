const gulp = require('gulp');
const fs = require('fs');
const nunjucksRender = require('gulp-nunjucks-render');
const prettify = require('gulp-prettify');
const htmlmin = require('gulp-htmlmin');

// Nunjucksのビルド
function nunjucksBuild() {
  const nunjucksPath = {
    root: 'src/nunjucks/',
    siteData: 'src/nunjucks/_module/common/site-data.json',
    src: [
      'src/nunjucks/html/**/*.njk',
      '!src/nunjucks/html/**/_*.njk'
    ],
    dist: 'dist/',
  };
  const data = JSON.parse(fs.readFileSync(nunjucksPath.siteData, 'utf8'));
  return gulp.src(nunjucksPath.src)
    .pipe(nunjucksRender({
      path: [nunjucksPath.root],
      data: data
    }))
    .pipe(htmlmin({
      // collapseWhitespace : true,
      removeComments : true
    }))
    .pipe(prettify({
      indent_size: 2,
    }))
    .pipe(gulp.dest(nunjucksPath.dist));
}

exports.nunjucksBuild = nunjucksBuild;
