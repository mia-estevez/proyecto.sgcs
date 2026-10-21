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


    // =========================================
    // ABRIR / CERRAR MENÚ PRINCIPAL
    // =========================================

    botonMenu.addEventListener("click", function (evento) {

        evento.stopPropagation();

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

            // Evita que el clic cierre el menú principal
            evento.stopPropagation();

            // Abrir / cerrar submenu
            submenuCalidad.classList.toggle("activo");

            // Girar la flecha
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


    const hashActual =
        window.location.hash;


    // Enlace principal de Gestión
    const enlaceGestion =
        document.querySelector(".menu-calidad-principal");


    let perteneceAGestionCalidad = false;


    enlacesMenu.forEach(function (enlace) {

        const urlEnlace =
            new URL(enlace.href);


        const rutaEnlace =
            urlEnlace.pathname;


        const hashEnlace =
            urlEnlace.hash;


        // =========================================
        // COMPROBAR PÁGINA Y SECCIÓN
        // =========================================

        if (
            rutaEnlace === paginaActual &&
            hashEnlace === hashActual
        ) {

            enlace.classList.add("pagina-activa");


            // =========================================
            // SI ES UNA SECCIÓN DE GESTIÓN
            // =========================================

            if (
                hashEnlace === "#fundamentos" ||
                hashEnlace === "#tecnicas" ||
                hashEnlace === "#herramientas"
            ) {

                perteneceAGestionCalidad = true;

            }

        }

    });


    // =========================================
    // MARCAR GESTIÓN DE LA CALIDAD
    // =========================================

    if (
        perteneceAGestionCalidad &&
        enlaceGestion
    ) {

        enlaceGestion.classList.add("pagina-activa");

    }


    // =========================================
    // SI ESTAMOS EN CALIDAD.HTML
    // MARCAR GESTIÓN PRINCIPAL
    // =========================================

    if (
        paginaActual.endsWith("/paginas/calidad.html") &&
        enlaceGestion
    ) {

        enlaceGestion.classList.add("pagina-activa");

    }

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


// =========================================
// TARJETAS INTERACTIVAS
// CAJA NEGRA / CAJA BLANCA
// =========================================

const tarjetasFlip =
    document.querySelectorAll(".flip-card");


tarjetasFlip.forEach(function (tarjeta) {

    tarjeta.addEventListener("click", function () {

        tarjeta.classList.toggle("activa");

    });

});


// =========================================
// FILTROS - HERRAMIENTAS DE CALIDAD
// =========================================

const botonesFiltro =
    document.querySelectorAll(".filtro-herramienta");


const herramientas =
    document.querySelectorAll(".herramienta-card");


botonesFiltro.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const filtro =
            boton.getAttribute("data-filtro");


        // =========================================
        // MARCAR FILTRO ACTIVO
        // =========================================

        botonesFiltro.forEach(function (otroBoton) {

            otroBoton.classList.remove("activo");

        });


        boton.classList.add("activo");


        // =========================================
        // MOSTRAR / OCULTAR HERRAMIENTAS
        // =========================================

        herramientas.forEach(function (herramienta) {

            const categoria =
                herramienta.getAttribute("data-categoria");


            if (
                filtro === "todas" ||
                categoria === filtro
            ) {

                herramienta.classList.remove("oculta");

            } else {

                herramienta.classList.add("oculta");

            }

        });

    });

});


// =========================================
// FLIP CARD - MÉTRICAS
// =========================================

const tarjetasMetrica =
    document.querySelectorAll(".flip-metrica");


tarjetasMetrica.forEach(function (tarjeta) {

    tarjeta.addEventListener("click", function () {

        tarjeta.classList.toggle("activa");

    });

});

// =========================================
// NIVELES DE PRUEBA
// =========================================

const nivelesPrueba =
    document.querySelectorAll(".nivel-prueba");


nivelesPrueba.forEach(function (nivel) {

    const boton =
        nivel.querySelector(".nivel-prueba-boton");


    boton.addEventListener("click", function () {

        const estabaAbierto =
            nivel.classList.contains("activo");


        // Cerramos todos los niveles

        nivelesPrueba.forEach(function (otroNivel) {

            otroNivel.classList.remove("activo");

        });


        // Si estaba cerrado, lo abrimos

        if (!estabaAbierto) {

            nivel.classList.add("activo");

        }

    });

});



/* =========================================
   ANIMACIÓN Y FLIP DE LAS ETAPAS DEL SDLC
========================================= */

const etapasSDLC = document.querySelectorAll(".tarjeta-etapa");

// ANIMACIÓN AL HACER SCROLL

if ("IntersectionObserver" in window) {

    const observadorEtapas = new IntersectionObserver(
        function (entradas, observador) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observador.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    etapasSDLC.forEach(function (etapa) {
        observadorEtapas.observe(etapa);
    });

} else {

    etapasSDLC.forEach(function (etapa) {
        etapa.classList.add("visible");
    });

}

// GIRAR LAS TARJETAS AL HACER CLIC

etapasSDLC.forEach(function (etapa) {

    function girarTarjeta() {
        const estaGirada = etapa.classList.toggle("girada");

        etapa.setAttribute("aria-pressed", estaGirada);

        etapa.setAttribute(
            "aria-label",
            estaGirada
                ? "Ocultar información de la etapa"
                : "Mostrar información de la etapa"
        );
    }

    etapa.addEventListener("click", girarTarjeta);

    // Permitir la interacción con Enter y la barra espaciadora
    etapa.addEventListener("keydown", function (evento) {

        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            girarTarjeta();
        }

    });

});


document.querySelectorAll(".detalle-metodologias").forEach((seccion) => {
    const botones = seccion.querySelectorAll(".boton-agil");
    const tarjetas = seccion.querySelectorAll(".metodologia-card");

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const seleccionada = boton.dataset.metodologia;

            botones.forEach((otroBoton) => {
                const activo = otroBoton === boton;
                otroBoton.classList.toggle("activo", activo);
                otroBoton.setAttribute("aria-pressed", String(activo));
            });

            tarjetas.forEach((tarjeta) => {
                const mostrar = tarjeta.id === `metodologia-${seleccionada}`;
                tarjeta.hidden = !mostrar;
                tarjeta.classList.toggle("activa", mostrar);
            });
        });
    });
});

