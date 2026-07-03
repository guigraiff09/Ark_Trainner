const slider = document.querySelector('.container-slider');

const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

let currentPosition = 0;

btnNext.addEventListener('click', () => {

    currentPosition -= 350;

    slider.style.transform = `translateX(${currentPosition}px)`;
});

btnPrev.addEventListener('click', () => {

    currentPosition += 350;

    if(currentPosition > 0){
        currentPosition = 0;
    }

    slider.style.transform = `translateX(${currentPosition}px)`;
});