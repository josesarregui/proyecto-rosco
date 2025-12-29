/* CREAMOS las variables globales para controlar el tiempo y el estado */
let tiempoRestante = 10;
let intervaloTemporizador = null;
let juegoActivo = false;

/* CREAMOS la función para que el timer se vea en pantalla */
function actualizarInterfazTimer() {
    const display = document.getElementById('timer');
    if (display) {
        display.innerText = tiempoRestante;
    }
}

function renderizarRoscaSTOP() {
    // Usamos el ID de la sección principal para asegurar el ancho
    const contenedorPrincipal = document.getElementById('contenido-dinamico');
    
    // 1. Estructura HTML (Limpiamos el botón volver extra que estaba arriba)
    contenedorPrincipal.innerHTML = `
        <div class="tematica-container">
            <div id="nombre-tematica" class="tematica-display">
                Presiona la mano para comenzar...
            </div>
        </div>

        <div class="stop-game-container">
            <div id="letras-container"></div>
            <button class="btn-centro" id="id-btn-principal" onclick="presionarCentro()">✋</button>
        </div>

        <div id="timer" class="timer-display">10</div>
        
        <button class="btn-volver" onclick="irALobby('stop')">Volver</button>
    `;

    const letrasContainer = document.getElementById('letras-container');
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    
    // 2. Cálculo del ancho para que no sea angosto
    // Forzamos al contenedor a medir lo mismo que la tarjeta blanca
    const ancho = letrasContainer.clientWidth || 320;
    
    // 3. Espaciado de las letras: reducimos el radio un poco más
    // Si el radio es muy grande, las letras se pegan al borde. 
    // Bajamos de 0.8 a 0.7 para darles "aire" por fuera.
    const radio = (ancho / 2) * 0.92; 
    
    letras.forEach((letra, i) => {
        const angulo = (i * (360 / letras.length)) * (Math.PI / 180) - (Math.PI / 2);
        const x = Math.cos(angulo) * radio;
        const y = Math.sin(angulo) * radio;

        const botonLetra = document.createElement('button');
        botonLetra.className = 'letra-stop';
        botonLetra.innerText = letra;
        
        botonLetra.style.left = `calc(50% + ${x}px)`;
        botonLetra.style.top = `calc(50% + ${y}px)`;
        
        botonLetra.onclick = () => bajarLetra(botonLetra);
        letrasContainer.appendChild(botonLetra);
    });
}

function bajarLetra(elemento) {
    if (juegoActivo && !elemento.classList.contains('bloqueada')) {
        elemento.classList.add('bloqueada');
        
        // Reiniciamos el tiempo
        tiempoRestante = 10;
        actualizarInterfazTimer();

        // --- CORRECCIÓN AQUÍ ---
        // Cambiamos '.letra-rosco' por '.letra-stop' para que coincida con tu HTML
        const letrasRestantes = document.querySelectorAll('.letra-stop:not(.bloqueada)');
        
        if (letrasRestantes.length === 0) {
            finalizarJuego("¡Felicidades! Completaron todo el rosco.");
        }
    }
}

function presionarCentro() {

    if (juegoActivo) return;

    // Limpieza de letras bloqueadas
    const letrasBloqueadas = document.querySelectorAll('.letra-stop.bloqueada');
    letrasBloqueadas.forEach(letra => letra.classList.remove('bloqueada'));

    const temasValidos = listaTematicas.filter(t => t.seleccionada);

    if (temasValidos.length === 0) {
        alert("¡Debes seleccionar al menos una temática!");
        return;
    }

    const temaSorteado = temasValidos[Math.floor(Math.random() * temasValidos.length)];

    const etiquetaTema = document.getElementById('nombre-tematica');
    etiquetaTema.innerText = temaSorteado.nombre;
    etiquetaTema.style.color = "#2c3e50"; // Un azul muy oscuro o negro
    etiquetaTema.style.fontWeight = "bold";

    empezarReloj();
}

/* CREAMOS la lógica del cronómetro */
function empezarReloj() {
    juegoActivo = true;
    tiempoRestante = 10;
    actualizarInterfazTimer();

    if (intervaloTemporizador) clearInterval(intervaloTemporizador);

    intervaloTemporizador = setInterval(() => {
        tiempoRestante--;
        actualizarInterfazTimer();

        if (tiempoRestante <= 0) {
            clearInterval(intervaloTemporizador);
            juegoActivo = false;
            alert("¡STOP! Se acabó el tiempo.");
        }
    }, 1000);
}

function finalizarJuego(mensaje) {
    clearInterval(intervaloTemporizador);
    juegoActivo = false; // Al ponerlo en false, habilitamos que presionarCentro() funcione de nuevo
    
    setTimeout(() => {
        alert(mensaje || "¡STOP! Se acabó el tiempo.");
    }, 100); 
}