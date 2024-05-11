import { gotoBlock } from "./scroll//gotoblock.js";


function filmsTitleToContain() {
    let items = [...document.querySelectorAll('.films__item')];
    for (let i = 0; i < items.length; i++) {
        let image = items[i].querySelector("img");
        image.onload = function () {
            let title = items[i].querySelector(".films__item-title");
            title.style.maxWidth = `${image.clientWidth}px`;
        };
    }
}

function changingVideo() {

    let video = document.getElementById('mainVideoView');

    if (video) {
        let current = video.querySelector('source').src;
        findCurrentVideo(current);

        document.addEventListener("click", function (e) {
            if (e.target.closest("[data-link-to-video]")) {
                let videoSource = e.target.closest("[data-link-to-video]").getAttribute('data-link-to-video');
                let card = e.target.closest("[data-link-to-video]");
                let type = card.getAttribute('data-video-type');

                let cardTitle = card.getAttribute('data-title');
                let cardDiscription = card.getAttribute('data-discription');
                // let cardCoverForVideo = card.getAttribute('data-cover-for-video');
                let coverForVideo = card.getAttribute('data-time-for-cover');

                let filmTitle = document.getElementById("mainVideoTitle");
                let filmDiscription = document.getElementById("mainVideoDecription");

                if (videoSource != current) {
                    if (!video.paused) {
                        video.pause();
                    }


                    current = videoSource;

                    // Смена вида карточки
                    // findCurrentVideo(current);


                    // Изменение текста
                    // ...



                    filmTitle.textContent = cardTitle;
                    filmDiscription.textContent = cardDiscription;

                    // Изменение картинки для видео
                    // video.poster = cardCoverForVideo;
                    // console.log(video.querySelector("picture"))

                    // vjs-poster

                    // Изменяем видео
                    if (+coverForVideo > 0) {
                        console.log("Number");
                        video.src = `${videoSource}#t=${coverForVideo}`;
                    } else {
                        console.log("Link!!");
                        video.src = videoSource;
                    }
                    video.type = type;
                    video.load();

                    gotoBlock('#mainVideoView', false, 500, document.querySelector("header.header").clientHeight + 10);


                    // video.play();
                }


            }
        });
    }

    function findCurrentVideo(current) {
        let videoList = [...document.querySelectorAll("[data-link-to-video]")];

        for (let i in videoList) {
            if (videoList[i].getAttribute('data-link-to-video') == current) {
                videoList[i].classList.add('_watching-now');
            }
        }
    }
}
changingVideo();

export default function StartGetingFilms() {
    document.addEventListener("DOMContentLoaded", () => {
        loadFilms("json/films.json");
    });
};

StartGetingFilms();

async function loadFilms(file) {
    let response = await fetch(file, {
        method: 'GET'
    });
    if (response.ok) {
        let result = await response.json();
        parsingFilms(result);
        if (window.innerWidth > 767.98) sidebarParsingFilms(result);
    } else {
        console.log('Error in loadFilms', response.ok);
    }
}


function parsingFilms(data) {
    let filmsContainer = document.querySelector('.films__container');

    let currentFilmsSection = newFilmsSection("films__section");

    data.forEach(item => {

        // Создание заголовка категории
        if (!item["description"] && !item["image"] && !item['video']) {
            filmsContainer.insertAdjacentHTML("beforeend", `
            <div class="films__menu">
                <button class="films__link">${item["title"]}</button>
            </div>
            `);
            currentFilmsSection = '';

            return;
        } else if (!item["image"]) {
            return;
        }

        let filmsTemplateImage = ``;
        if (item["video-type"] == "youtube" || item["video-type"] == "vimeo") {
            filmsTemplateImage = `
            <a href="${item.urlPage}" class="films__item-image">

                <img src="${item["image"]}" alt="">

            </a>`;
        } else {
            filmsTemplateImage = `
            <div class="films__item-image">

                <img src="${item["image"]}" alt="">

            </div>`;
        }
        let filmsTemplate = `
        <article 
            data-video-type="${item["video-type"]}"
            data-link-to-video="${item["video"]}"
            data-title="${item["title"]}"
            data-discription="${item["description"]}"
            data-time-for-cover="${item["video-cover"]}"
            class="films__item">
            
                
                ${filmsTemplateImage}

                <a target="_blank" href="${item["urlPage"]}" class="films__item-title">${item["title"]}</a>
            </article>
        `
        let filmItem = document.createElement('div');
        filmItem.innerHTML = filmsTemplate;

        if (!currentFilmsSection) {
            currentFilmsSection = newFilmsSection("films__section");
            filmsContainer.insertAdjacentElement("beforeend", currentFilmsSection);
        }
        currentFilmsSection.insertAdjacentElement("beforeend", filmItem);
    });

    filmsTitleToContain();


}

function sidebarParsingFilms(data) {
    let filmsContainer = document.querySelector('.sidebar');

    data.forEach(item => {
        let currentFilmsSection;

        if (item["video-type"] == "youtube" || item["video-type"] == "vimeo") {
            currentFilmsSection = document.createElement('a');
            currentFilmsSection.style.display = 'inline-block';
            currentFilmsSection.setAttribute('href', item['urlPage']);
        } else {
            currentFilmsSection = document.createElement('div')
        }


        currentFilmsSection.classList.add('sidebar__item');


        if (!item['title'] || !item['image']) {
            console.error(item['title'], "item is undefinded [SIDEBAR ITEM]");
            return;
        } else if (!item['title']) {
            console.error(item['title'], "image is undefinded [SIDEBAR ITEM]");
            return;
        }


        if (item["video-type"] == "youtube" || item["video-type"] == "vimeo") {
            var sideFilmStart = `<a href="${item['urlPage']}" class="sidebar__item-content">`
            var sideFilmEnd = `</a>`
        } else {
            var sideFilmStart = `<div
            data-video-type="${item["video-type"]}"
            data-link-to-video="${item['video']}"
            data-title="${item['title']}"
            data-discription="${item['description']}"
            data-time-for-cover="${item["video-cover"]}"
            data class="sidebar__item-content">`
            var sideFilmEnd = `</div>`
        }

        let sideFilmTemplate = `
        ${sideFilmStart}
        <div class="sidebar__item-image">
            <img src="${item['image']}" alt="" class="">
        </div>
        <p class="sidebar__item-title">
            ${item['title']}
        </p>
        ${sideFilmEnd}
    `;

        currentFilmsSection.insertAdjacentHTML("beforeend", sideFilmTemplate);
        filmsContainer.insertAdjacentElement("beforeend", currentFilmsSection);

    });
}

function newFilmsSection(selector) {
    let el = document.createElement('div');
    el.classList.add(selector);
    return el;
}



