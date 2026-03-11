(function() {
    const totalImages = 10;
    const intervalTime = 4000;
    let currentIndex = 0;
    const imageBase = 'gallery/about/image';
    const imageExt = '.jpg';
    let intervalId = null;

    // Preload images
    const preloadedImages = [];
    for (let i = 0; i < totalImages; i++) {
        const img = new Image();
        img.src = `${imageBase}${i}${imageExt}`;
        preloadedImages.push(img);
    }

    function startSlideshow() {
        const slideshowImg = document.getElementById('slideshow-image');
        if (!slideshowImg) return;

        function updateImage() {
            currentIndex = (currentIndex + 1) % totalImages;
            slideshowImg.src = `${imageBase}${currentIndex}${imageExt}`;
        }

        function play() {
            if (!intervalId) {
                intervalId = setInterval(updateImage, intervalTime);
            }
        }

        function pause() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        // Pause slideshow when tab is inactive
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                pause();
            } else {
                play();
            }
        });

        play();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startSlideshow);
    } else {
        startSlideshow();
    }
})();
