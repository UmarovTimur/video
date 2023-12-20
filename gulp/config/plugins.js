import replace from "gulp-replace";//Поиск и замена
import plumber from "gulp-plumber";//Обработка ошибок
import notify from "gulp-notify";//Сообщения(подсказки)
import newer from "gulp-newer";//Проверка обновления
import ifPlugin from "gulp-if";


//Экспортируем объект
export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   newer: newer,
   if: ifPlugin
}