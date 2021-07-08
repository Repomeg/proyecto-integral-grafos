//Prototipos
Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

//Document Botones
const btn0 = document.querySelector(".btn0");
const btn1 = document.querySelector(".btn1");

//Variables Globales
let txtC; // --> Info Coordenada txt ingresado
let txtC_separado = [];

let txtD; // --> Info Distribucion txt ingresado
let txtD_separado = [];

let arr_Cantcaminos = []; // --> Cantidad de caminos de distribucion separados en cada casilla de arr

let lat1_ej = -53.783333;
let lon1_ej = -67.7; 
let lat2_ej = -54.807222; 
let lon2_ej = -68.304444; 

let matrizDistancias = []; // --> Distancia entre todos los puntos

//Clases
class puntos{
    constructor(n,x,y){
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

//Clases Puntos Distribucion Y Ventas
const Pdis = new puntos;
const Pven = new puntos;

//Clase Info Distribucion Objetos
const info_D = new distribucion;

//Funcion Guardar Info txt Coordena
const guardarTxtC = () => {
    txtC = null;
    txtC = document.getElementById("pantalla-1").value;
}

const separarTxtC = () => {
    txtC_separado = [];

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

    Pven.n = [];
    Pven.x = [];
    Pven.y = [];
    Pdis.n = [];
    Pdis.x = [];
    Pdis.y = [];

    for(let l=0;l<numi;l++){
        aux.push(txtC_separado[l].replace(',',';'));
        sep.push(aux[l].split(';'));
    }

    for(let m=0;m<numi;m++){
        console.log(sep[0]);
        if(sep[m][0]=='P'){
            Pven.n.push(sep[m][1]);
            Pven.x.push(Number.parseInt(sep[m][2]));
            Pven.y.push(Number.parseInt(sep[m][3]));
        }
        if(sep[m][0]=='C'){
            Pdis.n.push(sep[m][1]);
            Pdis.x.push(Number.parseInt(sep[m][2]));
            Pdis.y.push(Number.parseInt(sep[m][3]));
        }
    }
    console.log(Pven);
    console.log(Pdis);
}

//Funcion Guardar Info txt Distribucion
const guardarTxtD = () => {
    txtD = null;
    txtD = document.getElementById("pantalla-dis").value;
}

const separarTxtD= () => {
    txtD_separado = [];

    let aux = txtD.split('\n');
    let numi = aux.length;

    for(let ii=0;ii<numi;ii++){
        txtD_separado.push(aux[ii])
    }
    console.log(txtD_separado);
}

const guardarClassD = () => {
    let numo = txtD_separado.length;

    let sep = [];

    info_D.c = [];
    info_D.p = [];
    info_D.n = [];

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
const distancia = (Coor1,Coor2) => { 
    let R = 6371; // km 

    let dLat = (Coor2[0]-Coor1[0]).toRad();  
    let dLon = (Coor2[1]-Coor1[1]).toRad();  
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                    Math.cos(Coor1[0].toRad()) * Math.cos(Coor2[0].toRad()) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);  
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c; 

    return d;
}

//Funcion devuelve array de cant de puntos en cada camino
const cantPuntosCamino = () => {
    let num_envios  = info_D.c.length;
    let num_cantC = Pdis.n.length;
    
    let arr_cenDis= JSON.parse(JSON.stringify(info_D.c));
    let arr_centros= JSON.parse(JSON.stringify(Pdis.n));
    //----------------------------------------------------

    for(let i=0;i<num_cantC;i++){
        let cont = 0;
        for(let j=0;j<num_envios;j++){
            if(arr_centros[i] == arr_cenDis[j]){
                cont++;
            }
        }
        arr_Cantcaminos.push(cont);   
    }
    console.log(arr_Cantcaminos);
}

//Funcion devuelve matriz con las distancias entre todos los pares de puntos
const llenarInfoCaminos = () => {
    let num = Pdis.n.length+Pven.n.length;
    let matrizCoor = [];

    for(let j=0; j<Pven.n.length; j++){
        matrizCoor.push([Pven.x[j],Pven.y[j]]);
    }
    for(let i=0; i<Pdis.n.length; i++){
        matrizCoor.push([Pdis.x[i],Pdis.y[i]]);
    }
    console.log(matrizCoor);
    console.log(matrizCoor[0]);

    let matrizDistancias = []; // --> Crea matriz cuadrada
    for(let y=0; y<num; y++) {
        matrizDistancias[y] = new Array;
    }

    for(let l=0; l<num; l++){
        for(let m=0; m<num; m++){
            matrizDistancias[l][m]=distancia(matrizCoor[l],matrizCoor[m]);
        }
    }
    console.table(matrizDistancias);
}

//Botones
btn0.addEventListener('click', (evt) => {
    guardarTxtC();
    console.log(txtC);
    separarTxtC();
    guardarClassC();
})

btn1.addEventListener('click', (evt) => {
    guardarTxtD();
    console.log(txtD);
    separarTxtD();
    guardarClassD();
    cantPuntosCamino();
    llenarInfoCaminos();
})
