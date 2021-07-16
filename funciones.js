//Document Botones
const btn0 = document.querySelector(".btn0");
//const btn1 = document.querySelector(".btn1");

//Variables Globales
let txtC; // --> Info Coordenada txt ingresado
let txtC_separado = [];

let txtD; // --> Info Distribucion txt ingresado
let txtD_separado = [];

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

const info_C = new puntos;
const info_D = new distribucion;

//Funcion Guardar Info txt Coordenada 
const guardarTxtC = () => {
    txtC = document.getElementById("pantalla-1").value;
}

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
        info_C.t.push(sep[m][0]);
        info_C.n.push(sep[m][1]);
        info_C.x.push(Number.parseInt(sep[m][2]));
        info_C.y.push(Number.parseInt(sep[m][3]));
    }
    console.log(info_C);
}

//Funcion Guardar Info txt Distribucion
const guardarTxtD = () => {
    txtD = document.getElementById("pantalla-dis").value;
}

const separarTxtD= () => {
    let aux = txtD.split('\n');
    let numi = aux.length;

    for(let ii=0;ii<numi;ii++){
        txtD_separado.push(aux[ii])
    }
    console.log(txtD_separado);
}

const guardarClassD = () => {
    let numo = txtD_separado.length;

    let aux = [];
    let sep = [];

    for(let ll=0;ll<numo;ll++){
        sep.push(txtD_separado[ll].split(';'));
    }

    for(let m=0;m<numo;m++){
        info_D.c.push(sep[m][0]);
        info_D.p.push(sep[m][1]);
        info_D.n.push(Number.parseInt(sep[m][2]));
    }
    console.log(info_D);
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

    guardarTxtD();
    console.log(txtD);
    separarTxtD();
    guardarClassD();
})

/*
btn1.addEventListener('click', (evt) => {
    guardarTxtD();
    console.log(txtD);
    separarTxtD();
    guardarClassD();
})
*/