const inicio = document.getElementById("inicio");
const contenido = document.getElementById("contenido");
const comenzar = document.getElementById("comenzar");

const carta = document.getElementById("carta");
const abrirCarta = document.getElementById("abrirCarta");
const cerrar = document.getElementById("cerrar");

// INICIAR LA SORPRESA

comenzar.addEventListener("click", () => {
    inicio.classList.add("ocultar");
    contenido.classList.add("mostrar");
});

// ABRIR CARTA

abrirCarta.addEventListener("click", () => {
    carta.classList.add("abierta");
});

// CERRAR CARTA

cerrar.addEventListener("click", () => {
    carta.classList.remove("abierta");
});

// CORAZÓN DE PARTÍCULAS

const canvas = document.getElementById("corazon");
const ctx = canvas.getContext("2d");

let particulas = [];

function ajustarCanvas() {
    const ancho = Math.min(420, window.innerWidth * 0.9);
    canvas.width = ancho * 2;
    canvas.height = 660;
    canvas.style.width = ancho + "px";
    canvas.style.height = "330px";

    crearCorazon();
}

function crearCorazon() {
    particulas = [];

    for (let i = 0; i < 650; i++) {
        let t = Math.random() * Math.PI * 2;

        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t));

        let escala = 10;

        particulas.push({
            x: canvas.width / 2 + x * escala,
            y: canvas.height / 2 + y * escala,
            radio: Math.random() * 2 + 1,
            brillo: Math.random(),
            velocidad: Math.random() * 0.04
        });
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particulas.forEach(p => {
        p.brillo += p.velocidad;

        let opacidad = 0.4 + Math.abs(Math.sin(p.brillo)) * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255, 160, 220, ${opacidad})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#ff75c8";
        ctx.fill();
    });

    ctx.shadowBlur = 0;

    requestAnimationFrame(animar);
}

ajustarCanvas();
animar();

window.addEventListener("resize", ajustarCanvas);
