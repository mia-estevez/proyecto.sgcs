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
            configurarRutasNavbar();
            activarMenu();
        });
}

// =========================================
// CONFIGURAR RUTAS DEL NAVBAR
// =========================================

function configurarRutasNavbar() {
    const enlaces = document.querySelectorAll("[data-ruta]");

    enlaces.forEach(function (enlace) {
        const ruta = enlace.getAttribute("data-ruta");
        enlace.href = rutaBase + ruta;
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
            configurarRutasNavbar();
        });
}

// =========================================
// MENÚ PRINCIPAL
// =========================================

function activarMenu() {
    const botonMenu = document.getElementById("menu-btn");
    const menuDesplegable = document.getElementById("menu-desplegable");

    if (!botonMenu || !menuDesplegable) {
        return;
    }

    // ABRIR / CERRAR MENÚ PRINCIPAL
    botonMenu.addEventListener("click", function (evento) {
        evento.stopPropagation();

        if (menuDesplegable.style.display === "block") {
            menuDesplegable.style.display = "none";
        } else {
            menuDesplegable.style.display = "block";
        }
    });

    // SUBMENÚ - GESTIÓN DE LA CALIDAD
    const botonSubmenu = document.getElementById("submenu-calidad-btn");
    const submenuCalidad = document.getElementById("submenu-calidad");

    if (botonSubmenu && submenuCalidad) {
        botonSubmenu.addEventListener("click", function (evento) {
            evento.stopPropagation();
            submenuCalidad.classList.toggle("activo");
            botonSubmenu.classList.toggle("activo");
        });
    }

    // CERRAR MENÚ AL HACER CLIC AFUERA
    document.addEventListener("click", function (evento) {
        if (
            !botonMenu.contains(evento.target) &&
            !menuDesplegable.contains(evento.target)
        ) {
            menuDesplegable.style.display = "none";
        }
    });

    // MARCAR PÁGINA ACTUAL
    const enlacesMenu = document.querySelectorAll(".menu-desplegable a");
    const paginaActual = window.location.pathname;
    const hashActual = window.location.hash;
    const enlaceGestion = document.querySelector(".menu-calidad-principal");

    let perteneceAGestionCalidad = false;

    enlacesMenu.forEach(function (enlace) {
        const urlEnlace = new URL(enlace.href);
        const rutaEnlace = urlEnlace.pathname;
        const hashEnlace = urlEnlace.hash;

        if (
            rutaEnlace === paginaActual &&
            hashEnlace === hashActual
        ) {
            enlace.classList.add("pagina-activa");

            if (
                hashEnlace === "#fundamentos" ||
                hashEnlace === "#tecnicas" ||
                hashEnlace === "#herramientas"
            ) {
                perteneceAGestionCalidad = true;
            }
        }
    });

    // MARCAR GESTIÓN DE LA CALIDAD
    if (perteneceAGestionCalidad && enlaceGestion) {
        enlaceGestion.classList.add("pagina-activa");
    }

    // SI ESTAMOS EN CALIDAD.HTML
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

const acordeones = document.querySelectorAll(".acordeon-calidad");

acordeones.forEach(function (acordeon) {
    acordeon.addEventListener("click", function () {
        const estabaAbierto = acordeon.classList.contains("activo");

        acordeones.forEach(function (otroAcordeon) {
            otroAcordeon.classList.remove("activo");
        });

        if (!estabaAbierto) {
            acordeon.classList.add("activo");
        }
    });
});

// =========================================
// TARJETAS INTERACTIVAS
// CAJA NEGRA / CAJA BLANCA
// =========================================

const tarjetasFlip = document.querySelectorAll(".flip-card");

tarjetasFlip.forEach(function (tarjeta) {
    tarjeta.addEventListener("click", function () {
        tarjeta.classList.toggle("activa");
    });
});

// =========================================
// FILTROS - HERRAMIENTAS DE CALIDAD
// =========================================

const botonesFiltro = document.querySelectorAll(".filtro-herramienta");
const herramientas = document.querySelectorAll(".herramienta-card");

botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const filtro = boton.getAttribute("data-filtro");

        botonesFiltro.forEach(function (otroBoton) {
            otroBoton.classList.remove("activo");
        });

        boton.classList.add("activo");

        herramientas.forEach(function (herramienta) {
            const categoria = herramienta.getAttribute("data-categoria");

            if (filtro === "todas" || categoria === filtro) {
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

const tarjetasMetrica = document.querySelectorAll(".flip-metrica");

tarjetasMetrica.forEach(function (tarjeta) {
    tarjeta.addEventListener("click", function () {
        tarjeta.classList.toggle("activa");
    });
});

// =========================================
// NIVELES DE PRUEBA
// =========================================

const nivelesPrueba = document.querySelectorAll(".nivel-prueba");

nivelesPrueba.forEach(function (nivel) {
    const boton = nivel.querySelector(".nivel-prueba-boton");

    if (!boton) return;

    boton.addEventListener("click", function () {
        const estabaAbierto = nivel.classList.contains("activo");

        nivelesPrueba.forEach(function (otroNivel) {
            otroNivel.classList.remove("activo");
        });

        if (!estabaAbierto) {
            nivel.classList.add("activo");
        }
    });
});

// =========================================
// ANIMACIÓN Y FLIP DE LAS ETAPAS DEL SDLC
// =========================================

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
        { threshold: 0.2 }
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

    etapa.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            girarTarjeta();
        }
    });
});

// =========================================
// MOSTRAR METODOLOGÍAS SELECCIONADAS
// =========================================

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

// =========================================
// MOSTRAR EL MODELO SELECCIONADO
// =========================================

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

// =========================================
// VISOR DE IMÁGENES DE MODELOS TRADICIONALES
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    const visorModelo = document.querySelector("#visor-modelo");

    if (!visorModelo) {
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

            if (!imagen || !imagenAmpliada || !pieImagen) return;

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

    if (botonCerrar) {
        botonCerrar.addEventListener("click", cerrarVisor);
    }

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
});

// =========================================
// METODOLOGÍAS ÁGILES: INTERACCIONES
// =========================================

