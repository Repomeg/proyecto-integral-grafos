//Recibir archivo Coordenada y mostrar en pantalla txt.
window.addEventListener("load", inicio, false);

function inicio() {
  document.getElementById("archivo").addEventListener("change", cargar, false);
}

function cargar(ev) {
  var arch = new FileReader();
  arch.addEventListener("load", leer, false);
  arch.readAsText(ev.target.files[0]);
}

function leer(ev) {
  document.getElementById("pantalla").value = ev.target.result;
}

//--------------------------------------------------------------------------------------------------------------------------------

//Recibir archivo Distribucion y mostrar en pantalla txt.
window.addEventListener("load", inicioD, false);

function inicioD() {
  document.getElementById("archivo-dis").addEventListener("change", cargarD, false);
}

function cargarD(ev) {
  var arch = new FileReader();
  arch.addEventListener("load", leerD, false);
  arch.readAsText(ev.target.files[0]);
}

function leerD(ev) {
  document.getElementById("pantalla-dis").value = ev.target.result;
}
