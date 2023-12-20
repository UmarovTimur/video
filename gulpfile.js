//Основной модуль
import gulp from "gulp";
//Импорт путей
import { path } from "./gulp/config/path.js";
//Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

//Передаем значения в глобальную переменную
global.app = {
   isBuild: process.argv.includes('--build'),
   isDev: !process.argv.includes('--build'),
   path: path,
   gulp: gulp,
   plugins: plugins
}

//Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { jsDev } from "./gulp/tasks/js-dev.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { json } from "./gulp/tasks/json.js";

//Наблюдатель за изменениями в файлах
function watcher() {
   gulp.watch(path.watch.files, dev);
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.images, images);
}

//Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
//Основные задачи
const devTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, json));
const buildTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, jsDev, images, json));
//Построение сценариев выполнения задач
const dev = gulp.series(reset, devTasks, watcher);
const build = gulp.series(reset, buildTasks);
const deployZIP = gulp.series(reset, buildTasks, zip);
const deployFTP = gulp.series(reset, buildTasks, ftp);

//Экспорт сценариев
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

//Выполнение сценария по умолчанию
gulp.task('default', dev);