document.addEventListener("DOMContentLoaded", function () {
    const paginaAgil = document.querySelector(".pagina-metodologias");

    // Si no estamos en la página de Metodologías Ágiles,
    // no ejecutamos estas interacciones.
    if (!paginaAgil) return;

        // =========================================
    // SCRUM: ACTIVIDAD INTERACTIVA DE ROLES
    // =========================================

    const actividadRoles = paginaAgil.querySelector(
        "#actividad-roles-scrum"
    );

    if (actividadRoles) {
        const opcionesRoles = actividadRoles.querySelector(
            "#opciones-roles-scrum"
        );

        const zonasRespuesta = actividadRoles.querySelectorAll(
            ".zona-respuesta-rol"
        );

        const tarjetasDefinicion = actividadRoles.querySelectorAll(
            ".tarjeta-definicion-rol"
        );

        const botonComprobar = actividadRoles.querySelector(
            "#comprobar-roles-scrum"
        );

        const botonReiniciar = actividadRoles.querySelector(
            "#reiniciar-roles-scrum"
        );

        const resultadoRoles = actividadRoles.querySelector(
            "#resultado-roles-scrum"
        );

        let rolArrastrado = null;
        let rolSeleccionado = null;

        function limpiarResultado() {
            tarjetasDefinicion.forEach(function (tarjeta) {
                tarjeta.classList.remove("correcta", "incorrecta");
            });

            if (resultadoRoles) {
                resultadoRoles.textContent = "";
            }
        }

        function devolverRolAlOrigen(zona) {
            const rol = zona.querySelector(".opcion-rol-scrum");

            if (rol) {
                opcionesRoles.appendChild(rol);
            }

            zona.innerHTML = "<span>Soltá el rol acá</span>";
        }

        function colocarRol(rol, zonaDestino) {
            if (!rol || !zonaDestino) return;

            const zonaAnterior = rol.parentElement.closest(
                ".zona-respuesta-rol"
            );

            if (zonaAnterior === zonaDestino) return;

            // Si el destino ya tiene un rol, devolverlo a las opciones.
            if (zonaDestino.querySelector(".opcion-rol-scrum")) {
                devolverRolAlOrigen(zonaDestino);
            }

            // Si el rol estaba en otra definición, liberar esa zona.
            if (zonaAnterior) {
                zonaAnterior.innerHTML =
                    "<span>Soltá el rol acá</span>";
            }

            zonaDestino.replaceChildren(rol);

            rol.classList.remove("seleccionada");
            rolSeleccionado = null;

            limpiarResultado();
        }

        // Preparar las opciones para arrastrar o seleccionar.
        opcionesRoles.querySelectorAll(
            ".opcion-rol-scrum"
        ).forEach(function (rol) {
            rol.addEventListener("dragstart", function (evento) {
                rolArrastrado = rol;

                rol.classList.add("arrastrando");

                if (evento.dataTransfer) {
                    evento.dataTransfer.effectAllowed = "move";
                    evento.dataTransfer.setData(
                        "text/plain",
                        rol.dataset.rol
                    );
                }
            });

            rol.addEventListener("dragend", function () {
                rol.classList.remove("arrastrando");
                rolArrastrado = null;

                zonasRespuesta.forEach(function (zona) {
                    zona.classList.remove("arrastrando-sobre");
                });
            });
        });

        // Permitir arrastrar los roles aunque ya estén colocados.
        actividadRoles.addEventListener("dragstart", function (evento) {
            const rol = evento.target.closest(".opcion-rol-scrum");

            if (!rol) return;

            rolArrastrado = rol;

            if (evento.dataTransfer) {
                evento.dataTransfer.effectAllowed = "move";
                evento.dataTransfer.setData(
                    "text/plain",
                    rol.dataset.rol
                );
            }
        });

        actividadRoles.addEventListener("dragend", function (evento) {
            const rol = evento.target.closest(".opcion-rol-scrum");

            if (rol) {
                rol.classList.remove("arrastrando");
            }

            rolArrastrado = null;

            zonasRespuesta.forEach(function (zona) {
                zona.classList.remove("arrastrando-sobre");
            });
        });

        // Seleccionar una opción: útil para celulares.
        actividadRoles.addEventListener("click", function (evento) {
            const rol = evento.target.closest(".opcion-rol-scrum");

            if (!rol) return;

            evento.stopPropagation();

            actividadRoles.querySelectorAll(
                ".opcion-rol-scrum"
            ).forEach(function (otroRol) {
                otroRol.classList.remove("seleccionada");
            });

            if (rolSeleccionado === rol) {
                rolSeleccionado = null;
            } else {
                rolSeleccionado = rol;
                rol.classList.add("seleccionada");
            }
        });

        // Configurar las zonas para recibir los roles.
        zonasRespuesta.forEach(function (zona) {
            zona.addEventListener("dragover", function (evento) {
                evento.preventDefault();
                zona.classList.add("arrastrando-sobre");

                if (evento.dataTransfer) {
                    evento.dataTransfer.dropEffect = "move";
                }
            });

            zona.addEventListener("dragleave", function (evento) {
                if (!zona.contains(evento.relatedTarget)) {
                    zona.classList.remove("arrastrando-sobre");
                }
            });

            zona.addEventListener("drop", function (evento) {
                evento.preventDefault();
                zona.classList.remove("arrastrando-sobre");

                if (rolArrastrado) {
                    colocarRol(rolArrastrado, zona);
                }
            });

            // Alternativa táctil: seleccionar un rol y tocar su destino.
            zona.addEventListener("click", function () {
                if (rolSeleccionado) {
                    colocarRol(rolSeleccionado, zona);
                }
            });

            zona.addEventListener("keydown", function (evento) {
                if (
                    (evento.key === "Enter" || evento.key === " ") &&
                    rolSeleccionado
                ) {
                    evento.preventDefault();
                    colocarRol(rolSeleccionado, zona);
                }
            });
        });

        // Comprobar las respuestas.
        if (botonComprobar) {
            botonComprobar.addEventListener("click", function () {
                let aciertos = 0;

                tarjetasDefinicion.forEach(function (tarjeta) {
                    const zona = tarjeta.querySelector(
                        ".zona-respuesta-rol"
                    );

                    const rolColocado = zona.querySelector(
                        ".opcion-rol-scrum"
                    );

                    const correcto = rolColocado &&
                        rolColocado.dataset.rol ===
                        zona.dataset.destinoRol;

                    tarjeta.classList.toggle("correcta", Boolean(correcto));
                    tarjeta.classList.toggle("incorrecta", !correcto);

                    if (correcto) {
                        aciertos++;
                    }
                });

                if (resultadoRoles) {
                    if (aciertos === tarjetasDefinicion.length) {
                        resultadoRoles.textContent =
                            "¡Excelente! Todas las respuestas son correctas: " +
                            aciertos + " de " +
                            tarjetasDefinicion.length + ".";
                    } else {
                        resultadoRoles.textContent =
                            "Conseguiste " + aciertos + " de " +
                            tarjetasDefinicion.length +
                            " respuestas correctas. ¡Podés corregirlas e intentarlo de nuevo!";
                    }
                }
            });
        }

        // Reiniciar la actividad.
        if (botonReiniciar) {
            botonReiniciar.addEventListener("click", function () {
                actividadRoles.querySelectorAll(
                    ".opcion-rol-scrum"
                ).forEach(function (rol) {
                    opcionesRoles.appendChild(rol);
                    rol.classList.remove("seleccionada", "arrastrando");
                });

                zonasRespuesta.forEach(function (zona) {
                    zona.innerHTML = "<span>Soltá el rol acá</span>";
                    zona.classList.remove("arrastrando-sobre");
                });

                rolArrastrado = null;
                rolSeleccionado = null;

                limpiarResultado();
            });
        }
    }

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
        
        panelEvento.classList.remove("evento-rosa", "evento-verde");

        const eventoVerde =
            boton.dataset.evento === "daily" ||
            boton.dataset.evento === "retro";

        panelEvento.classList.add(
            eventoVerde ? "evento-verde" : "evento-rosa"
        );


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

    if (cerrarEvento && panelEvento) {
        cerrarEvento.addEventListener("click", function () {
            panelEvento.hidden = true;

            botonesEvento.forEach(function (boton) {
                boton.classList.remove("seleccionado");
                boton.setAttribute("aria-pressed", "false");
            });
        });
    }

    
    // =========================================
    // SCRUM: INTERACCIONES DE LOS ARTEFACTOS
    // =========================================
    const seccionArtefactos =
        paginaAgil.querySelector("#scrum-artefactos");

    if (seccionArtefactos) {

        // Elegir la prioridad del Product Backlog.
        const prioridadProducto =
            seccionArtefactos.querySelector("#prioridad-producto");

        const resultadoPrioridad =
            seccionArtefactos.querySelector("#resultado-prioridad");

        if (prioridadProducto && resultadoPrioridad) {
            prioridadProducto.addEventListener("change", function () {
                const mensajes = {
                    turnos: "Es una buena opción para comenzar: permite resolver una necesidad concreta de los clientes. La prioridad real dependerá de las necesidades del producto.",
                    historial: "Puede ser importante, especialmente si los clientes necesitan consultar atenciones anteriores. Comparala con las demás necesidades.",
                    vacunas: "Los recordatorios pueden aportar mucho valor. Su prioridad dependerá de las necesidades de los usuarios.",
                    mascota: "Modificar los datos también puede ser útil. Evaluá su importancia junto con las demás funcionalidades."
                };

                resultadoPrioridad.textContent =
                    mensajes[prioridadProducto.value] ||
                    "Elegí una funcionalidad para ver una sugerencia.";
            });
        }

        // Actualizar el progreso de las tareas del Sprint.
        const tareasSprint =
            seccionArtefactos.querySelectorAll(
                ".lista-tareas-sprint input[type='checkbox']"
            );

        const barraProgreso =
            seccionArtefactos.querySelector("#barra-progreso-artefacto");

        const textoProgreso =
            seccionArtefactos.querySelector("#texto-progreso-artefacto");

        function actualizarProgresoSprint() {
            const completadas = Array.from(tareasSprint)
                .filter(function (tarea) {
                    return tarea.checked;
                }).length;

            const total = tareasSprint.length;
            const porcentaje = total ? (completadas / total) * 100 : 0;

            if (barraProgreso) {
                barraProgreso.style.width = porcentaje + "%";
            }

            if (textoProgreso) {
                textoProgreso.textContent =
                    `${completadas} de ${total} tareas completadas`;
            }
        }

        tareasSprint.forEach(function (tarea) {
            tarea.addEventListener("change", actualizarProgresoSprint);
        });

        // Revisar si el incremento cumple las condiciones.
        const revisionIncremento =
            seccionArtefactos.querySelector("#revision-incremento");

        const resultadoIncremento =
            seccionArtefactos.querySelector("#resultado-incremento");

        if (revisionIncremento && resultadoIncremento) {
            revisionIncremento.addEventListener("change", function () {
                if (revisionIncremento.value === "si") {
                    resultadoIncremento.textContent =
                        "¡Correcto! Una funcionalidad verificada que cumple los criterios puede formar parte del incremento.";
                } else if (revisionIncremento.value === "no") {
                    resultadoIncremento.textContent =
                        "No exactamente. Antes de considerarla terminada, debe cumplir los criterios acordados y los requisitos de calidad.";
                } else {
                    resultadoIncremento.textContent = "";
                }
            });
        }

        // Actividad de clasificación.
        const botonCorregir =
            seccionArtefactos.querySelector("#corregir-artefactos");

        const botonReiniciar =
            seccionArtefactos.querySelector("#reiniciar-artefactos");

        const resultadoActividad =
            seccionArtefactos.querySelector("#resultado-actividad-artefactos");

        const respuestasCorrectas = {
            "pregunta-artefacto-1": "product",
            "pregunta-artefacto-2": "sprint",
            "pregunta-artefacto-3": "incremento"
        };

        const nombresArtefactos = {
            product: "Product Backlog",
            sprint: "Sprint Backlog",
            incremento: "Incremento"
        };

        const preguntasArtefactos = Object.keys(respuestasCorrectas);

        if (botonCorregir && resultadoActividad) {
            botonCorregir.addEventListener("click", function () {
                let correctas = 0;
                let respondidas = 0;
                let devoluciones = [];

                preguntasArtefactos.forEach(function (id) {
                    const pregunta = seccionArtefactos.querySelector("#" + id);
                    const respuestaCorrecta = respuestasCorrectas[id];

                    if (!pregunta) return;

                    if (pregunta.value) {
                        respondidas++;
                    }

                    if (pregunta.value === respuestaCorrecta) {
                        correctas++;
                        devoluciones.push(
                            `${id.endsWith("1") ? "1" : id.endsWith("2") ? "2" : "3"}. ¡Correcto!`
                        );
                    } else {
                        devoluciones.push(
                            `${id.endsWith("1") ? "1" : id.endsWith("2") ? "2" : "3"}. Respuesta correcta: ${nombresArtefactos[respuestaCorrecta]}.`
                        );
                    }
                });

                if (respondidas < preguntasArtefactos.length) {
                    resultadoActividad.textContent =
                        `Completaste ${respondidas} de 3 preguntas. Podés responder las que faltan y comprobar nuevamente.`;
                    return;
                }

                resultadoActividad.textContent =
                    `Resultado: ${correctas} de 3 respuestas correctas. ` +
                    devoluciones.join(" ");
            });
        }

        if (botonReiniciar && resultadoActividad) {
            botonReiniciar.addEventListener("click", function () {
                preguntasArtefactos.forEach(function (id) {
                    const pregunta = seccionArtefactos.querySelector("#" + id);
                    if (pregunta) pregunta.value = "";
                });

                resultadoActividad.textContent = "";
            });
        }
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

    
    // =========================================
    // KANBAN: ACTIVIDAD DE BUENAS PRÁCTICAS
    // =========================================

    const seccionBuenasPracticas =
        paginaAgil.querySelector("#kanban-buenas-practicas");

    if (seccionBuenasPracticas) {
        const botonCorregirPractica =
            seccionBuenasPracticas.querySelector("#corregir-practica-kanban");

        const botonReiniciarPractica =
            seccionBuenasPracticas.querySelector("#reiniciar-practica-kanban");

        const resultadoPractica =
            seccionBuenasPracticas.querySelector("#resultado-practica-kanban");

        const respuestasPractica = {
            "practica-kanban-1": "b",
            "practica-kanban-2": "c",
            "practica-kanban-3": "a"
        };

        if (botonCorregirPractica && resultadoPractica) {
            botonCorregirPractica.addEventListener("click", function () {
                let correctas = 0;
                let respondidas = 0;

                Object.keys(respuestasPractica).forEach(function (id) {
                    const pregunta = seccionBuenasPracticas.querySelector("#" + id);

                    if (!pregunta) return;

                    if (pregunta.value !== "") {
                        respondidas++;
                    }

                    if (pregunta.value === respuestasPractica[id]) {
                        correctas++;
                    }
                });

                if (respondidas < 3) {
                    resultadoPractica.textContent =
                        `Respondé las tres situaciones antes de corregir. Llevás ${respondidas} de 3.`;
                    return;
                }

                resultadoPractica.textContent =
                    `Obtuviste ${correctas} de 3 respuestas correctas. ` +
                    (correctas === 3
                        ? "¡Excelente! Identificaste buenas formas de aplicar Kanban."
                        : "Revisá las recomendaciones de arriba y volvé a intentarlo.");
            });
        }

        if (botonReiniciarPractica && resultadoPractica) {
            botonReiniciarPractica.addEventListener("click", function () {
                Object.keys(respuestasPractica).forEach(function (id) {
                    const pregunta = seccionBuenasPracticas.querySelector("#" + id);
                    if (pregunta) pregunta.value = "";
                });

                resultadoPractica.textContent = "";
            });
        }
    }


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

        if (!contenedorDestino) return;

        contenedorDestino.appendChild(tarjeta);
        actualizarContadores();

        if (mensajeKanban) {
            const tituloColumna = columnaDestino.querySelector("h3");

            mensajeKanban.textContent = tituloColumna
                ? `Tarea movida a "${tituloColumna.textContent.trim()}".`
                : "Tarea movida correctamente.";
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

                if (destino) {
                    selector.value = destino.dataset.columna;
                }
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
});

// =========================================
// GLOSARIO: RECURSOS DE APRENDIZAJE
// =========================================

document.addEventListener("DOMContentLoaded", function () {
    const seccionGlosario = document.querySelector("#vista-glosario");

    // El glosario funciona solamente en la página
    // que contiene esta sección.
    if (!seccionGlosario) return;

    const listaGlosario =
        seccionGlosario.querySelector("#lista-glosario");

    const entradaBusqueda =
        seccionGlosario.querySelector("#busqueda-glosario");

    const botonLimpiar =
        seccionGlosario.querySelector("#limpiar-glosario");

    const filtrosGlosario =
        seccionGlosario.querySelector("#filtros-glosario");

    const paginacionGlosario =
        seccionGlosario.querySelector("#paginacion-glosario");

    // Comprobar que estén los elementos necesarios.
    if (
        !listaGlosario ||
        !entradaBusqueda ||
        !botonLimpiar ||
        !filtrosGlosario ||
        !paginacionGlosario
    ) {
        return;
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
        const consulta = normalizar(entradaBusqueda.value.trim());

        return terminosGlosario.filter(function (item) {
            const coincideLetra =
                letraActiva === "todos" ||
                normalizar(item.termino)
                    .toUpperCase()
                    .startsWith(letraActiva);

            // La búsqueda se realiza solamente por el nombre del término.
            const nombreTermino = normalizar(item.termino);

            return coincideLetra &&
                (!consulta || nombreTermino.includes(consulta));
        });
    }

    // =========================================
    // GLOSARIO: MOSTRAR RESULTADOS
    // =========================================

    function renderizarGlosario() {
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

    filtrosGlosario.addEventListener("click", function (evento) {
        const boton = evento.target.closest("[data-letra]");

        if (!boton || !filtrosGlosario.contains(boton)) return;

        letraActiva = boton.dataset.letra;
        paginaActualGlosario = 1;

        filtrosGlosario.querySelectorAll("[data-letra]")
            .forEach(function (otro) {
                const activo = otro === boton;

                otro.classList.toggle("activo", activo);
                otro.setAttribute("aria-pressed", String(activo));
            });

        renderizarGlosario();
    });

    // =========================================
    // GLOSARIO: BUSCADOR
    // =========================================

    entradaBusqueda.addEventListener("input", function () {
        paginaActualGlosario = 1;
        renderizarGlosario();
    });

    // =========================================
    // GLOSARIO: LIMPIAR FILTROS
    // =========================================

    botonLimpiar.addEventListener("click", function () {
        entradaBusqueda.value = "";

        letraActiva = "todos";
        paginaActualGlosario = 1;

        filtrosGlosario.querySelectorAll("[data-letra]")
            .forEach(function (boton) {
                const activo = boton.dataset.letra === "todos";

                boton.classList.toggle("activo", activo);
                boton.setAttribute("aria-pressed", String(activo));
            });

        renderizarGlosario();
        entradaBusqueda.focus();
    });

    // =========================================
    // GLOSARIO: PRIMERA CARGA
    // =========================================

    renderizarGlosario();
});


/* =====================================================
   FUNCIONALIDAD ADICIONAL JAVASCRIPT
   Comparador de metodologías + Encuesta de preferencias
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. COMPARADOR DINÁMICO DE METODOLOGÍAS
    ===================================================== */

    const tablaComparador = document.getElementById("tabla-comparador");

    if (tablaComparador) {
        const casillas = document.querySelectorAll(
            'input[name="metodologia-comparar"]'
        );

        const botonLimpiar = document.getElementById("limpiar-comparador");
        const mensajeComparador = document.getElementById("mensaje-comparador");

        const metodologias = {
            cascada: {
                nombre: "Cascada",
                enfoque: "Secuencial",
                planificacion: "Completa al inicio",
                requisitos: "Definidos desde el comienzo",
                entregas: "Al finalizar el proyecto",
                pruebas: "Principalmente al final",
                flexibilidad: "Baja",
                riesgo: "Mayor ante cambios tardíos"
            },

            "modelo-v": {
                nombre: "Modelo en V",
                enfoque: "Secuencial con verificación y validación",
                planificacion: "Planificación inicial detallada",
                requisitos: "Estables y bien definidos",
                entregas: "Generalmente al finalizar",
                pruebas: "Planificadas en cada etapa",
                flexibilidad: "Baja",
                riesgo: "Controlado mediante pruebas planificadas"
            },

            iterativo: {
                nombre: "Iterativo",
                enfoque: "Ciclos de mejora",
                planificacion: "Se revisa en cada iteración",
                requisitos: "Pueden ajustarse",
                entregas: "Versiones mejoradas sucesivamente",
                pruebas: "En cada iteración",
                flexibilidad: "Alta",
                riesgo: "Se detecta y revisa progresivamente"
            },

            incremental: {
                nombre: "Incremental",
                enfoque: "Construcción por incrementos",
                planificacion: "Se organiza por entregas",
                requisitos: "Priorizados por partes",
                entregas: "Frecuentes y funcionales",
                pruebas: "En cada incremento",
                flexibilidad: "Alta",
                riesgo: "Se reduce con entregas parciales"
            },

            xp: {
                nombre: "XP",
                enfoque: "Ágil, con programación y pruebas continuas",
                planificacion: "Corta y frecuente",
                requisitos: "Adaptables",
                entregas: "Frecuentes",
                pruebas: "Continuas y automatizadas",
                flexibilidad: "Muy alta",
                riesgo: "Se detecta mediante pruebas y feedback"
            },

            scrum: {
                nombre: "Scrum",
                enfoque: "Ágil, organizado en sprints",
                planificacion: "Por sprint",
                requisitos: "Se priorizan y pueden cambiar",
                entregas: "Incrementos al finalizar los sprints",
                pruebas: "Durante el desarrollo",
                flexibilidad: "Alta",
                riesgo: "Se revisa en cada sprint"
            },

            kanban: {
                nombre: "Kanban",
                enfoque: "Flujo continuo de trabajo",
                planificacion: "Continua según la capacidad",
                requisitos: "Se pueden repriorizar",
                entregas: "Continuas",
                pruebas: "Durante el flujo de trabajo",
                flexibilidad: "Muy alta",
                riesgo: "Se visualiza y controla el flujo"
            }
        };

        const caracteristicas = [
            ["enfoque", "Enfoque"],
            ["planificacion", "Planificación"],
            ["requisitos", "Requisitos"],
            ["entregas", "Entregas"],
            ["pruebas", "Pruebas"],
            ["flexibilidad", "Flexibilidad"],
            ["riesgo", "Gestión del riesgo"]
        ];

        function actualizarComparador() {
            const seleccionadas = Array.from(casillas)
                .filter(casilla => casilla.checked)
                .map(casilla => casilla.value)
                .filter(valor => metodologias[valor]);

            const encabezado = tablaComparador.querySelector("thead");
            const cuerpo = tablaComparador.querySelector("tbody");

            if (!encabezado || !cuerpo) {
                console.error(
                    "El comparador necesita una tabla con thead y tbody."
                );
                return;
            }

            encabezado.replaceChildren();
            cuerpo.replaceChildren();

            const filaEncabezado = document.createElement("tr");
            const encabezadoCaracteristica = document.createElement("th");

            encabezadoCaracteristica.scope = "col";
            encabezadoCaracteristica.textContent = "Característica";
            filaEncabezado.appendChild(encabezadoCaracteristica);

            seleccionadas.forEach(id => {
                const th = document.createElement("th");
                th.scope = "col";
                th.textContent = metodologias[id].nombre;
                filaEncabezado.appendChild(th);
            });

            encabezado.appendChild(filaEncabezado);

            caracteristicas.forEach(([clave, titulo]) => {
                const fila = document.createElement("tr");
                const celdaTitulo = document.createElement("th");

                celdaTitulo.scope = "row";
                celdaTitulo.textContent = titulo;
                fila.appendChild(celdaTitulo);

                seleccionadas.forEach(id => {
                    const celda = document.createElement("td");
                    celda.textContent = metodologias[id][clave];
                    fila.appendChild(celda);
                });

                cuerpo.appendChild(fila);
            });

            if (mensajeComparador) {
                if (seleccionadas.length === 0) {
                    mensajeComparador.textContent =
                        "Seleccioná al menos una metodología para comparar.";
                } else {
                    mensajeComparador.textContent =
                        `Mostrando ${seleccionadas.length} ` +
                        (seleccionadas.length === 1
                            ? "metodología."
                            : "metodologías.");
                }
            }
        }

        casillas.forEach(casilla => {
            casilla.addEventListener("change", actualizarComparador);
        });

        if (botonLimpiar) {
            botonLimpiar.addEventListener("click", () => {
                casillas.forEach(casilla => {
                    casilla.checked = false;
                });

                actualizarComparador();
            });
        }

        actualizarComparador();
    }


    /* =====================================================
        2. ENCUESTA DE PREFERENCIAS METODOLÓGICAS
    ===================================================== */

    const formulario = document.getElementById("formulario-encuesta");

    if (formulario) {
        const pasos = Array.from(
            formulario.querySelectorAll("[data-paso-formulario]")
        );

        const indicadores = Array.from(
            document.querySelectorAll(".paso-encuesta[data-paso]")
        );

        const barraProgreso = document.getElementById(
            "progreso-encuesta-barra"
        );

        const textoProgreso = document.getElementById(
            "progreso-encuesta-texto"
        );

        const botonAnterior = document.getElementById("encuesta-anterior");
        const botonSiguiente = document.getElementById("encuesta-siguiente");
        const botonReiniciar = document.getElementById("encuesta-reiniciar");

        const resultado = document.getElementById("resultado-encuesta");
        const detalleResultado = document.getElementById("detalle-resultado");

        const nombreRecomendado = document.getElementById(
            "nombre-metodologia-recomendada"
        );

        const descripcionRecomendada = document.getElementById(
            "descripcion-metodologia-recomendada"
        );

        const porcentajeCoincidencia = document.getElementById(
            "porcentaje-coincidencia"
        );

        const barraCoincidencia = document.getElementById(
            "barra-coincidencia-progreso"
        );

        const listaVentajas = document.getElementById("lista-ventajas");
        const listaDesventajas = document.getElementById("lista-desventajas");

        let pasoActual = 1;

        const recomendaciones = {
            cascada: {
                nombre: "Cascada",
                descripcion:
                    "Adecuada para proyectos con requisitos estables, " +
                    "planificación definida y pocas modificaciones.",
                ventajas: [
                    "Etapas ordenadas y fáciles de documentar.",
                    "Planificación clara desde el inicio.",
                    "Facilita el seguimiento de plazos y entregables."
                ],
                desventajas: [
                    "Los cambios tardíos pueden ser costosos.",
                    "El producto funcional suele llegar al final."
                ]
            },

            "modelo-v": {
                nombre: "Modelo en V",
                descripcion:
                    "Adecuado para proyectos que necesitan controles, " +
                    "verificación y validación planificadas.",
                ventajas: [
                    "Pruebas previstas desde etapas tempranas.",
                    "Trazabilidad entre requisitos y pruebas.",
                    "Proceso estructurado y documentado."
                ],
                desventajas: [
                    "Poca flexibilidad ante cambios.",
                    "Requiere requisitos bien definidos."
                ]
            },

            iterativo: {
                nombre: "Iterativo",
                descripcion:
                    "Adecuado para proyectos que necesitan revisar y " +
                    "mejorar progresivamente una solución.",
                ventajas: [
                    "Permite aprender y corregir en cada ciclo.",
                    "Facilita incorporar retroalimentación.",
                    "Los problemas pueden detectarse temprano."
                ],
                desventajas: [
                    "Necesita revisiones frecuentes.",
                    "El alcance puede requerir ajustes."
                ]
            },

            incremental: {
                nombre: "Incremental",
                descripcion:
                    "Adecuado para proyectos que pueden dividirse " +
                    "en partes funcionales entregadas progresivamente.",
                ventajas: [
                    "Permite entregar funcionalidades por etapas.",
                    "Facilita priorizar las partes más importantes.",
                    "Permite obtener feedback temprano."
                ],
                desventajas: [
                    "Requiere una buena integración entre incrementos.",
                    "La arquitectura debe contemplar el crecimiento."
                ]
            },

            xp: {
                nombre: "XP (Extreme Programming)",
                descripcion:
                    "Adecuada para equipos que buscan entregas frecuentes, " +
                    "pruebas continuas y adaptación a los cambios.",
                ventajas: [
                    "Promueve calidad mediante pruebas continuas.",
                    "Favorece la colaboración con el cliente.",
                    "Facilita adaptarse a requisitos cambiantes."
                ],
                desventajas: [
                    "Requiere mucha colaboración del equipo y del cliente.",
                    "Puede ser exigente mantener las prácticas continuamente."
                ]
            },

            scrum: {
                nombre: "Scrum / Ágil",
                descripcion:
                    "Adecuada para proyectos con requisitos dinámicos, " +
                    "entregas cortas y revisión frecuente de prioridades.",
                ventajas: [
                    "Permite entregar valor en ciclos cortos.",
                    "Facilita responder a los cambios.",
                    "Promueve la revisión y mejora continua."
                ],
                desventajas: [
                    "Necesita comunicación frecuente.",
                    "Los cambios de prioridad deben gestionarse."
                ]
            },

            kanban: {
                nombre: "Kanban",
                descripcion:
                    "Adecuada para equipos que necesitan gestionar " +
                    "un flujo continuo y visualizar el trabajo pendiente.",
                ventajas: [
                    "Visualiza el estado de las tareas.",
                    "Ayuda a detectar cuellos de botella.",
                    "Permite ajustar prioridades continuamente."
                ],
                desventajas: [
                    "Requiere mantener el tablero actualizado.",
                    "Sin acuerdos claros puede faltar planificación."
                ]
            }
        };


        /* Mostrar el paso actual y actualizar el progreso */

        function mostrarPaso(numero) {
            pasoActual = numero;

            pasos.forEach(paso => {
                const activo =
                    Number(paso.dataset.pasoFormulario) === pasoActual;

                paso.hidden = !activo;
            });

            indicadores.forEach(indicador => {
                const numeroIndicador = Number(indicador.dataset.paso);

                indicador.classList.toggle(
                    "activo",
                    numeroIndicador === pasoActual
                );

                indicador.classList.toggle(
                    "completado",
                    numeroIndicador < pasoActual
                );

                indicador.setAttribute(
                    "aria-current",
                    numeroIndicador === pasoActual ? "step" : "false"
                );
            });

            const porcentaje = Math.round(
                (pasoActual / pasos.length) * 100
            );

            if (barraProgreso) {
                barraProgreso.style.width = `${porcentaje}%`;
                barraProgreso.setAttribute("aria-valuenow", porcentaje);
            }

            if (textoProgreso) {
                textoProgreso.textContent =
                    `Paso ${pasoActual} de ${pasos.length}`;
            }

            if (botonAnterior) {
                botonAnterior.disabled = pasoActual === 1;
                botonAnterior.hidden = pasoActual === pasos.length;
            }

            if (botonSiguiente) {
                botonSiguiente.hidden = pasoActual === pasos.length;
            }

            if (botonReiniciar) {
                botonReiniciar.hidden = pasoActual !== pasos.length;
            }
        }


        /* Validar las preguntas del paso actual */

        function validarPasoActual() {
            const paso = pasos.find(
                elemento =>
                    Number(elemento.dataset.pasoFormulario) === pasoActual
            );

            if (!paso) return true;

            const grupos = new Set(
                Array.from(
                    paso.querySelectorAll(
                        'input[type="radio"][required]'
                    )
                ).map(input => input.name)
            );

            for (const nombreGrupo of grupos) {
                const respondido = paso.querySelector(
                    `input[name="${nombreGrupo}"]:checked`
                );

                if (!respondido) {
                    const primeraOpcion = paso.querySelector(
                        `input[name="${nombreGrupo}"]`
                    );

                    if (primeraOpcion) {
                        primeraOpcion.reportValidity();
                    }

                    return false;
                }
            }

            return true;
        }


        /* Obtener las respuestas del formulario */

        function obtenerRespuestas() {
            const respuestas = {};

            new FormData(formulario).forEach((valor, clave) => {
                respuestas[clave] = valor;
            });

            return respuestas;
        }


        /* Calcular la metodología más adecuada */

        function calcularRecomendacion(respuestas) {
            const puntajes = {
                cascada: 0,
                "modelo-v": 0,
                iterativo: 0,
                incremental: 0,
                xp: 0,
                scrum: 0,
                kanban: 0
            };

            function sumar(ids, puntos) {
                ids.forEach(id => {
                    puntajes[id] += puntos;
                });
            }

            // Tipo de proyecto
            if (respuestas["tipo-proyecto"] === "pequeno") {
                sumar(["xp", "scrum", "kanban", "incremental"], 2);
            } else if (respuestas["tipo-proyecto"] === "mediano") {
                sumar(["scrum", "incremental", "iterativo"], 3);
            } else if (respuestas["tipo-proyecto"] === "grande") {
                sumar(["cascada", "modelo-v", "incremental"], 3);
                sumar(["scrum"], 1);
            } else if (respuestas["tipo-proyecto"] === "cambiante") {
                sumar(["scrum", "xp", "kanban", "iterativo"], 4);
            }

            // Tamaño y composición del equipo
            if (respuestas["tamano-equipo"] === "pequeno") {
                sumar(["xp", "scrum", "kanban"], 3);
            } else if (respuestas["tamano-equipo"] === "mediano") {
                sumar(["scrum", "incremental", "iterativo", "kanban"], 3);
            } else if (respuestas["tamano-equipo"] === "grande") {
                sumar(["cascada", "modelo-v", "incremental"], 3);
                sumar(["scrum"], 1);
            } else if (respuestas["tamano-equipo"] === "cambiante") {
                sumar(["scrum", "xp", "kanban", "iterativo"], 4);
            }

            // Tipo de requisitos
            if (respuestas.requisitos === "funcionales") {
                sumar(["incremental", "scrum", "xp"], 3);
            } else if (respuestas.requisitos === "no-funcionales") {
                sumar(["modelo-v", "cascada"], 3);
                sumar(["iterativo"], 1);
            } else if (respuestas.requisitos === "ambos") {
                sumar(["incremental", "iterativo", "scrum", "modelo-v"], 3);
            } else if (respuestas.requisitos === "poco-claros") {
                sumar(["scrum", "xp", "kanban", "iterativo"], 4);
            }

            // Resultado esperado
            if (respuestas["resultado-esperado"] === "calidad") {
                sumar(["modelo-v", "xp", "iterativo"], 3);
                sumar(["cascada"], 2);
            } else if (respuestas["resultado-esperado"] === "tiempo") {
                sumar(["scrum", "incremental", "kanban", "xp"], 3);
            } else if (respuestas["resultado-esperado"] === "cliente") {
                sumar(["scrum", "xp", "iterativo", "incremental"], 3);
            } else if (respuestas["resultado-esperado"] === "flexibilidad") {
                sumar(["scrum", "xp", "kanban", "iterativo"], 4);
            }

            const ranking = Object.entries(puntajes)
                .sort((a, b) => b[1] - a[1]);

            const idGanador = ranking[0][0];
            const puntosGanador = puntajes[idGanador];

            const porcentaje = Math.min(
                100,
                Math.round((puntosGanador / 16) * 100)
            );

            return {
                id: idGanador,
                puntos: puntosGanador,
                porcentaje,
                puntajes
            };
        }


        /* Mostrar las ventajas y desventajas */

        function mostrarLista(elemento, elementos) {
            if (!elemento) return;

            elemento.replaceChildren();

            elementos.forEach(texto => {
                const li = document.createElement("li");
                li.textContent = texto;
                elemento.appendChild(li);
            });
        }


        /* Mostrar la metodología recomendada */

        function mostrarResultado() {
            const respuestas = obtenerRespuestas();

            const camposNecesarios = [
                "tipo-proyecto",
                "tamano-equipo",
                "requisitos",
                "resultado-esperado"
            ];

            const faltantes = camposNecesarios.filter(
                campo => !respuestas[campo]
            );

            if (faltantes.length > 0) {
                console.warn(
                    "Faltan respuestas para calcular la recomendación:",
                    faltantes
                );
                return;
            }

            const recomendacion = calcularRecomendacion(respuestas);
            const datos = recomendaciones[recomendacion.id];

            if (!datos) {
                console.error("No se pudo calcular la recomendación.");
                return;
            }

            // Ocultar el mensaje inicial.
            if (resultado) {
                resultado.hidden = true;
            }

            // Mostrar los datos de la metodología recomendada.
            if (nombreRecomendado) {
                nombreRecomendado.textContent = datos.nombre;
            }

            if (descripcionRecomendada) {
                descripcionRecomendada.textContent = datos.descripcion;
            }

            if (porcentajeCoincidencia) {
                porcentajeCoincidencia.textContent =
                    `${recomendacion.porcentaje}%`;
            }

            if (barraCoincidencia) {
                barraCoincidencia.style.width =
                    `${recomendacion.porcentaje}%`;

                barraCoincidencia.setAttribute("role", "progressbar");
                barraCoincidencia.setAttribute("aria-valuemin", "0");
                barraCoincidencia.setAttribute("aria-valuemax", "100");
                barraCoincidencia.setAttribute(
                    "aria-valuenow",
                    String(recomendacion.porcentaje)
                );
            }

            mostrarLista(listaVentajas, datos.ventajas);
            mostrarLista(listaDesventajas, datos.desventajas);

            if (detalleResultado) {
                detalleResultado.hidden = false;
            }

            // Mostrar el paso 5: metodología recomendada.
            mostrarPaso(5);

            if (textoProgreso) {
                textoProgreso.textContent = "¡Encuesta completada!";
            }

            if (botonAnterior) {
                botonAnterior.hidden = true;
            }

            if (botonSiguiente) {
                botonSiguiente.hidden = true;
            }

            if (botonReiniciar) {
                botonReiniciar.hidden = false;
            }
        }


        /* Botón Siguiente */

        if (botonSiguiente) {
            botonSiguiente.addEventListener("click", () => {
                if (!validarPasoActual()) return;

                // Avanzar por las preguntas.
                if (pasoActual < pasos.length - 1) {
                    mostrarPaso(pasoActual + 1);
                    return;
                }

                // Al terminar el paso 4, calcular la recomendación.
                if (pasoActual === pasos.length - 1) {
                    mostrarResultado();
                }
            });
        }


        /* Botón Anterior */

        if (botonAnterior) {
            botonAnterior.addEventListener("click", () => {
                if (pasoActual > 1) {
                    mostrarPaso(pasoActual - 1);
                }
            });
        }


        /* Botón Volver a empezar */

        if (botonReiniciar) {
            botonReiniciar.addEventListener("click", () => {
                formulario.reset();

                // Ocultar los detalles del resultado anterior.
                if (detalleResultado) {
                    detalleResultado.hidden = true;
                }

                // Restaurar el mensaje inicial.
                if (resultado) {
                    resultado.replaceChildren();
                    resultado.hidden = false;

                    const icono = document.createElement("span");
                    icono.className = "icono-resultado";
                    icono.innerHTML =
                        '<i class="fa-solid fa-lightbulb" aria-hidden="true"></i>';

                    const titulo = document.createElement("h3");
                    titulo.textContent = "Tu recomendación";

                    const mensaje = document.createElement("p");
                    mensaje.textContent =
                        "Completá los pasos anteriores para obtener una recomendación personalizada.";

                    resultado.append(icono, titulo, mensaje);
                }

                // Limpiar los datos de la recomendación anterior.
                if (nombreRecomendado) {
                    nombreRecomendado.textContent = "";
                }

                if (descripcionRecomendada) {
                    descripcionRecomendada.textContent = "";
                }

                if (porcentajeCoincidencia) {
                    porcentajeCoincidencia.textContent = "0%";
                }

                if (barraCoincidencia) {
                    barraCoincidencia.style.width = "0%";
                    barraCoincidencia.setAttribute("aria-valuenow", "0");
                }

                if (listaVentajas) {
                    listaVentajas.replaceChildren();
                }

                if (listaDesventajas) {
                    listaDesventajas.replaceChildren();
                }

                // Volver al primer paso.
                mostrarPaso(1);

                if (botonAnterior) {
                    botonAnterior.hidden = false;
                    botonAnterior.disabled = true;
                }

                if (botonSiguiente) {
                    botonSiguiente.hidden = false;
                    botonSiguiente.disabled = false;
                    botonSiguiente.textContent = "Siguiente →";
                }

                botonReiniciar.hidden = true;

                formulario.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        }


        // Evitar que el formulario recargue la página.
        formulario.addEventListener("submit", evento => {
            evento.preventDefault();
        });


        // Iniciar la encuesta en el primer paso.
        if (pasos.length > 0) {
            mostrarPaso(1);
        }
    }
});


/* =========================================
   PROCESOS DE DESARROLLO: NAVEGACIÓN SCRUM
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const seccionMetodologias = document.querySelector(
        ".detalle-metodologias"
    );

    if (!seccionMetodologias) return;

    const tarjetaScrum = seccionMetodologias.querySelector(
        "#metodologia-scrum"
    );

    if (!tarjetaScrum) return;

    const menuScrum = tarjetaScrum.querySelector(
        ".navegacion-contenido-scrum"
    );

    if (!menuScrum) return;

    const botonesSeccion = menuScrum.querySelectorAll(
        "[data-seccion-scrum]"
    );

    const contenidosScrum = tarjetaScrum.querySelectorAll(
        "[data-contenido-scrum]"
    );

    function mostrarSeccionScrum(nombre) {
        const contenidoSeleccionado = Array.from(contenidosScrum).find(
            contenido => contenido.dataset.contenidoScrum === nombre
        );

        if (!contenidoSeleccionado) return;

        botonesSeccion.forEach(function (boton) {
            const activo = boton.dataset.seccionScrum === nombre;

            boton.classList.toggle("activo", activo);
            boton.setAttribute("aria-pressed", String(activo));
        });

        contenidosScrum.forEach(function (contenido) {
            const mostrar = contenido === contenidoSeleccionado;

            contenido.hidden = !mostrar;
            contenido.classList.toggle("activa", mostrar);
        });
    }

    botonesSeccion.forEach(function (boton) {
        boton.addEventListener("click", function () {
            mostrarSeccionScrum(boton.dataset.seccionScrum);
        });
    });

    // Mostrar Roles al cargar la página.
    mostrarSeccionScrum("roles");
});


/* Mostrar y ocultar soluciones de ejercicios */

document.querySelectorAll(".boton-solucion").forEach((boton) => {
    boton.addEventListener("click", () => {
        const idSolucion = boton.getAttribute("aria-controls");
        const solucion = document.getElementById(idSolucion);

        if (!solucion) return;

        const estaAbierta = boton.getAttribute("aria-expanded") === "true";

        solucion.hidden = estaAbierta;
        boton.setAttribute("aria-expanded", String(!estaAbierta));

        const icono = boton.querySelector("i");

        boton.firstChild.textContent = estaAbierta
            ? "Mostrar solución "
            : "Ocultar solución ";

        if (icono) {
            icono.className = estaAbierta
                ? "fa-solid fa-chevron-down"
                : "fa-solid fa-chevron-up";
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formulario-contacto");
    const nombre = document.getElementById("nombre-contacto");
    const email = document.getElementById("email-contacto");
    const motivo = document.getElementById("motivo-contacto");
    const mensaje = document.getElementById("mensaje-contacto");

    const error = document.getElementById("error-contacto");
    const mensajeEnviado = document.getElementById("mensaje-enviado");

    if (!formulario) return;

    // Validar nombre: letras, espacios y acentos.
    function nombreValido(valor) {
        return /^[\p{L}\s]+$/u.test(valor.trim());
    }

    // Validar formato del correo electrónico.
    function emailValido(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
    }

    function mostrarError(texto, campo) {
        error.textContent = texto;
        error.hidden = false;
        mensajeEnviado.hidden = true;

        if (campo) campo.focus();
    }

    formulario.addEventListener("submit", (event) => {

        event.preventDefault();

        const nombreValor = nombre.value.trim();
        const emailValor = email.value.trim();
        const motivoValor = motivo.value;
        const mensajeValor = mensaje.value.trim();

        error.hidden = true;
        mensajeEnviado.hidden = true;

        // Campos obligatorios.
        if (!nombreValor || !emailValor || !motivoValor || !mensajeValor) {
            mostrarError(
                "Por favor, completá todos los campos obligatorios.",
                !nombreValor ? nombre :
                !emailValor ? email :
                !motivoValor ? motivo : mensaje
            );
            return;
        }

        // Validar nombre.
        if (!nombreValido(nombreValor)) {
            mostrarError(
                "El nombre no puede contener números ni caracteres especiales.",
                nombre
            );
            return;
        }

        // Validar correo.
        if (!emailValido(emailValor)) {
            mostrarError(
                "Ingresá un correo electrónico con un formato válido.",
                email
            );
            return;
        }

        // Validar mensaje.
        if (mensajeValor.length < 10) {
            mostrarError(
                "El mensaje debe tener al menos 10 caracteres.",
                mensaje
            );
            return;
        }

        // Validación completada.
        error.hidden = true;
        mensajeEnviado.hidden = false;

        mensajeEnviado.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    });

    // Ocultar mensajes anteriores cuando se modifican los campos.
    formulario.addEventListener("input", () => {
        error.hidden = true;
        mensajeEnviado.hidden = true;
    });

    formulario.addEventListener("change", () => {
        error.hidden = true;
        mensajeEnviado.hidden = true;
    });

});
