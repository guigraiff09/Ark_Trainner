document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       CONTROLE DO MENU HAMBÚRGUER
    ========================================== */
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".nav");

    if (menuIcon && navbar) {
        menuIcon.addEventListener("click", () => {
            navbar.classList.toggle("active");
            menuIcon.classList.toggle("bx-x");
        });

        document.querySelectorAll(".nav a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuIcon.classList.remove("bx-x");
            });
        });
    }
    updateSliderPosition();
});

    /* ==========================================
       CONTROLE DO SLIDER DE CARDS (CORRIGIDO)
    ========================================== */
    const containerSlider = document.querySelector('.container-slider');
    const cards = document.querySelectorAll('.card');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    let currentIndex = 0;

    function updateSliderPosition() {
        if (cards.length === 0) return;

        // Pega a largura exata do primeiro card
        const cardWidth = cards[0].offsetWidth;

        // Pega o espaçamento real (gap) configurado no CSS
        const computedStyle = window.getComputedStyle(containerSlider);
        const gap = parseFloat(computedStyle.gap) || 0;

        // Calcula o deslocamento com base no índice atual
        const moveDistance = currentIndex * (cardWidth + gap);
        
        containerSlider.style.transform = `translateX(-${moveDistance}px)`;
    }

    // Evento para o botão de Avançar (Próximo)
    nextButton.addEventListener('click', () => {
        // O limite agora é baseado estritamente na quantidade total de cards (-1 para bater com o índice 0)
        const maxIndex = cards.length - 1; 
        
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Força voltar exatamente para o PRIMEIRO card da lista
        }
        updateSliderPosition();
    });

    // Evento para o botão de Voltar (Anterior)
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--; // Retrocede normalmente card por card
        } else {
            // Se estiver no primeiro card, bloqueia e não faz nada (não vai para o último)
            return; 
        }
        updateSliderPosition();
    });

    // Recalcula o alinhamento caso a tela mude de tamanho ou mude a orientação do celular
    window.addEventListener('resize', updateSliderPosition);


