const botonMenu = document.getElementById("menu-btn");
const menuDesplegable = document.getElementById("menu-desplegable");

botonMenu.addEventListener("click", function () {
    if (menuDesplegable.style.display === "block") {
        menuDesplegable.style.display = "none";
    } else {
        menuDesplegable.style.display = "block";
    }
});

document.addEventListener("click", function (evento) {
    if (!botonMenu.contains(evento.target) &&
        !menuDesplegable.contains(evento.target)) {
        
        menuDesplegable.style.display = "none";
    }
});

// =========================================
// ACORDEÓN DE ISO 9126 / ISO 25000
// =========================================

const acordeones = document.querySelectorAll(".acordeon-calidad");

acordeones.forEach(function (acordeon) {

    const boton = acordeon.querySelector(".acordeon-titulo");

    boton.addEventListener("click", function () {

        // Verificamos si esta tarjeta ya está abierta
        const estabaAbierto = acordeon.classList.contains("activo");

        // Cerramos todas las tarjetas
        acordeones.forEach(function (otroAcordeon) {
            otroAcordeon.classList.remove("activo");
        });

        // Si estaba cerrada, la abrimos
        if (!estabaAbierto) {
            acordeon.classList.add("activo");
        }

    });

});