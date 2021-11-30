//04-funciones.js

function soloNumeros(a, b, c){
    return a - b + c; //valor a devolver
}

//JS PERMITE EL USO DE FUNCIONES SIN VALIDACIONES
//soloNumeros('b',[1,4,5])
//soloNumeros((a) => a. (a) => (a) => a);
//soloNumeros(1, 2, 3, 4, 5, 6, 7, 8, 78, 9);
function soloLetras(a,b,c){
    console.log(a, b, c);
}
// funciones nombradas - named functions
function funcionNombrada() {

}
//Funciones anonimas
const funcionSinNombre1 = function (){};
var funcionSinNombre2 = function (){};
let funcionSinNombre3 = function (){};
[].forEach(function () {})
// FUnciones anonimas . Fat Arrow FUnction
const funcionFatArrow = () => {};
let funcionFatArrow2 = () => {};
var funcionFatArrow3 = () => {};
const functionFatArrow5 = (x) => {
    return x + 1;
};
const functionFatArrow6 = (x) => x + 1; // FAT ARROW FUNCTIONS, una solo linea se omite, return y llave
const functionFatArrow7 = x => x + 1; //

const funcionFatArrow8 = (x, y, z) => x + y + z;
// ... = > Parametros infinitos que llegan en un arreglo
//          Solo se puede tener una de estas por funcion
function sumerNumeros(...otrosNumeros) { // Parametros inf [2,3,4,5,...]
    let total = 0 ;
    otrosNumeros.forEach(
        (valorActual) => {
            total = total + valorActual;
        }
    );
    return total
}
sumerNumeros(1,3,4,5,6,7,8,84,4,12,1,1,1,1,11)

