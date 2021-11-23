// 01-javascript
// /01 - variables.js
// Mutables e Inmutables
// Mutables
var numeroUno = 1;
let numeroDos = 2;
numeroUno = 5;
numeroDos = 8;
numeroUno = false;
numeroDos = true;
// Inmutable
const configuracionArchivos = "PDF";
// configuracionArchivos = "XML";
// Vamos a preferir CONST > LET > Nunca VAR;
// TIpos de variables
const numero = 1; //number
const sueldo = 1.2; //number
const texto = "Diego";
const apellido = "Marquez";
const booleanoo = false;
const hijos = null;
const zapatos = undefined;
console.log(typeof sueldo);
console.log(typeof numero);
console.log(typeof Number("asd"));
console.log(typeof texto);
console.log(typeof booleanoo)
console.log(typeof hijos)
console.log(typeof zapatos)
console.log(Number("asd"))
// Truti y Falsis
if(""){
    console.log("String vacios es verdadero");

}else {
    console.log("String vacio es Falsy");
}
if("Adrian"){
    console.log("String con datos es truty");

}else {
    console.log("String con datos falso");
}
if(0){
    console.log("Cero es truty")
}else{
    console.log("Cero es falso")
}
if(1){
    console.log("Positivo es truty")
}else{
    console.log("Positivo es falso")
}
if(-1){
    console.log("Negativo es truty")
}else{
    console.log("Negativo es falso")
}
if(null){
    console.log("NUll es truty")
}else {
    console.log("Null es falso")
}
if(undefined){
    console.log("Undefined es truty");
}else {
    console.log("Undefined es Falso")
}
const DIego = {
    nombre : "DIego",
    apellido : "Marquez",
    edad : 24,
    hijos: null,
    zapatos: undefined,
    casado: false,
    ropa: {
        color: 'plomo',
        talla: '36'
    },
    mascotas : ['Zeus','Hannah']
}
console.log(DIego)
DIego.apellido
DIego.casado
DIego["nombre"] = "diego"
DIego.sueldo;
console.log(DIego.sueldo)
DIego["sueldo"] = 1.9
console.log(DIego.sueldo)
console.log(Object.keys(DIego))
console.log(Object.values(DIego))
delete DIego.nombre //Eliminar la llave nombre
console.log(DIego)

// Variables por valor o referencia

// Variables por valor son las primitivas
let edadDiego = 24;
let edadVicente = edadDiego; //Guardamos una primitiva en otra variable
                            // Vaiables por valor
console.log(edadDiego) //24
console.log(edadVicente) //24
edadDiego = edadVicente + 1;
console.log(edadDiego) //25
console.log(edadVicente) //24

// Variables por referencia object ({} [])
// let juan = {
//     nombre: "juan"
// }
// let lenin = juan
// console.log(juan)
// console.log(lenin)
// lenin.nombre = "Lenin"
// console.log(juan)
// console.log(lenin)
// delete juan.nombre
// console.log(juan)
// console.log(lenin)
//Clonar objetos

let rafael = {
    nombre: "Rafael"
}
let lenin = Object.assign({}, rafael)
console.log(rafael)
console.log(lenin)
lenin.nombre = "Lenin"
delete rafael.nombre;
console.log(rafael);
console.log(lenin);
let arregloNumeros = [1,2,3,4,5];
let arregloClonado = Object.assign([], arregloNumeros)
console.log(arregloNumeros)
console.log(arregloClonado)
arregloNumeros[0] = 200
arregloClonado[0] = 100
console.log(arregloNumeros)
console.log(arregloClonado)