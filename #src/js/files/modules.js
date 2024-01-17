export const flsModules = {}
import { gotoBlock } from "./scroll/gotoBlock.js";


export function filmsTitleToContain() {
    document.addEventListener("DOMContentLoaded", () => {
        let items = [...document.querySelectorAll('.films__item')];
        for (let i = 0; i < items.length; i++) {
            let imageWidth = items[i].querySelector("img").clientWidth
            let title = items[i].querySelector(".films__item-title");
            title.style.maxWidth = `${imageWidth}px`;
        }
    });
}

export function changingVideo() {

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
                    findCurrentVideo();


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
                // videoList[i].cals
            }
        }
    }
}