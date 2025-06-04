document.addEventListener("DOMContentLoaded", function () {
    // --- LÓGICA PARA EL MENÚ DE NAVEGACIÓN (HAMBURGUESA) ---
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const mainContentForMenuClose = document.querySelector('main'); // Para cerrar el menú al hacer clic en el main

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation(); // Evita que el clic en el botón se propague al body/document
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

        // Opcional: Cerrar menú al hacer clic en un enlace del menú (para SPAs o si el menú ocupa toda la pantalla)
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

    // --- LÓGICA PARA MOSTRAR/OCULTAR LA CARD DE CONTACTOS ---
    const toggleCardButton = document.getElementById("toggle-card-button");
    const contactCard = document.getElementById("contact-card"); // Asumo que este es el div .card dentro de .redes-sociales-section

    if (toggleCardButton && contactCard) {
        toggleCardButton.addEventListener("click", function () {
            contactCard.classList.toggle("visible");
            // Esta clase es para cambiar la dirección de la flecha en el botón
            toggleCardButton.classList.toggle("card-is-visible");
        });
    } else {
        // Verifica si el problema es que contactCard no es el correcto.
        // El ID 'contact-card' está en el div .card de .redes-sociales-section
        console.warn(
            "Elementos de la card de redes sociales no encontrados: #toggle-card-button o el div con ID #contact-card"
        );
    }

    // --- CÓDIGO PARA EL LIGHTBOX DE IMÁGENES ---
    // ... (tu código del lightbox se mantiene igual que en la respuesta anterior) ...
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeButton = document.querySelector(".lightbox-close-button");

    const galleryItems = document.querySelectorAll(".dibujo-item");
    let currentImageIndex = 0;
    const imagesData = [];

    if (!lightbox || !lightboxImg || !lightboxCaption || !closeButton) {
        console.warn("Uno o más elementos del lightbox no fueron encontrados. El lightbox no funcionará.");
        // return; // No hacemos return aquí para que el resto del script pueda ejecutarse
    } else {
        // Recopilar datos de las imágenes solo si los elementos del lightbox existen
        if (galleryItems.length > 0) {
            galleryItems.forEach((item, index) => {
                const img = item.querySelector("img");
                const captionElement = item.querySelector("figcaption");

                if (img) {
                    const imgSrc = img.src;
                    const imgCaption = captionElement ? captionElement.textContent : img.alt;
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
            document.body.style.overflow = "hidden";
        }

        function closeLightbox() {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        }

        closeButton.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        window.changeImage = function (direction) {
            if (imagesData.length === 0) return;
            currentImageIndex += direction;
            if (currentImageIndex >= imagesData.length) {
                currentImageIndex = 0;
            } else if (currentImageIndex < 0) {
                currentImageIndex = imagesData.length - 1;
            }
            if (imagesData[currentImageIndex]) {
                lightboxImg.src = imagesData[currentImageIndex].src;
                lightboxCaption.textContent = imagesData[currentImageIndex].caption;
            }
        };

        document.addEventListener("keydown", function (e) {
            if (lightbox.style.display === "block") {
                if (e.key === "ArrowRight" || e.key === "Right") {
                    window.changeImage(1);
                } else if (e.key === "ArrowLeft" || e.key === "Left") {
                    window.changeImage(-1);
                } else if (e.key === "Escape") {
                    closeLightbox();
                }
            }
        });
    } // Cierre del else para el lightbox

    // --- FIN CÓDIGO LIGHTBOX ---

}); // FIN DEL ÚNICO DOMContentLoaded


// --- FUNCION triggerEmailSend (se mantiene igual) ---
function triggerEmailSend() {
    const userMessageContentElement = document.getElementById('mensaje_correo');
    let userMessageContent = "";

    if (userMessageContentElement) {
        userMessageContent = userMessageContentElement.value;
    } else {
        console.error("El elemento del cuerpo del mensaje (ID: mensaje_correo) no fue encontrado.");
        return;
    }

    const emailRecipient = 'king220811@gmail.com';
    const senderNameElement = document.getElementById('nombre_remitente');
    const subjectElement = document.getElementById('asunto_correo');

    let senderName = senderNameElement ? senderNameElement.value : "No especificado";
    let emailSubject = subjectElement ? subjectElement.value : "Consulta desde la web";

    const mailtoUri = `mailto:${emailRecipient}?subject=${encodeURIComponent(emailSubject + " (de " + senderName + ")")}&body=${encodeURIComponent(userMessageContent)}`;
    window.location.href = mailtoUri;
}
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById('contact-form-to-king');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            triggerEmailSend();
        });
    }
});
