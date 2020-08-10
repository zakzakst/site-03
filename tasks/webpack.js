const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const webpackConfig = require("../webpack.config");

// webpackの実行
function webpackFunc() {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("dist/js"));
}

exports.webpack = webpackFunc;
