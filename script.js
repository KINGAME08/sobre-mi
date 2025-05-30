document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const toggleCardButton = document.getElementById("toggle-card-button");
    const contactCard = document.getElementById("contact-card");

    // Lógica para el menú de navegación (hamburguesa)
    if (menuToggle && menu) {
        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("active");
        });
    } else {
        console.warn("Elementos del menú no encontrados: #menu-toggle o #menu");
    }

    // Lógica para mostrar/ocultar la card de contactos
    if (toggleCardButton && contactCard) {
        toggleCardButton.addEventListener("click", function () {
            contactCard.classList.toggle("visible");
            // Añadir/quitar clase al botón para cambiar la dirección de la flecha (vía CSS)
            toggleCardButton.classList.toggle("card-is-visible"); 
        });
    } else {
        console.warn("Elementos de la card no encontrados: #toggle-card-button o #contact-card");
    }
});
function triggerEmailSend() {
    const userMessageContent = document.getElementById('userEmailBody').value;
    const emailRecipient = 'king220811@gmail.com';
    const emailSubject = encodeURIComponent('Consulta desde la web: Mi Mensaje');

    const mailtoUri = `mailto:${emailRecipient}?subject=${emailSubject}&body=${encodeURIComponent(userMessageContent)}`;

    window.location.href = mailtoUri;
}
