let modoActual = ''; // Puede ser 'stop' o 'rosco'

/* CREAMOS una constante con los temas originales para el Reset */
const TEMATICAS_ORIGINALES = ["Países", "Marcas", "Animales", "Comidas", "Películas"];

/* CREAMOS la lista inicial de temáticas predeterminadas */
let listaTematicas = [
    { nombre: "Países", seleccionada: true },
    { nombre: "Marcas", seleccionada: true },
    { nombre: "Animales", seleccionada: true },
    { nombre: "Comidas", seleccionada: true },
    { nombre: "Películas", seleccionada: true }
];

function mostrarPantalla(idPantalla) {
    const pantallas = document.querySelectorAll('.pantalla');
    pantallas.forEach(p => p.classList.add('oculto'));
    document.getElementById(idPantalla).classList.remove('oculto');
}

function irALobby(modo) {
    modoActual = modo;
    const titulo = document.getElementById('titulo-lobby');
    const icono = document.getElementById('icono-modo');
    
    if (modo === 'stop') {
        // Borramos el texto del título
        titulo.innerText = ''; 
        
        // Insertamos solo la imagen
        icono.innerHTML = `<img src="stop.png" alt="STOP" class="img-lobby-stop">`;
    } else {
        // Configuración para el Rosco (puedes dejarlo como estaba o ajustarlo)
        titulo.innerText = 'Rosco Clásico';
        icono.innerHTML = '🎡';
    }
    
    mostrarPantalla('pantalla-lobby');
}

function iniciarJuego() {
    mostrarPantalla('pantalla-dinamica');
    if (modoActual === 'stop') {
        renderizarRoscaSTOP(); // Llamamos a la función de stop.js
    } else {
        document.getElementById('contenido-dinamico').innerHTML = '<h3>Rosco Clásico en desarrollo...</h3>';
    }
}

function gestionarCategorias() {
    mostrarPantalla('pantalla-dinamica');
    const contenedor = document.getElementById('contenido-dinamico');

    // Usar .map() es más moderno y evita errores de concatenación
    const htmlTemas = listaTematicas.map((tema, index) => `
        <div class="item-tematica">
            <input type="checkbox" ${tema.seleccionada ? 'checked' : ''} onclick="toggleTematica(${index})">
            <span>${tema.nombre}</span>
            <button class="btn-borrar" onclick="borrarTematica(${index})">🗑️</button>
        </div>
    `).join('');

    contenedor.innerHTML = `
        <h3>Temáticas</h3>
        <div class="input-grupo">
            <input type="text" id="nuevo-tema" placeholder="Nueva temática ...">
            <button class="btn-add" onclick="agregarTematica()">+</button>
        </div>
        <div class="lista-temas">${htmlTemas}</div>
        <button class="btn-secondary btn-reset" onclick="resetearTematicas()">Resetar Originales</button>
    `;
}

/* CREAMOS la función para marcar/desmarcar un tema */
function toggleTematica(index) {
    listaTematicas[index].seleccionada = !listaTematicas[index].seleccionada;
}

/* CREAMOS la función para agregar un tema nuevo */
function agregarTematica() {
    const input = document.getElementById('nuevo-tema');
    if (input.value.trim() !== "") {
        listaTematicas.push({ nombre: input.value.trim(), seleccionada: true });
        gestionarCategorias(); // Recargamos la vista
    }
}

/* CREAMOS la función para borrar un tema */
function borrarTematica(index) {
    listaTematicas.splice(index, 1);
    gestionarCategorias();
}

function resetearTematicas() {
    if(confirm("¿Seguro que quieres volver a las temáticas originales?")) {
        // Mantenemos la estructura de objetos que definimos antes
        listaTematicas = TEMATICAS_ORIGINALES.map(nombre => ({ 
            nombre: nombre, 
            seleccionada: true 
        }));
        gestionarCategorias(); // Esto redibuja los botones con el nuevo CSS
    }
}

function activarPantallaCompleta() {
    if (!document.fullscreenElement) {
        // Intentar entrar en pantalla completa
        document.documentElement.requestFullscreen().catch((e) => {
            console.log("El navegador no permitió pantalla completa: ", e);
        });
    } else {
        // Salir de pantalla completa
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}