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
let camino = []; // --> Rutas por centro de distribucion
 
let matrizDistancias = []; // --> Distancia entre todos los puntos
let matriz_DistaciaCaminos = []; // --> En cada posicion tendra una matriz distanica (Posicion por cada ruta Centro Distribucion)

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

//Funcion que separa en un array los distintos caminos de distribucion
const crearCaminos = () => {
    let num = arr_Cantcaminos.length;
    let cont=0;

    for(let h=0;h<num;h++){
        for(let a=0;a<arr_Cantcaminos[h];a++){
            camino[h] = new Array 
        }
    }

    console.log(info_D.p)
    
    for(let i=0;i<num;i++){
        for(let j=0;j<arr_Cantcaminos[i];j++){
            let index = info_D.p[cont];
            let aux = Pven.n.findIndex(pem => pem == index);
            console.log('Posicion: '+aux);

            camino[i][j] = [Pven.n[aux],Pven.x[aux],Pven.y[aux]]; 
            cont++;
        }
    }
    console.table(camino);
    console.table(camino[0]);
    console.log(camino[0][0][1]);
    console.log(camino[0][0][2]);
}

//Funcion devuelve matriz con las distancias entre todos los pares de puntos
const llenarInfoCaminos = (aux,C_num) => {
    //let aux = camino[0];
    let num = aux.length
    let matrizCoor = [];

    matrizCoor.push([Pdis.x[C_num],Pdis.y[C_num]]);

    for(let i=0;i<num;i++){
        matrizCoor.push([aux[i][1],aux[i][2]]);
    }

    console.log(matrizCoor.length);

    let matrizDistancias = []; // --> Crea matriz cuadrada
    for(let y=0; y<matrizCoor.length; y++) {
        matrizDistancias[y] = new Array;
    }
    for(let l=0; l<matrizCoor.length; l++){
        for(let m=0; m<matrizCoor.length; m++){
            matrizDistancias[l][m]=distancia(matrizCoor[l],matrizCoor[m]);
        }
    }
    console.table(matrizDistancias);
    return(matrizDistancias);
}

const crearRutas = () => {
    for(let i=0;i<camino.length;i++){
        matriz_DistaciaCaminos.push(llenarInfoCaminos(camino[i],i));
        console.table(matriz_DistaciaCaminos[i]);
    }
    
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
    crearCaminos();
    //llenarInfoCaminos();
    crearRutas();
})
