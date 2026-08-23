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

    /* ==========================================
       CONTROLE DO SLIDER (DOM REORDERING)
    ========================================== */
    const containerSlider = document.querySelector(".container-slider");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    if (!containerSlider || !prevButton || !nextButton) return;

    let isMoving = false;

    function getStepWidth() {
        const firstCard = containerSlider.querySelector(".card");
        if (!firstCard) return 0;
        const cardWidth = firstCard.offsetWidth;
        const computedStyle = window.getComputedStyle(containerSlider);
        const gap = parseFloat(computedStyle.gap) || 0;
        return cardWidth + gap;
    }

    /* AVANÇAR (NEXT) */
    nextButton.addEventListener("click", () => {
        if (isMoving) return;
        isMoving = true;

        const step = getStepWidth();
        containerSlider.style.transition = "transform 0.4s ease-in-out";
        containerSlider.style.transform = `translateX(-${step}px)`;

        containerSlider.addEventListener("transitionend", function handleNext() {
            containerSlider.removeEventListener("transitionend", handleNext);
            containerSlider.style.transition = "none";
            // Move o primeiro card para o final do container no DOM
            containerSlider.appendChild(containerSlider.firstElementChild);
            containerSlider.style.transform = "translateX(0)";
            setTimeout(() => { isMoving = false; }, 50);
        });
    });

    /* VOLTAR (PREV) */
    prevButton.addEventListener("click", () => {
        if (isMoving) return;
        isMoving = true;

        const step = getStepWidth();
        // Mover o último card para antes do primeiro sem animação
        containerSlider.style.transition = "none";
        containerSlider.insertBefore(containerSlider.lastElementChild, containerSlider.firstElementChild);
        containerSlider.style.transform = `translateX(-${step}px)`;

        // Força o navegador a reconhecer a nova posição antes de animar
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                containerSlider.style.transition = "transform 0.4s ease-in-out";
                containerSlider.style.transform = "translateX(0)";
            });
        });

<<<<<<< HEAD
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


=======
        containerSlider.addEventListener("transitionend", function handlePrev() {
            containerSlider.removeEventListener("transitionend", handlePrev);
            isMoving = false;
        });
    });
});
>>>>>>> dev
