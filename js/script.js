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