let turnos = 0;
let $primerCuadro = null;
const $tablero = document.querySelector("#tablero");
const $cuadros = $tablero.querySelectorAll(".cuadro");
const $mensajePerdiste = document.querySelector("#perdiste");
const $mensajeFinJuego = document.querySelector("#fin-juego");

function configurarJuego(){
    const campeonesBase = ["lulu", "sett", "senna", "pyke", "xayah", "miss-fortune"];
    const campeonesRepetidos = campeonesBase.concat(campeonesBase);

    configurarCuadros($cuadros, campeonesRepetidos);
    manejarEventos($tablero);

}

function configurarCuadros($cuadros, campeones) {
    const campeonesRandom = campeones.sort(function() {
      return 0.5 - Math.random();
    });
  
    campeonesRandom.forEach(function(campeones, i) {
      $cuadros[i].classList.add(campeones);
    });
}

function manejarEventos($tablero) {
    $tablero.onclick = function(e) {
      const $elemento = e.target;
      if ($elemento.classList.contains('cuadro')) {
        manejarClickCuadro($elemento);
      }
    };
}

function manejarClickCuadro($cuadroActual) {
    mostrarCuadro($cuadroActual);
  
    if ($primerCuadro === null) {
      $primerCuadro = $cuadroActual;
    } else {
  
      if ($primerCuadro === $cuadroActual) {
        return;
    }
  
    turnos++;
  
    if (cuadrosSonIguales($primerCuadro, $cuadroActual)) {
        eliminarCuadro($primerCuadro);
        eliminarCuadro($cuadroActual);
    } else {
        ocultarCuadro($primerCuadro);
        ocultarCuadro($cuadroActual);
    }
      $primerCuadro = null;
    }
}

function cuadrosSonIguales($cuadro1, $cuadro2) {
    return $cuadro1.className === $cuadro2.className;
}

function mostrarCuadro($cuadro) {
    $cuadro.removeAttribute("id","reverso-cuadro");
}

function ocultarCuadro($cuadro) {
    setTimeout(function() {
        $cuadro.setAttribute("id", "reverso-cuadro");
    }, 500);
}

function eliminarCuadro($cuadro) {
    setTimeout(function() {
      $cuadro.parentElement.classList.add('completo');
      $cuadro.style.display = 'none';
      evaluarFinDeJuego();
    }, 500);
}

function evaluarFinDeJuego() {
    if (document.querySelectorAll('.completo').length === 12) {
      $tablero.style.display = 'none';
      $mensajeFinJuego.querySelector('strong').textContent = turnos.toString();
      $mensajeFinJuego.style.display = 'grid';
      return tiempoTotal = function(){};
    }
}
  
configurarJuego();

let tiempoTotal = 30;

actualizarTemporizador();

function actualizarTemporizador() {
  document.getElementById('cuenta-regresiva').innerHTML = tiempoTotal;
  if(tiempoTotal===0){
    $tablero.style.display = 'none';
    $mensajePerdiste.style.display = 'grid';
  }else{
    tiempoTotal-=1;
    setTimeout(actualizarTemporizador,1000);
  }
}

document.querySelector("#boton-reseteo-derrota").onclick = function(event){
  event.preventDefault();
  resetearJuego();
}

document.querySelector("#boton-reseteo-victoria").onclick = function(event){
  event.preventDefault();
  resetearJuego();
}

function resetearJuego(){
  location.reload();
}
