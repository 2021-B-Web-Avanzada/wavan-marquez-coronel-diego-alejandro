// 03 - funciones.ts
function sumarNumeros(numeroInicial) {
    var numerosInfinitos = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        numerosInfinitos[_i - 1] = arguments[_i];
    }
    return numeroInicial;
}
sumarNumeros(1, 1, 23, 4, 5, 6);
function imprimir(mensaje) {
    console.log('Hola ' + mensaje);
}
var arregloNumeros = [1, 2];
var arregloNumerosDos = [1, 2];
var arregloNumerosTres = [1, 'dos', true];
var arregloNumeroCuatro = [1, 'dos', true];
var arregloNumeroCinco = [1, 2];
arregloNumeroCinco = ['uno', 'dos'];
