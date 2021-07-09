//Recibir archivo Coordenada y mostrar en pantalla txt.
window.onload = function(){
  leerContenido();
}

const leerContenido = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          document.getElementById("pantalla-1").innerHTML = this.responseText;
      }
  };
  xhr.open("GET", "txtprueba.txt", true);  
  xhr.send();
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