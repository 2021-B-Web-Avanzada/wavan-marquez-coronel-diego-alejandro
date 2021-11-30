// 08 - promesas.js
const fs = require('fs');

function promesaEsPar(numero){
    const miPrimerPromesa = new Promise(
        (resolve, reject) => {
            if (numero % 2 == 0) {
                resolve (numero)
            } else {
                reject('No es par =('); // Throw
            }
        }
    )
    return miPrimerPromesa
}

function promesaElevarAlCuadrado(numero){
    const miPrimerPromesa = new Promise(
        (resolve //return
         , reject// throw
         ) => {
            const numeroElevadoAlCuadrado = Math.pow(numero,2);
            resolve(numeroElevadoAlCuadrado); //return numero => resolve() : return undefined
        }
    );
    return miPrimerPromesa
}

promesaEsPar(4)
    .then(//aceptan un return de promesas
        (datosPromesa)=>{
        console.log(datosPromesa);
        return promesaElevarAlCuadrado(datosPromesa)
    })  // try
    .then(
        (datosElevarAlCuadrado)=>{
            console.log(datosElevarAlCuadrado);
        }
    )
    .catch(
        (error) => {
            console.log(error)
        }
    ) // catch
    .finally() // finally