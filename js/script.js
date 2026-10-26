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

//MOSTRAR SEGUN QUE APRIETES METODOLOGIAS
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


 // MOSTRAR EL MODELO SELECCIONADO
document.querySelectorAll(".modelos-tradicionales").forEach((seccion) => {
    const botones = seccion.querySelectorAll(".boton-modelo");
    const modelos = seccion.querySelectorAll(".modelo-desarrollo");

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
            const seleccionado = boton.dataset.modelo;

            botones.forEach((otroBoton) => {
                const activo = otroBoton === boton;
                otroBoton.classList.toggle("activo", activo);
                otroBoton.setAttribute("aria-pressed", String(activo));
            });

            modelos.forEach((modelo) => {
                const mostrar = modelo.id === `modelo-${seleccionado}`;
                modelo.hidden = !mostrar;
                modelo.classList.toggle("activa", mostrar);
            });
        });
    });
});



 // GRAFICOS DE MODELOS TRADICIONALES
document.addEventListener("DOMContentLoaded", () => {
    const visorModelo = document.querySelector("#visor-modelo");

    if (!visorModelo) {
        console.warn("No se encontró el visor de modelos.");
        return;
    }

    const imagenAmpliada = visorModelo.querySelector("figure img");
    const pieImagen = visorModelo.querySelector("figcaption");
    const botonCerrar = visorModelo.querySelector(".cerrar-visor-modelo");

    document.querySelectorAll(".lightbox-modelo").forEach((enlace) => {
        enlace.addEventListener("click", (evento) => {
            evento.preventDefault();
            evento.stopPropagation();

            const imagen = enlace.querySelector("img");

            imagenAmpliada.src = enlace.href;
            imagenAmpliada.alt = imagen.alt;
            pieImagen.textContent = enlace.dataset.pie || imagen.alt;
            visorModelo.hidden = false;
        });
    });

    function cerrarVisor() {
        visorModelo.hidden = true;
        imagenAmpliada.src = "";
    }

    botonCerrar.addEventListener("click", cerrarVisor);

    visorModelo.addEventListener("click", (evento) => {
        if (evento.target === visorModelo) {
            cerrarVisor();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && !visorModelo.hidden) {
            cerrarVisor();
        }
    });

    console.log("Lightbox de modelos inicializado correctamente.");
});

