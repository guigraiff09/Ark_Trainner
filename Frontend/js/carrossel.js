const carousel = document.getElementById('carrossel');

const images = carousel.querySelectorAll('img');
let index = 0;



 function autoSlide() {
index++;

// Se chegar na última imagem, volta para a primeira

if (index >= images.length) {
index = 0;
}

// Calcula o deslocamento
const offset = -index * 100;

carousel.style.transform = `translateX(${offset}%)`;
}

// Define o intervalo (3000ms = 3 segundos)

setInterval(autoSlide, 5000);

 function moveSlide (direction) {
     const slides = document.querySelectorAll('.carousel-inner img');

     slides[currentSlide].classList.remove('active');

currentSlide = (currentSlide + direction + slides.length) % slides.length;

slides [currentSlide].classList.add('active');

}
