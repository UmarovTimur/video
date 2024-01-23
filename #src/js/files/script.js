// Подключение функционала "Чертогов Фрилансера"
import { isMobile, FLS } from "./functions.js";
// Подключение списка активных модулей
import * as flsModules  from "./modules.js";

import { gotoBlock } from "./scroll//gotoblock.js";


function filmsTitleToContain() {
    document.addEventListener("DOMContentLoaded", () => {
        let items = [...document.querySelectorAll('.films__item')];
        for (let i = 0; i < items.length; i++) {
            let imageWidth = items[i].querySelector("img").clientWidth
            let title = items[i].querySelector(".films__item-title");
            title.style.maxWidth = `${imageWidth}px`;
        }
    });
}
filmsTitleToContain();

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
                let cardCoverForVideo = card.getAttribute('data-cover-for-video');
                let cardTimeForCover = card.getAttribute('data-time-for-cover');

                let filmTitle = document.getElementById("mainVideoTitle");
                let filmDiscription = document.getElementById("mainVideoDecription");

                if (videoSource != current) {
                    if (!video.paused) {
                        video.pause();
                    }
    
                    current = videoSource;
                    gotoBlock('#mainVideoView', true,500,30);
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
                    video.src = `${videoSource}#t=${cardTimeForCover}`;
                    video.type = type;
                    video.load();
                    
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

(function getFilms() {
    document.addEventListener("DOMContentLoaded", () => {
        loadFilms("json/films.json");
    });
})();

async function loadFilms(file) {
    let response = await fetch(file, {
        method: 'GET'
    });
    if(response.ok){
        let result = await response.json();
        parsingFilms(result);
    }else{
        console.log('Error in loadFilms', response.ok);
    }
}


function parsingFilms(data) {
    let filmsContainer = document.querySelector('.films__container');


    
    let currentFilmsSection = newFilmsSection();

    data.forEach(item =>{

        if (!item.description && !item.image && !item.video) {
            filmsContainer.insertAdjacentHTML("beforeend",`
            <div class="films__menu">
                <button class="films__link">${item.title}</button>
            </div>
            `);
            currentFilmsSection = '';

            return;
        }



        let filmsTemplate = `
        <article 
            data-video-type="${item.videoType}"
            data-link-to-video="${item.video}"
            data-title="${item.title}"
            data-discription="${item.description}"
            data-time-for-cover="${item.videoCover}"
            class="films__item">
            
                <div class="films__item-image">

                    <img src="${item.image}" alt="">

                </div>

                <h4 class="films__item-title">${item.title}</h4>
            </article>
        `



        if (!currentFilmsSection) {
            currentFilmsSection = newFilmsSection();
            filmsContainer.insertAdjacentElement("beforeend", currentFilmsSection);
        }
        currentFilmsSection.insertAdjacentHTML("beforeend", filmsTemplate);
    });

}

function newFilmsSection() {
    let el = document.createElement('div');
    el.classList.add("films__section");
    return el;
}