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
        document.addEventListener("click", function (e) {

            if (e.target.closest("[data-link-to-video]")) {
                let videoSource = e.target.closest("[data-link-to-video]").getAttribute('data-link-to-video');
                let type = e.target.closest("[data-link-to-video]").getAttribute('data-video-type');
                if (videoSource != current) {
                    if (!video.paused) {
                        video.pause();
                    }
                    
                    video.src = videoSource;
                    video.type = type;
                    video.load();
                    video.play();
    
                    current = videoSource;
                    gotoBlock('#mainVideoView', true);
                        
                }
            }
        });
    }
    

}