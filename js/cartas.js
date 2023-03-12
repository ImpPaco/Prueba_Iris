
const contenedorCartas = document.querySelector('.cartas');


const cartas = Array.from(contenedorCartas.children);


cartas.sort(() => Math.random() - 0.5);


cartas.forEach(carta => contenedorCartas.appendChild(carta));



let primeraCarta = null; 
let segundaCarta = null; // Almacenar la segunda carta seleccionada
let espera = false; // Evitar hacer clic en más de dos cartas a la vez

let contadorCorazones = 0;
let cartasOcultas = 0;
let puntos = 0; 

const ocultarCorazon = () => {
  const fallos = document.querySelectorAll('.fa-regular');
  const corazones = document.querySelectorAll('.corazon');

  if (contadorCorazones < 10) {
    fallos[contadorCorazones].style.display = 'block';
    corazones[contadorCorazones].style.display = 'none';

    contadorCorazones++;
    if (contadorCorazones === 10) {
      alert('¡PUMMM! ¡Jugador Eliminado! Ha conseguido: '+ puntos + ' Puntos');
      location.reload();
    }
  }
};

cartas.forEach(carta => carta.addEventListener('click', clicEnCarta));

function clicEnCarta() {
  if (espera || this === primeraCarta) { // Si se está esperando por un par coincidente o si se hace clic en la misma carta dos veces
    return;
  }

  const imagen = this.querySelector('img');
  const nuevaImagen = this.dataset.imagen;

  imagen.src = nuevaImagen;

  if (!primeraCarta) { // Si es la primera carta seleccionada
    primeraCarta = this;
  } else { // Si es la segunda carta seleccionada
    segundaCarta = this;
    espera = true;

    if (primeraCarta.dataset.imagen === segundaCarta.dataset.imagen) { // Si las dos cartas coinciden
      primeraCarta.classList.add('ocultar-cartas');
      segundaCarta.classList.add('ocultar-cartas');
      cartasOcultas += 2; // Incrementar el contador de cartas ocultas
      puntos +=1; //Damos 1 punto
      
      setTimeout(() => {
        primeraCarta.style.visibility = 'hidden';
        segundaCarta.style.visibility = 'hidden';

        primeraCarta.classList.remove('ocultar-cartas');
        segundaCarta.classList.remove('ocultar-cartas');
        primeraCarta = null;
        segundaCarta = null;
        espera = false;

        // Si todas las cartas están ocultas, mostrar el alert de que has ganado
        if (cartasOcultas === cartas.length) {
          alert('¡Felicidades! ¡Has ganado!');
          location.reload();
        }
      }, 2000);
      
    } else { // Si no coinciden, esperar un poco antes de voltear las cartas de nuevo
      setTimeout(() => {
        primeraCarta.querySelector('img').src = 'build/img/cartaback1.png';
        segundaCarta.querySelector('img').src = 'build/img/cartaback1.png';
        primeraCarta = null;
        segundaCarta = null

        espera = false;
        ocultarCorazon();
      }, 1000);
    }
    
    
  }
}




const elementos = document.querySelectorAll('.elemento-oculto');

const options = {
  rootMargin: '0px',
  threshold: 0.5
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('elemento-visible');
      entry.target.classList.remove('elemento-oculto');
      observer.unobserve(entry.target);
    }
  })
}, options);

elementos.forEach(elemento => {
  observer.observe(elemento);
});


const boton = document.getElementById("boton");

boton.addEventListener("click", function() {
  location.reload();
});

