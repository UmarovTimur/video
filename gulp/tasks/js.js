import webpack from "webpack-stream";
import TerserPlugin from "terser-webpack-plugin";

import * as path from 'path';

const srcFolder = "#src";
const builFolder = "dist";
const paths = {
   src: path.resolve(srcFolder),
   build: path.resolve(builFolder)
}


const configDev = {
   mode: "development",
   devtool: 'inline-source-map',
   optimization: {
      minimize: false
   },
   entry: [
      `${paths.src}/js/app.js`
   ],
   output: {
      path: `${paths.build}`,
      filename: 'app.min.js',
      publicPath: '/'
   }
}

const config = {
   mode: "production",
   optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
   },
   output: {
      path: `${paths.build}`,
      filename: 'app.min.js',
      publicPath: '/',
   }
}
export default config;


export const js = () => {
   return app.gulp.src(app.path.src.js)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(
         webpack({
            config: app.isBuild ? config : configDev,
         }),
      )
      .pipe(app.gulp.dest(app.path.build.js));
}
