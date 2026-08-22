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
       CONTROLE DO SLIDER DE CARDS
    ========================================== */

    const containerSlider =
        document.querySelector(".container-slider");

    const cards =
        document.querySelectorAll(".card");

    const prevButton =
        document.getElementById("prev-button");

    const nextButton =
        document.getElementById("next-button");


    /* Verifica se o carrossel existe */

    if (
        !containerSlider ||
        cards.length === 0 ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }


    let currentIndex = 0;


    /* ==========================================
       QUANTIDADE DE CARDS VISÍVEIS
    ========================================== */

    function getVisibleCards() {

        const screenWidth = window.innerWidth;


        /* CELULAR */

        if (screenWidth <= 600) {

            return 1;

        }


        /* TABLET / NOTEBOOK MENOR */

        if (screenWidth <= 1200) {

            return 2;

        }


        /* COMPUTADOR */

        return 3;
    }


    /* ==========================================
       ATUALIZA POSIÇÃO DO SLIDER
    ========================================== */

    function updateSliderPosition() {

        if (cards.length === 0) {
            return;
        }


        /* Largura real do card */

        const cardWidth =
            cards[0].offsetWidth;


        /* Espaçamento entre os cards */

        const computedStyle =
            window.getComputedStyle(containerSlider);

        const gap =
            parseFloat(computedStyle.gap) || 0;


        /* Quantidade de cards visíveis */

        const visibleCards =
            getVisibleCards();


        /* Última posição possível */

        const maxIndex =
            Math.max(
                0,
                cards.length - visibleCards
            );


        /* Evita ultrapassar o último card */

        if (currentIndex > maxIndex) {

            currentIndex = maxIndex;

        }


        /* Calcula quanto o slider deve andar */

        const moveDistance =
            currentIndex *
            (cardWidth + gap);


        /* Move os cards */

        containerSlider.style.transform =
            `translateX(-${moveDistance}px)`;

    }


    /* ==========================================
       BOTÃO PRÓXIMO
    ========================================== */

    nextButton.addEventListener("click", () => {

        const visibleCards =
            getVisibleCards();


        const maxIndex =
            Math.max(
                0,
                cards.length - visibleCards
            );


        /* Se ainda não chegou ao final */

        if (currentIndex < maxIndex) {

            currentIndex++;

        }

        /* Se chegou ao final,
           volta para o primeiro */

        else {

            currentIndex = 0;

        }


        updateSliderPosition();

    });


    /* ==========================================
       BOTÃO ANTERIOR
    ========================================== */

    prevButton.addEventListener("click", () => {

        const visibleCards =
            getVisibleCards();


        const maxIndex =
            Math.max(
                0,
                cards.length - visibleCards
            );


        /* Se não está no primeiro */

        if (currentIndex > 0) {

            currentIndex--;

        }

        /* Se está no primeiro,
           vai para o último conjunto */

        else {

            currentIndex = maxIndex;

        }


        updateSliderPosition();

    });


    /* ==========================================
       REDIMENSIONAMENTO DA TELA
    ========================================== */

    window.addEventListener("resize", () => {

        updateSliderPosition();

    });


    /* ==========================================
       POSIÇÃO INICIAL
    ========================================== */

    updateSliderPosition();


