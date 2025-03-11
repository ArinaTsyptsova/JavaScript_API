document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide-container img');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function setActiveSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function nextSlide() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        setActiveSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        setActiveSlide(prevIndex);
    }

    document.getElementById('prevSlide').addEventListener('click', prevSlide);
    document.getElementById('nextSlide').addEventListener('click', nextSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => setActiveSlide(index));
    });

    setActiveSlide(currentIndex);
});