// =========================================
// METODOLOGÍAS ÁGILES: INTERACCIONES
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const paginaAgil = document.querySelector(".pagina-metodologias");

    // Si no estamos en la página de Metodologías Ágiles,
    // no ejecutamos este bloque.
    if (!paginaAgil) return;


    // =========================================
    // SCRUM: CAMBIAR CONTENIDO
    // =========================================

    const botonesScrum =
        paginaAgil.querySelectorAll("[data-seccion-scrum]");

    const panelesScrum =
        paginaAgil.querySelectorAll(".contenido-scrum-seleccionado");

    botonesScrum.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const seleccion = boton.dataset.seccionScrum;

            botonesScrum.forEach(function (otro) {

                const activo = otro === boton;

                otro.classList.toggle("activa", activo);
                otro.setAttribute("aria-pressed", String(activo));

            });

            panelesScrum.forEach(function (panel) {

                panel.hidden = panel.id !== `scrum-${seleccion}`;

            });

        });

    });


    // =========================================
    // SCRUM: INFORMACIÓN DE LOS EVENTOS
    // =========================================

    const datosEventos = {

        planning: {
            titulo: "Sprint Planning — Planificación",
            duracion:
                "Duración sugerida: hasta 8 horas para un Sprint de un mes; para Sprints más cortos suele durar menos.",
            objetivo:
                "Definir por qué el Sprint es valioso, qué se puede completar y cómo se realizará el trabajo."
        },

        daily: {
            titulo: "Daily Scrum",
            duracion: "Duración: 15 minutos.",
            objetivo:
                "Sincronizar al equipo, revisar avances hacia el objetivo del Sprint, identificar impedimentos y ajustar el plan de trabajo del día."
        },

        review: {
            titulo: "Sprint Review — Revisión",
            duracion:
                "Duración sugerida: hasta 4 horas para un Sprint de un mes; para Sprints más cortos suele durar menos.",
            objetivo:
                "Inspeccionar el resultado del Sprint junto con las partes interesadas y conversar sobre los próximos pasos."
        },

        retro: {
            titulo: "Sprint Retrospective — Retrospectiva",
            duracion:
                "Duración sugerida: hasta 3 horas para un Sprint de un mes; para Sprints más cortos suele durar menos.",
            objetivo:
                "Identificar mejoras en la calidad, la colaboración y la forma de trabajar para aplicarlas en el siguiente Sprint."
        }

    };


    const botonesEvento =
        paginaAgil.querySelectorAll("[data-evento]");

    const panelEvento =
        paginaAgil.querySelector("#informacion-evento");

    const detalleEvento =
        paginaAgil.querySelector("#detalle-evento");

    const cerrarEvento =
        paginaAgil.querySelector(".cerrar-informacion-evento");


    function seleccionarEvento(boton) {

        const dato = datosEventos[boton.dataset.evento];

        if (!dato || !panelEvento || !detalleEvento) return;

        detalleEvento.innerHTML = `
            <h3>${dato.titulo}</h3>
            <p><strong>${dato.duracion}</strong></p>
            <p><strong>Objetivo:</strong> ${dato.objetivo}</p>
        `;

        panelEvento.hidden = false;

        botonesEvento.forEach(function (otro) {

            const activo = otro === boton;

            otro.classList.toggle("seleccionado", activo);
            otro.setAttribute("aria-pressed", String(activo));

        });

    }


    botonesEvento.forEach(function (boton) {

        boton.addEventListener("click", function () {
            seleccionarEvento(boton);
        });

    });


    if (cerrarEvento) {

        cerrarEvento.addEventListener("click", function () {

            panelEvento.hidden = true;

            botonesEvento.forEach(function (boton) {

                boton.classList.remove("seleccionado");
                boton.setAttribute("aria-pressed", "false");

            });

        });

    }


    // =========================================
    // KANBAN: CAMBIAR CONTENIDO
    // =========================================

    const botonesKanban =
        paginaAgil.querySelectorAll("[data-seccion-kanban]");

    const panelesKanban =
        paginaAgil.querySelectorAll(".contenido-kanban-seleccionado");


    botonesKanban.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const seleccion = boton.dataset.seccionKanban;

            botonesKanban.forEach(function (otro) {

                const activo = otro === boton;

                otro.classList.toggle("activa", activo);
                otro.setAttribute("aria-pressed", String(activo));

            });

            panelesKanban.forEach(function (panel) {

                panel.hidden = panel.id !== `kanban-${seleccion}`;

            });

        });

    });



    // =========================================
    // KANBAN: TABLERO, LÍMITE WIP Y MÓVIL
    // =========================================

    const columnas = Array.from(
        paginaAgil.querySelectorAll(".columna-kanban")
    );

    const mensajeKanban =
        paginaAgil.querySelector("#mensaje-kanban");

    let tarjetaArrastrada = null;


    // Actualizar contadores de las columnas
    function actualizarContadores() {

        columnas.forEach(function (columna) {

            const tarjetas =
                columna.querySelectorAll(".tarjeta-kanban");

            const contador =
                columna.querySelector(".contador-columna");

            if (!contador) return;

            if (columna.dataset.columna === "proceso") {
                contador.textContent = `${tarjetas.length}/3`;
            } else {
                contador.textContent = String(tarjetas.length);
            }

        });

    }


    // Comprobar si se puede mover una tarea
    function puedeMoverTarjeta(tarjeta, columnaDestino) {

        const contenedorDestino =
            columnaDestino.querySelector(".tarjetas-kanban");

        if (!contenedorDestino) return false;

        const yaEstaEnDestino =
            tarjeta.parentElement === contenedorDestino;

        const limite = Number(columnaDestino.dataset.limite || 0);

        if (
            limite &&
            !yaEstaEnDestino &&
            contenedorDestino.querySelectorAll(".tarjeta-kanban").length >= limite
        ) {

            if (mensajeKanban) {
                mensajeKanban.textContent =
                    "La columna En Proceso alcanzó su límite de 3 tareas (WIP).";
            }

            return false;
        }

        return true;
    }


    // Mover tarea a otra columna
    function moverTarjeta(tarjeta, columnaDestino) {

        if (!tarjeta || !columnaDestino) return;

        if (!puedeMoverTarjeta(tarjeta, columnaDestino)) return;

        const contenedorDestino =
            columnaDestino.querySelector(".tarjetas-kanban");

        contenedorDestino.appendChild(tarjeta);

        actualizarContadores();

        if (mensajeKanban) {

            const tituloColumna =
                columnaDestino.querySelector("h3");

            mensajeKanban.textContent =
                `Tarea movida a "${tituloColumna.textContent.trim()}".`;

        }

    }


    // Crear controles para mover tareas desde celulares
    function actualizarControlesMovimiento(tarjeta) {

        let controles = tarjeta.querySelector(".controles-mover-tarea");

        if (!controles) {

            controles = document.createElement("div");
            controles.className = "controles-mover-tarea";

            const etiqueta = document.createElement("label");
            etiqueta.textContent = "Mover tarea a:";

            const selector = document.createElement("select");
            selector.className = "selector-mover-tarea";
            selector.setAttribute(
                "aria-label",
                "Elegir columna de destino para la tarea"
            );

            [
                ["pendiente", "Por Hacer"],
                ["proceso", "En Proceso"],
                ["hecho", "Hecho"]
            ].forEach(function (opcion) {

                const elemento = document.createElement("option");
                elemento.value = opcion[0];
                elemento.textContent = opcion[1];

                selector.appendChild(elemento);

            });

            const boton = document.createElement("button");
            boton.type = "button";
            boton.className = "boton-mover-tarea";
            boton.textContent = "Mover";

            etiqueta.appendChild(selector);
            controles.append(etiqueta, boton);
            tarjeta.appendChild(controles);

            boton.addEventListener("click", function () {

                const columnaActual =
                    tarjeta.closest(".columna-kanban");

                const destino = columnas.find(function (columna) {
                    return columna.dataset.columna === selector.value;
                });

                if (destino === columnaActual) {

                    if (mensajeKanban) {
                        mensajeKanban.textContent =
                            "La tarea ya está en esa columna.";
                    }

                    return;
                }

                moverTarjeta(tarjeta, destino);

                selector.value = destino
                    ? destino.dataset.columna
                    : "";

            });

        }

        const columnaActual = tarjeta.closest(".columna-kanban");
        const selector = controles.querySelector("select");

        if (columnaActual && selector) {
            selector.value = columnaActual.dataset.columna;
        }

    }


    // Preparar cada tarjeta para arrastrar y mover
    function prepararTarjeta(tarjeta) {

        tarjeta.draggable = true;

        actualizarControlesMovimiento(tarjeta);

        tarjeta.addEventListener("dragstart", function (evento) {

            tarjetaArrastrada = tarjeta;

            tarjeta.classList.add("arrastrando");

            if (evento.dataTransfer) {
                evento.dataTransfer.effectAllowed = "move";
                evento.dataTransfer.setData(
                    "text/plain",
                    tarjeta.textContent.trim()
                );
            }

        });

        tarjeta.addEventListener("dragend", function () {

            tarjeta.classList.remove("arrastrando");

            columnas.forEach(function (columna) {
                columna.classList.remove("arrastrando-sobre");
            });

            tarjetaArrastrada = null;

        });

    }


    // Preparar las tarjetas que ya existen
    paginaAgil.querySelectorAll(".tarjeta-kanban")
        .forEach(prepararTarjeta);


    // Configurar las columnas
    columnas.forEach(function (columna) {

        columna.addEventListener("dragover", function (evento) {

            evento.preventDefault();

            columna.classList.add("arrastrando-sobre");

            if (evento.dataTransfer) {
                evento.dataTransfer.dropEffect = "move";
            }

        });

        columna.addEventListener("dragleave", function (evento) {

            if (!columna.contains(evento.relatedTarget)) {
                columna.classList.remove("arrastrando-sobre");
            }

        });

        columna.addEventListener("drop", function (evento) {

            evento.preventDefault();

            columna.classList.remove("arrastrando-sobre");

            if (!tarjetaArrastrada) return;

            moverTarjeta(tarjetaArrastrada, columna);

        });

    });


    // Inicializar contadores
    actualizarContadores();



    // =========================================
    // KANBAN: AGREGAR NUEVAS TAREAS
    // =========================================

    const formularioTarea =
        paginaAgil.querySelector("#form-nueva-tarea");

    const entradaTarea =
        paginaAgil.querySelector("#nueva-tarea");

    const columnaPendiente =
        paginaAgil.querySelector(
            '[data-columna="pendiente"] .tarjetas-kanban'
        );


    if (formularioTarea && entradaTarea && columnaPendiente) {

        formularioTarea.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const texto = entradaTarea.value.trim();

            if (!texto) return;

            const tarjeta = document.createElement("article");

            tarjeta.className = "tarjeta-kanban";
            tarjeta.textContent = texto;

            prepararTarjeta(tarjeta);

            columnaPendiente.appendChild(tarjeta);

            entradaTarea.value = "";

            actualizarContadores();

            if (mensajeKanban) {

                mensajeKanban.textContent =
                    `Se agregó la tarea "${texto}" en Por Hacer.`;

            }

            entradaTarea.focus();

        });

    }


    // =========================================
    // GLOSARIO: TÉRMINOS Y DEFINICIONES
    // =========================================

    const terminosGlosario = [

        [
            "Adecuación funcional",
            "Que el software proporcione las funciones necesarias y correctamente.",
            "La adecuación funcional evalúa si las funciones disponibles responden a las necesidades previstas."
        ],

        [
            "Agilidad",
            "Capacidad de adaptarse a los cambios y entregar valor de manera frecuente.",
            "La agilidad prioriza la colaboración, la adaptación y la entrega continua de resultados útiles."
        ],

        [
            "Backlog",
            "Lista priorizada de tareas, necesidades y mejoras pendientes.",
            "Es una lista dinámica que se actualiza a medida que se aprende más sobre el producto."
        ],

        [
            "Daily Scrum",
            "Reunión diaria de 15 minutos para sincronizar al equipo Scrum.",
            "El equipo inspecciona el avance hacia el objetivo del Sprint y adapta el plan de trabajo."
        ],

        [
            "Desarrollo incremental",
            "Construcción del producto mediante entregas funcionales sucesivas.",
            "Cada incremento agrega valor al producto y se integra con lo desarrollado anteriormente."
        ],

        [
            "Eficiencia de desempeño",
            "Capacidad de mantener un buen rendimiento usando adecuadamente los recursos.",
            "Considera tiempos de respuesta, uso de recursos y capacidad del sistema."
        ],

        [
            "Empirismo",
            "Enfoque basado en observar la experiencia y tomar decisiones con evidencia.",
            "Scrum se apoya en transparencia, inspección y adaptación."
        ],

        [
            "Entrega continua",
            "Práctica de entregar cambios de software de forma frecuente y confiable.",
            "Busca reducir el tamaño de los cambios y obtener retroalimentación temprano."
        ],

        [
            "Iteración",
            "Período de trabajo en el que se desarrolla y revisa una parte del producto.",
            "Permite recibir comentarios y ajustar el rumbo durante el desarrollo."
        ],

        [
            "Kanban",
            "Método visual para gestionar el flujo de trabajo y limitar tareas en curso.",
            "El tablero permite ver el estado de las tareas, detectar bloqueos y mejorar el flujo."
        ],

        [
            "Límite WIP",
            "Cantidad máxima de tareas permitidas en una etapa de trabajo.",
            "WIP significa Work in Progress; limitarlo ayuda a evitar la sobrecarga y detectar cuellos de botella."
        ],

        [
            "Manifiesto Ágil",
            "Documento que expresa valores y principios del desarrollo ágil de software.",
            "Destaca a las personas, el software funcionando, la colaboración con el cliente y la respuesta al cambio."
        ],

        [
            "Mejora continua",
            "Proceso constante de revisar y perfeccionar la forma de trabajar.",
            "El equipo identifica pequeños cambios que mejoran calidad, eficiencia y colaboración."
        ],

        [
            "Product Backlog",
            "Lista ordenada de todo lo que podría ser necesario en el producto.",
            "El Product Owner es responsable de su gestión y priorización."
        ],

        [
            "Product Owner",
            "Responsable de maximizar el valor del producto y gestionar el Product Backlog.",
            "Comunica necesidades y prioridades para orientar el trabajo del equipo."
        ],

        [
            "Retrospectiva",
            "Evento para analizar cómo trabajó el equipo y definir mejoras.",
            "Se realiza al final del Sprint para acordar acciones que mejoren la calidad y la efectividad."
        ],

        [
            "Scrum",
            "Marco de trabajo ágil para resolver problemas complejos mediante entregas incrementales.",
            "Organiza el trabajo en Sprints y utiliza inspección y adaptación."
        ],

        [
            "Scrum Master",
            "Persona responsable de ayudar a que Scrum se comprenda y aplique correctamente.",
            "Facilita la efectividad del equipo y ayuda a remover impedimentos."
        ],

        [
            "Sprint",
            "Período de duración fija en el que se crea un incremento de producto.",
            "Cada Sprint incluye los eventos de Scrum y busca alcanzar un objetivo definido."
        ],

        [
            "Sprint Planning",
            "Evento donde se planifica el trabajo que se realizará durante el Sprint.",
            "El equipo define el objetivo del Sprint, selecciona trabajo y conversa cómo realizarlo."
        ],

        [
            "Sprint Review",
            "Evento para inspeccionar el resultado del Sprint y definir adaptaciones futuras.",
            "El equipo y las partes interesadas revisan lo logrado y conversan sobre próximos pasos."
        ],

        [
            "Testing",
            "Proceso de evaluar un sistema para encontrar defectos y comprobar requisitos.",
            "Las pruebas aportan información sobre calidad y ayudan a reducir riesgos."
        ],

        [
            "Transparencia",
            "Visibilidad compartida del trabajo, los avances y los problemas.",
            "Permite que quienes participan tomen decisiones basadas en una comprensión común."
        ],

        [
            "Usuario",
            "Persona que utiliza o interactúa con un sistema o producto.",
            "Comprender sus necesidades ayuda a priorizar funciones y evaluar la experiencia."
        ],

        [
            "Valor",
            "Beneficio que un producto o una mejora aporta a sus usuarios o interesados.",
            "La priorización ágil busca entregar primero los resultados de mayor valor."
        ]

    ].map(function (item) {

        return {
            termino: item[0],
            resumen: item[1],
            definicion: item[2]
        };

    });


    // =========================================
    // GLOSARIO: BUSCADOR Y FILTROS
    // =========================================

    const entradaBusqueda =
        paginaAgil.querySelector("#busqueda-glosario");

    const botonLimpiar =
        paginaAgil.querySelector("#limpiar-glosario");

    const filtrosGlosario =
        paginaAgil.querySelector("#filtros-glosario");

    const listaGlosario =
        paginaAgil.querySelector("#lista-glosario");

    const paginacionGlosario =
        paginaAgil.querySelector("#paginacion-glosario");

    const terminosPorPagina = 6;

    let letraActiva = "todos";
    let paginaActualGlosario = 1;


    function normalizar(texto) {

        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("es");

    }


    // Generar el abecedario, incluida la Ñ.

    const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

    alfabeto.forEach(function (letra) {

        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "filtro-letra";
        boton.dataset.letra = letra;
        boton.textContent = letra;

        boton.setAttribute("aria-pressed", "false");

        filtrosGlosario.appendChild(boton);

    });


    function obtenerTerminosFiltrados() {
        const consulta = normalizar(
            entradaBusqueda ? entradaBusqueda.value.trim() : ""
        );

        return terminosGlosario.filter(function (item) {
            const coincideLetra =
                letraActiva === "todos" ||
                normalizar(item.termino)
                    .toUpperCase()
                    .startsWith(letraActiva);

            const nombreTermino = normalizar(item.termino);

            return coincideLetra &&
                (!consulta || nombreTermino.includes(consulta));
        });
    }

    // =========================================
    // GLOSARIO: MOSTRAR RESULTADOS
    // =========================================

    function renderizarGlosario() {

        if (!listaGlosario || !paginacionGlosario) return;

        const filtrados = obtenerTerminosFiltrados();

        const totalPaginas = Math.max(
            1,
            Math.ceil(filtrados.length / terminosPorPagina)
        );

        paginaActualGlosario = Math.min(
            paginaActualGlosario,
            totalPaginas
        );

        const inicio =
            (paginaActualGlosario - 1) * terminosPorPagina;

        const pagina = filtrados.slice(
            inicio,
            inicio + terminosPorPagina
        );

        listaGlosario.innerHTML = "";


        if (!pagina.length) {

            listaGlosario.innerHTML = `
                <p class="sin-resultados">
                    No se encontraron términos.
                    Probá con otra búsqueda o seleccioná «Todos».
                </p>
            `;

        } else {

            pagina.forEach(function (item) {

                const tarjeta = document.createElement("button");

                tarjeta.type = "button";
                tarjeta.className = "termino-glosario";

                tarjeta.setAttribute("aria-expanded", "false");

                tarjeta.innerHTML = `
                    <span class="inicial-glosario" aria-hidden="true">
                        ${item.termino.charAt(0).toLocaleUpperCase("es")}
                    </span>

                    <span class="texto-termino-glosario">
                        <strong>${item.termino}</strong>
                        <span>${item.resumen}</span>
                        <span class="definicion-completa" hidden>
                            ${item.definicion}
                        </span>
                    </span>

                    <i class="fa-solid fa-chevron-right flecha-glosario"
                        aria-hidden="true"></i>
                `;


                tarjeta.addEventListener("click", function () {

                    const expandida =
                        tarjeta.getAttribute("aria-expanded") === "true";

                    tarjeta.setAttribute(
                        "aria-expanded",
                        String(!expandida)
                    );

                    tarjeta.querySelector(
                        ".definicion-completa"
                    ).hidden = expandida;

                });

                listaGlosario.appendChild(tarjeta);

            });

        }


        // Paginación

        paginacionGlosario.innerHTML = "";

        if (totalPaginas > 1) {

            for (
                let numero = 1;
                numero <= totalPaginas;
                numero++
            ) {

                const boton = document.createElement("button");

                boton.type = "button";

                boton.className =
                    "boton-pagina-glosario" +
                    (numero === paginaActualGlosario ? " activo" : "");

                boton.textContent = String(numero);

                boton.setAttribute(
                    "aria-label",
                    `Página ${numero}`
                );

                boton.setAttribute(
                    "aria-current",
                    numero === paginaActualGlosario ? "page" : "false"
                );

                boton.addEventListener("click", function () {

                    paginaActualGlosario = numero;

                    renderizarGlosario();

                });

                paginacionGlosario.appendChild(boton);

            }

        }

    }


    // =========================================
    // GLOSARIO: CLIC EN UNA LETRA
    // =========================================

    if (filtrosGlosario) {

        filtrosGlosario.addEventListener("click", function (evento) {

            const boton = evento.target.closest("[data-letra]");

            if (!boton) return;

            letraActiva = boton.dataset.letra;

            paginaActualGlosario = 1;

            filtrosGlosario.querySelectorAll("[data-letra]")
                .forEach(function (otro) {

                    const activo = otro === boton;

                    otro.classList.toggle("activo", activo);

                    otro.setAttribute(
                        "aria-pressed",
                        String(activo)
                    );

                });

            renderizarGlosario();

        });

    }


    // =========================================
    // GLOSARIO: BUSCADOR
    // =========================================

    if (entradaBusqueda) {

        entradaBusqueda.addEventListener("input", function () {

            paginaActualGlosario = 1;

            renderizarGlosario();

        });

    }


    // =========================================
    // GLOSARIO: LIMPIAR FILTROS
    // =========================================

    if (botonLimpiar) {

        botonLimpiar.addEventListener("click", function () {

            if (entradaBusqueda) {
                entradaBusqueda.value = "";
            }

            letraActiva = "todos";
            paginaActualGlosario = 1;

            filtrosGlosario.querySelectorAll("[data-letra]")
                .forEach(function (boton) {

                    const activo = boton.dataset.letra === "todos";

                    boton.classList.toggle("activo", activo);

                    boton.setAttribute(
                        "aria-pressed",
                        String(activo)
                    );

                });

            renderizarGlosario();

            if (entradaBusqueda) {
                entradaBusqueda.focus();
            }

        });

    }


    // Primera carga del glosario.
    renderizarGlosario();

});