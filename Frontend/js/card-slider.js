// ==========================================================================
// CONTROLE DO SLIDER DE CARDS (RESPONSIVO E DINÂMICO)
// ==========================================================================

const containerSlider = document.querySelector('.container-slider');
const cards = document.querySelectorAll('.card');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentIndex = 0;

function updateSliderPosition() {
    if (cards.length === 0) return;

    // 1. Pega a largura exata de um card atualizado no momento (seja desktop ou mobile)
    const cardWidth = cards[0].offsetWidth;

    // 2. Pega o espaçamento real (gap) configurado no CSS entre os cards
    const computedStyle = window.getComputedStyle(containerSlider);
    const gap = parseFloat(computedStyle.gap) || 0;

    // 3. Calcula o deslocamento perfeito sem deixar sobras ou cortar
    const moveDistance = currentIndex * (cardWidth + gap);
    
    containerSlider.style.transform = `translateX(-${moveDistance}px)`;
}

// Evento para o botão de Avançar (Próximo)
nextButton.addEventListener('click', () => {
    // Evita avançar além do limite de cards disponíveis
    const maxIndex = cards.length - 1; 
    
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0; // Volta para o primeiro se chegar ao fim (Loop opcional)
    }
    updateSliderPosition();
});

// Evento para o botão de Voltar (Anterior)
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = cards.length - 1; // Vai para o último se voltar do primeiro
    }
    updateSliderPosition();
});

// Recalcula o tamanho se o usuário girar o celular ou mudar o tamanho da tela
window.addEventListener('resize', updateSliderPosition);