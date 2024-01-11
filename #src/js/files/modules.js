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
        let current = {
            src:video.querySelector('source').src,
            currentCard:"dfd"
        }
        findCurrentVideo(current); 
        document.addEventListener("click", function (e) {

            if (e.target.closest("[data-link-to-video]")) {
                let videoSource = e.target.closest("[data-link-to-video]").getAttribute('data-link-to-video');
                let type = e.target.closest("[data-link-to-video]").getAttribute('data-video-type');
                if (videoSource != current) {
                    if (!video.paused) {
                        video.pause();
                    }
                    
                    // Изменяем видео
                    video.src = videoSource;
                    video.type = type;
                    video.load();
                    video.play();
    
                    current = videoSource;
                    gotoBlock('#mainVideoView', true);
                    // Смена вида карточки
                    findCurrentVideo();


                    // Изменение текст
                    // ...
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