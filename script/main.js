const slidesContainer = document.querySelector('.carousel-slides');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let currentSlide = 0;

fetch('/JSON/images.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.caption;
            slide.appendChild(img);
            slidesContainer.appendChild(slide);
        });
        showSlide(currentSlide);
    })
    .catch(error => {
        console.error('Error loading images:', error);
    });

function showSlide(index) {
    const slideWidth = slidesContainer.offsetWidth;
    slidesContainer.style.transform = `translateX(${-slideWidth * index}px)`;
    currentSlide = index;
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? slidesContainer.children.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide === slidesContainer.children.length - 1) ? 0 : currentSlide + 1;
    showSlide(currentSlide);
});