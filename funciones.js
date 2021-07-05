//Document Botones
const btn0 = document.querySelector(".btn0");
const btn1 = document.querySelector(".btn1");

//Variables Globales
let txtC; // --> Info Coordenada txt ingresado
let txtC_separado = [];

let lat1_ej = -53.783333;
let lon1_ej = -67.7; 
let lat2_ej = -54.807222; 
let lon2_ej = -68.304444; 

//Clases
class puntos{
    constructor(t,n,x,y){
        this.t = [];
        this.n = [];
        this.x = [];
        this.y = [];
    }
}

class distribucion{
    constructor(c,p,n){
        this.c = [];
        this.p = [];
        this.n = [];
    }
}

const info_usuario = new puntos;

//Funcion Guardar Info txt Coordenada 
const guardarTxtC = () => {
    txtC = document.getElementById("pantalla").value;
}

//Funciones para Guarar txt Coordenada en class
const separarTxtC = () => {
    let aux = txtC.split('\n');
    let num = aux.length;

    for(let i=0;i<num;i++){
        txtC_separado.push(aux[i])
    }
    console.log(txtC_separado);
}

const guardarClassC = () => {
    let numi = txtC_separado.length;

    let aux = [];
    let sep = [];

    for(let l=0;l<numi;l++){
        aux.push(txtC_separado[l].replace(',',';'));
        sep.push(aux[l].split(';'));
    }

    for(let m=0;m<numi;m++){
        info_usuario.t.push(sep[m][0]);
        info_usuario.n.push(sep[m][1]);
        info_usuario.x.push(Number.parseInt(sep[m][2]));
        info_usuario.y.push(Number.parseInt(sep[m][3]));
    }
    console.log(info_usuario);
}


//Funcion Distancia entre puntos
Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

const distancia = (lat1,lon1,lat2,lon2) => { 
    let R = 6371; // km 

    let dLat = (lat2-lat1).toRad();  
    let dLon = (lon2-lon1).toRad();  
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; 

    alert(d); 
}

//Botones
btn0.addEventListener('click', (evt) => {
    guardarTxtC();
    console.log(txtC);
    separarTxtC();
    guardarClassC();
    distancia(lat1_ej,lon1_ej,lat2_ej,lon2_ej);
})

btn1.addEventListener('click', (evt) => {
    guardarTxtC();
    console.log(txtC);
    separarTxtC();
    guardarClass();
})
