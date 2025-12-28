/* CREAMOS las variables globales para controlar el tiempo y el estado */
let tiempoRestante = 10;
let intervaloTemporizador = null;
let juegoActivo = false;

/* EDITAMOS la función bajarLetra para que reinicie el tiempo al marcar una letra */
function bajarLetra(elemento) {
    if (juegoActivo && !elemento.classList.contains('bloqueada')) {
        elemento.classList.add('bloqueada');
        
        // Reiniciamos el tiempo a 10 cada vez que alguien "baja" una letra
        tiempoRestante = 10;
        actualizarInterfazTimer();
    }
}

/* CREAMOS la función para que el timer se vea en pantalla */
function actualizarInterfazTimer() {
    const display = document.getElementById('timer');
    if (display) {
        display.innerText = tiempoRestante;
    }
}

/* EDITAMOS la función para que el rosco aparezca centrado y con buen tamaño */
function renderizarRoscaSTOP() {
    const contenedor = document.getElementById('contenido-dinamico');
    contenedor.innerHTML = `
        <div class="stop-game-container">
            <div id="letras-container"></div>
            <button class="btn-centro" id="btn-principal" onclick="presionarCentro()">✋</button>
        </div>
        <div id="timer" class="timer-display">10</div>
        <h3 id="tematica-actual" style="margin-top: 30px;">Temática: <span id="nombre-tematica">Selecciona...</span></h3>
    `;

    const letrasContainer = document.getElementById('letras-container');
    const letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    
    /* EDITAMOS el radio a 200px. Es el equilibrio perfecto para el ancho de 600px */
    const radio = 200; 
    
    letras.forEach((letra, i) => {
        const angulo = (i * (360 / letras.length)) * (Math.PI / 180) - (Math.PI / 2);
        const x = Math.cos(angulo) * radio;
        const y = Math.sin(angulo) * radio;

        const botonLetra = document.createElement('button');
        botonLetra.className = 'letra-stop';
        botonLetra.innerText = letra;
        
        /* EDITAMOS la posición para que use el centro del contenedor de 600px */
        botonLetra.style.left = `calc(50% + ${x}px)`;
        botonLetra.style.top = `calc(50% + ${y}px)`;
        
        botonLetra.onclick = () => bajarLetra(botonLetra);
        letrasContainer.appendChild(botonLetra);
    });
}

function bajarLetra(elemento) {
    if (!elemento.classList.contains('bloqueada')) {
        elemento.classList.add('bloqueada');
        // Aquí reiniciaremos el temporizador más adelante
        console.log("Letra bloqueada:", elemento.innerText);
    }
}

function presionarCentro() {
    alert("¡Empezar juego!");
    // Aquí iniciaremos el timer y elegiremos temática
}