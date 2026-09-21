// =========================================
// CARGAR NAVBAR Y FOOTER
// =========================================

const navbar = document.getElementById("navbar");
const footer = document.getElementById("footer");

// Detectar desde qué carpeta se está ejecutando
const rutaBase = window.location.pathname.includes("/paginas/")
    ? "../"
    : "./";


// =========================================
// CARGAR NAVBAR
// =========================================

if (navbar) {

    fetch(rutaBase + "componentes/navbar.html")
        .then(respuesta => respuesta.text())
        .then(contenido => {

            navbar.innerHTML = contenido;

            // Una vez cargado el navbar,
            // activamos el menú
            activarMenu();

        });

}


// =========================================
// CARGAR FOOTER
// =========================================

if (footer) {

    fetch(rutaBase + "componentes/footer.html")
        .then(respuesta => respuesta.text())
        .then(contenido => {

            footer.innerHTML = contenido;

        });

}


// =========================================
// MENÚ PRINCIPAL
// =========================================

function activarMenu() {

    const botonMenu =
        document.getElementById("menu-btn");

    const menuDesplegable =
        document.getElementById("menu-desplegable");


    botonMenu.addEventListener("click", function () {

        if (menuDesplegable.style.display === "block") {

            menuDesplegable.style.display = "none";

        } else {

            menuDesplegable.style.display = "block";

        }

    });


    // =========================================
    // SUBMENÚ - GESTIÓN DE LA CALIDAD
    // =========================================

    const botonSubmenu =
        document.getElementById("submenu-calidad-btn");

    const submenuCalidad =
        document.getElementById("submenu-calidad");


    if (botonSubmenu && submenuCalidad) {

        botonSubmenu.addEventListener("click", function (evento) {

            evento.stopPropagation();

            submenuCalidad.classList.toggle("activo");

            botonSubmenu.classList.toggle("activo");

        });

    }


    // =========================================
    // CERRAR MENÚ AL HACER CLIC AFUERA
    // =========================================

    document.addEventListener("click", function (evento) {

        if (
            !botonMenu.contains(evento.target) &&
            !menuDesplegable.contains(evento.target)
        ) {

            menuDesplegable.style.display = "none";

        }

    });

}


// =========================================
// ACORDEÓN ISO 9126 / ISO 25000
// =========================================

const acordeones =
    document.querySelectorAll(".acordeon-calidad");


acordeones.forEach(function (acordeon) {

    const boton =
        acordeon.querySelector(".acordeon-titulo");


    boton.addEventListener("click", function () {

        const estabaAbierto =
            acordeon.classList.contains("activo");


        // Cerramos todos

        acordeones.forEach(function (otroAcordeon) {

            otroAcordeon.classList.remove("activo");

        });


        // Abrimos la seleccionada

        if (!estabaAbierto) {

            acordeon.classList.add("activo");

        }

    });

});