document.addEventListener("DOMContentLoaded", function () {
    // --- LÓGICA PARA EL MENÚ DE NAVEGACIÓN (HAMBURGUESA) ---
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    // const mainContentForMenuClose = document.querySelector('main'); // No se está usando

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation(); // Evita que el clic en el botón se propague
            menu.classList.toggle("active");
        });

        // Cerrar menú si se hace clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = menu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (menu.classList.contains('active') && !isClickInsideMenu && !isClickOnToggle) {
                menu.classList.remove('active');
            }
        });

        // Cerrar menú al hacer clic en un enlace del menú
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                }
            });
        });

    } else {
        console.warn("Elementos del menú no encontrados: #menu-toggle o #menu");
    }

    // --- LÓGICA PARA MOSTRAR/OCULTAR LA CARD DE CONTACTOS (REDES SOCIALES) ---
    const toggleCardButton = document.getElementById("toggle-card-button");
    const contactCard = document.getElementById("contact-card");

    if (toggleCardButton && contactCard) {
        toggleCardButton.addEventListener("click", function () {
            contactCard.classList.toggle("visible");
            toggleCardButton.classList.toggle("card-is-visible"); // Para cambiar la flecha del botón
        });
    } else {
        console.warn(
            "Elementos de la card de redes sociales no encontrados: #toggle-card-button o #contact-card"
        );
    }

    // --- CÓDIGO PARA EL LIGHTBOX DE IMÁGENES ---
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeButtonLightbox = document.querySelector(".lightbox-close-button"); // Renombrado para evitar colisión

    const galleryItems = document.querySelectorAll(".dibujo-item");
    let currentImageIndex = 0;
    const imagesData = []; // Array para almacenar src y caption de imágenes

    if (!lightbox || !lightboxImg || !lightboxCaption || !closeButtonLightbox) {
        console.warn("Uno o más elementos del lightbox no fueron encontrados. El lightbox no funcionará.");
    } else {
        // Recopilar datos de las imágenes
        if (galleryItems.length > 0) {
            galleryItems.forEach((item, index) => {
                const img = item.querySelector("img");
                const captionElement = item.querySelector("figcaption");

                if (img) {
                    const imgSrc = img.src;
                    const imgCaption = captionElement ? captionElement.textContent : img.alt || "Sin descripción";
                    imagesData.push({ src: imgSrc, caption: imgCaption });

                    img.addEventListener("click", () => {
                        openLightbox(index);
                    });
                }
            });
        } else {
            console.warn("No se encontraron items en la galería '.dibujo-item'.");
        }

        function openLightbox(index) {
            if (imagesData.length === 0 || index < 0 || index >= imagesData.length) return;

            currentImageIndex = index;
            lightboxImg.src = imagesData[currentImageIndex].src;
            lightboxCaption.textContent = imagesData[currentImageIndex].caption;
            lightbox.style.display = "block";
            document.body.style.overflow = "hidden"; // Evitar scroll del fondo
        }

        function closeLightbox() {
            if (lightbox) { // Chequeo extra
                lightbox.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }

        closeButtonLightbox.addEventListener("click", closeLightbox);

        // Cerrar lightbox al hacer clic fuera de la imagen
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) { // Si el clic es sobre el fondo del lightbox
                closeLightbox();
            }
        });

        // Función global para los botones de navegación del lightbox en el HTML
        window.changeImage = function (direction) {
            if (imagesData.length === 0) return;
            currentImageIndex += direction;
            if (currentImageIndex >= imagesData.length) {
                currentImageIndex = 0; // Vuelve al inicio
            } else if (currentImageIndex < 0) {
                currentImageIndex = imagesData.length - 1; // Va al final
            }
            if (imagesData[currentImageIndex]) { // Asegurarse que el índice es válido
                lightboxImg.src = imagesData[currentImageIndex].src;
                lightboxCaption.textContent = imagesData[currentImageIndex].caption;
            }
        };

        // Navegación con teclado para el lightbox
        document.addEventListener("keydown", function (e) {
            if (lightbox && lightbox.style.display === "block") { // Solo si el lightbox está visible
                if (e.key === "ArrowRight" || e.key === "Right") {
                    window.changeImage(1);
                } else if (e.key === "ArrowLeft" || e.key === "Left") {
                    window.changeImage(-1);
                } else if (e.key === "Escape") {
                    closeLightbox();
                }
            }
        });
    }
    // --- FIN CÓDIGO LIGHTBOX ---


    // --- INICIO CÓDIGO PARA EL NUEVO MODAL DE CONTACTO (FORMSUBMIT) ---
    const openModalBtn = document.getElementById('open-contact-form-btn');
    const closeModalBtn = document.getElementById('close-contact-modal-btn');
    const contactModal = document.getElementById('contact-form-modal');
    const contactFormForSubmit = document.getElementById('contact-form'); // El formulario dentro del modal
    const emailInput = document.getElementById('contact-email');
    const emailError = document.querySelector('.email-validation-error');
    const messageTextarea = document.getElementById('contact-message');
    const charCountSpan = document.getElementById('message-char-count');
    
    const maxChars = messageTextarea ? parseInt(messageTextarea.getAttribute('maxlength')) : 0;

    if (openModalBtn && contactModal) {
        openModalBtn.addEventListener('click', () => {
            contactModal.classList.add('visible');
            document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
        });
    }

    function hideModal() {
        if (contactModal) {
            contactModal.classList.remove('visible');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideModal);
    }

    // Cerrar modal al hacer clic fuera del contenido del modal
    if (contactModal) {
        contactModal.addEventListener('click', (event) => {
            if (event.target === contactModal) { 
                hideModal();
            }
        });
    }
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && contactModal && contactModal.classList.contains('visible')) {
            hideModal();
        }
    });

    // Validación de formato de email
    function isValidEmail(email) {    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple
        return emailRegex.test(email);
    }

    if (emailInput && emailError) {
        emailInput.addEventListener('input', () => {
            if (emailInput.value === '' || isValidEmail(emailInput.value)) {
                emailError.style.display = 'none';
                emailInput.style.borderColor = ''; // Restablece al estilo por defecto
            } else {
                emailError.style.display = 'block';
                emailInput.style.borderColor = 'red'; 
            }
        });
    }

    // Contador de caracteres para el textarea
    if (messageTextarea && charCountSpan && maxChars > 0) {
        messageTextarea.addEventListener('input', () => {
            const currentLength = messageTextarea.value.length;
            charCountSpan.textContent = currentLength;
            if (currentLength > maxChars) {
                charCountSpan.parentElement.style.color = 'red'; // O aplicar una clase de error
            } else {
                charCountSpan.parentElement.style.color = ''; // Restablece
            }
        });
        // Inicializar contador al cargar la página (si hay texto pre-cargado)
        if (charCountSpan) charCountSpan.textContent = messageTextarea.value.length;
    }
   
    // Prevenir envío del formulario si el email no es válido
    if (contactFormForSubmit && emailInput) {
        contactFormForSubmit.addEventListener('submit', function(event) {
            if (!isValidEmail(emailInput.value)) {
                event.preventDefault(); // Detiene el envío del formulario
                if(emailError) emailError.style.display = 'block';
                emailInput.style.borderColor = 'red';
                emailInput.focus(); // Pone el foco en el campo de email
                alert('Por favor, introduce una dirección de correo electrónico con formato válido.');
            }
            // Si el email es válido, el formulario se enviará a FormSubmit
        });
    }
    // --- FIN CÓDIGO PARA EL NUEVO MODAL DE CONTACTO ---

}); // FIN DEL ÚNICO DOMContentLoaded
