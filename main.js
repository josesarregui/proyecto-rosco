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
        titulo.innerText = 'Modo STOP';
        icono.innerText = '🛑'; // Logo de STOP
    } else {
        titulo.innerText = 'Rosco Clásico';
        icono.innerText = '🎡'; // Logo de Rosco
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

/* EDITAMOS la función para insertar el espaciador antes de los botones */
function gestionarCategorias() {
    mostrarPantalla('pantalla-dinamica');
    const contenedor = document.getElementById('contenido-dinamico');
    
    let htmlTemas = '';
    listaTematicas.forEach((tema, index) => {
        htmlTemas += `
            <div class="item-tematica">
                <input type="checkbox" ${tema.seleccionada ? 'checked' : ''} 
                       onclick="toggleTematica(${index})">
                <span>${tema.nombre}</span>
                <button class="btn-borrar" onclick="borrarTematica(${index})">🗑️</button>
            </div>
        `;
    });

    contenedor.innerHTML = `
        <h3>Temáticas para ${modoActual.toUpperCase()}</h3>
        
        <div class="input-grupo">
            <input type="text" id="nuevo-tema" placeholder="Ingrese nueva temática...">
            <button class="btn-add" onclick="agregarTematica()">+</button>
        </div>

        <div class="lista-temas">
            ${htmlTemas}
        </div>

        <div class="espaciador"></div>

        <div class="acciones-inferiores">
            <button class="btn-secondary btn-reset" onclick="resetearTematicas()">Restablecer Originales</button>
        </div>
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