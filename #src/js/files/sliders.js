/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
// import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.films-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.films-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 20,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			// simulateTouch: true,
			loop: true,
			// preloadImages: false,
			lazy: true,

			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			// scrollbar: {
			// 	el: '.swiper-scrollbar',
			// 	draggable: true,
			// },

			// // Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			breakpoints: {
				320: {
					slidesPerView: 2.3,
					spaceBetween: 15,
					autoHeight: true,
				},
				550: {
					slidesPerView: 2.3,
					spaceBetween: 15,
					autoHeight: true,
				},
				992: {
					slidesPerView: 3.3,
					spaceBetween: 20,
				},
				1440: {
					slidesPerView: 4.3,
					spaceBetween: 15,
				},
			},
			// События
			on: {

			}
		});
		new Swiper('.films-slider-2', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 20,
			autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			simulateTouch: true,	
			loop: true,
			// preloadImages: false,
			lazy: true,

			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 300,
				disableOnInteraction: true,
			},

			// Пагинация
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			// scrollbar: {
			// 	el: '.swiper-scrollbar',
			// 	draggable: true,
			// },

			// // Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			breakpoints: {
				320: {
					slidesPerView: 2.3,
					spaceBetween: 15,
					autoHeight: true,
				},
				550: {
					slidesPerView: 2.3,
					spaceBetween: 15,
					autoHeight: true,
				},
				992: {
					slidesPerView: 3.3,
					spaceBetween: 20,
				},
				1440: {
					slidesPerView: 4.3,
					spaceBetween: 15,
				},
			},
			// События
			on: {

			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});