// 03 - funciones.ts
function sumarNumeros(
    numeroInicial: number,
    ...numerosInfinitos: number[]
): number {
    return numeroInicial;
}

sumarNumeros(1, 1,23,4,5,6)

function imprimir(mensaje: string): void{
    console.log('Hola ' + mensaje)
}

const arregloNumeros: number[] = [1,2];
const arregloNumerosDos: Array<number> = [1,2]
const arregloNumerosTres: (number | string | boolean)[] = [1,'dos',true]
const arregloNumeroCuatro : Array<number|string|boolean> = [1,'dos', true]
let arregloNumeroCinco : number[] | string[] = [1, 2];
arregloNumeroCinco = ['uno', 'dos'];
