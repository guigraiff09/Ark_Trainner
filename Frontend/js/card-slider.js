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

        containerSlider.addEventListener("transitionend", function handlePrev() {
            containerSlider.removeEventListener("transitionend", handlePrev);
            isMoving = false;
        });
    });
});