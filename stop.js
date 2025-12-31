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
    
    // 1. Estructura HTML
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
    `;

    const letrasContainer = document.getElementById('letras-container');
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    
    // --- MEJORA AQUÍ: Cálculo robusto del radio ---
    const rect = letrasContainer.getBoundingClientRect();
    const medidaReferencia = rect.width || 350;
    const radio = (medidaReferencia / 2) * 0.95;
    
    letras.forEach((letra, i) => {
        // Cálculo del ángulo para distribuir las letras en círculo
        const angulo = (i * (360 / letras.length)) * (Math.PI / 180) - (Math.PI / 2);
        const x = Math.cos(angulo) * radio;
        const y = Math.sin(angulo) * radio;

        const botonLetra = document.createElement('button');
        botonLetra.className = 'letra-stop';
        botonLetra.innerText = letra;
        
        // Posicionamiento absoluto basado en el centro del contenedor
        botonLetra.style.left = `calc(50% + ${x}px)`;
        botonLetra.style.top = `calc(50% + ${y}px)`;
        
        botonLetra.onclick = () => bajarLetra(botonLetra);
        letrasContainer.appendChild(botonLetra);
    });
}

function bajarLetra(elemento) {
    // Solo actuamos si el juego está activo y la letra no fue pulsada antes
    if (juegoActivo && !elemento.classList.contains('bloqueada')) {
        
        // 1. Aplicamos la clase que la pone gris (el CSS ahora la mantiene en su sitio)
        elemento.classList.add('bloqueada');
        
        // 2. REINICIO DEL TIEMPO
        // Es vital limpiar el intervalo actual antes de empezar uno nuevo
        if (intervaloTemporizador) {
            clearInterval(intervaloTemporizador);
        }

        // Reseteamos a 10 segundos
        tiempoRestante = 10;
        actualizarInterfazTimer();
        
        // 3. Volvemos a arrancar el cronómetro para el siguiente turno
        empezarReloj(); 

        // 4. Verificación de final de juego
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

function empezarReloj() {
    juegoActivo = true;
    tiempoRestante = 10;
    
    const display = document.getElementById('timer');
    display.classList.remove('timer-urgente');
    display.style.color = "#e74c3c"; 
    
    actualizarInterfazTimer();

    if (intervaloTemporizador) clearInterval(intervaloTemporizador);

    intervaloTemporizador = setInterval(() => {
        tiempoRestante--;
        actualizarInterfazTimer();

        if (tiempoRestante <= 3 && tiempoRestante > 0) {
            display.classList.add('timer-urgente');
        }

        if (tiempoRestante <= 0) {
            // DETENER ANIMACIÓN: La quitamos justo al llegar a 0
            display.classList.remove('timer-urgente');
            finalizarJuego("¡STOP! Se acabó el tiempo.");
        }
    }, 1000);
}

function finalizarJuego(mensaje) {
    clearInterval(intervaloTemporizador);
    juegoActivo = false;
    
    const display = document.getElementById('timer');
    display.classList.remove('timer-urgente'); // Por seguridad
    
    setTimeout(() => {
        alert(mensaje);
        document.getElementById('nombre-tematica').innerText = "Presiona la mano para comenzar...";
    }, 100); 
}

function volverAlLobbyDesdeJuego() {
    // 1. Detenemos el reloj usando el nombre exacto de tu variable
    if (typeof intervaloTemporizador !== 'undefined') {
        clearInterval(intervaloTemporizador);
    }
    
    // 2. Reseteamos las variables de control
    juegoActivo = false;
    tiempoRestante = 10;
    
    // 3. Volvemos al lobby
    mostrarPantalla('pantalla-lobby');
}