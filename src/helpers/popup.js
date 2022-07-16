import * as THREE from 'three'

export function popupMobileScreenOrientation(){

    let popup = document.getElementById('popupMobile')
    /**
     * Sizes of mobile screen
     */
    // Mobile orientation
    if( navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
        if (window.innerWidth < window.innerHeight){
            popup.style.zIndex = 99999;

            window.onclick = function(event) {
                popup.style.display = "none";
            } 
        } else if (window.innerWidth > window.innerHeight){
            popup.style.display = 'none'
        }
    } else {
        popup.style.display = "none";
    }
}