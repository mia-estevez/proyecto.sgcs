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

            // Configurar las rutas del navbar
            configurarRutasNavbar();

            // Una vez cargado el navbar,
            // activamos el menú
            activarMenu();

        });

}


// =========================================
// CONFIGURAR RUTAS DEL NAVBAR
// =========================================

function configurarRutasNavbar() {

    const enlaces =
        document.querySelectorAll("[data-ruta]");


    enlaces.forEach(function (enlace) {

        const ruta =
            enlace.getAttribute("data-ruta");


        enlace.href =
            rutaBase + ruta;

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


    if (!botonMenu || !menuDesplegable) {
        return;
    }


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


    // =========================================
    // MARCAR PÁGINA ACTUAL
    // =========================================

    const enlacesMenu =
        document.querySelectorAll(".menu-desplegable a");

    const paginaActual =
        window.location.pathname;


    enlacesMenu.forEach(function (enlace) {

        const rutaEnlace =
            new URL(enlace.href).pathname;


        if (rutaEnlace === paginaActual) {

            enlace.classList.add("pagina-activa");

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


    acordeon.addEventListener("click", function () {

        const estabaAbierto =
            acordeon.classList.contains("activo");


        // Cerramos todas

        acordeones.forEach(function (otroAcordeon) {

            otroAcordeon.classList.remove("activo");

        });


        // Si estaba cerrado, lo abrimos

        if (!estabaAbierto) {

            acordeon.classList.add("activo");

        }

    });

});