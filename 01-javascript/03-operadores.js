const arreglo = [
    {
        id: 1,
        nombre: 'Adrian',
        nota: 5
    },
    {
        id: 2,
        nombre: 'Vicente',
        nota: 8
    },
    {
        id: 3,
        nombre: 'Carolina',
        nota: 14
    },
    {
        id: 4,
        nombre: 'Wendy',
        nota: 16
    },
    {
        id: 5,
        nombre: 'Andrea',
        nota: 19
    },
    {
        id: 6,
        nombre: 'Pamela',
        nota: 19
    },
    {
        id: 7,
        nombre: 'Cristian',
        nota: 20
    },
    {
        id: 8,
        nombre: 'Daniel',
        nota: 19
    },
    {
        id: 9,
        nombre: 'Lilly',
        nota: 14
    },
    {
        id: 10,
        nombre: 'Ramiro',
        nota: 12
    }
];

// Funciones como parametros
// FINO
// enviamos una expresion -> Truty FALSY
// devuelve el primero que cumpla esa condicion\
const respuestaFind = arreglo
       .find(
         function (valorActual, indiceActual, arregloCmpleto) {
             console.log('valorActual', valorActual);
             console.log('valorActual', valorActual);
             console.log('valorActual', valorActual);
             return valorActual.nombre === "Cristian";
         }
       );
console.log('respuestaFind', respuestaFind);

const respuestaIndex = arreglo
    .findIndex(
        function (valorActual,indiceActual,arregloCompleto){
            return valorActual.nombre === "Cristian";
        }
    );
console.log('respuestaIndex', respuestaIndex) // indice -> 6 // no encuentra -> -1

const respuestaForEach = arreglo
    .forEach(
        function (valorActual,indiceActual,arregloCompleto) {
            console.log('valorActual', valorActual)
        }
    );
console.log('respuestaForEach',respuestaForEach)

//MAP (Modifica o muta el arreglo y devuelve un nuevo arreglo
// enviamos los datos del nuevo arreglo
// devuelve el nuevo arreglo
const respuestaMap = arreglo
    .map(
        (valorActual,indiceActual,arregloCompleto) => {
            const nuevoElemento = {
                id: valorActual.id,
                nombre: valorActual.nombre,
                nota: valorActual.nota + 1,
            };
            return nuevoElemento
        }
    );
console.log('respuestaMap', respuestaMap);
console.log('arreglo', arreglo);

// Filtrar (filtrar el arreglo)
// enviamos EXPRESION truty falsy
// Devuelve los elementos que empieza esa condicion

const respuestaFilter = arreglo
    .filter(
        (valorActual,indiceActual,arregloCompleto)=>{
            return valorActual.nota >= 14;
        }
    )
console.log('respuestaFilter', respuestaFilter);
console.log('arreglo', arreglo);

// SOME => expresion
// devuelve booleano
// hay alguna nota menor a nueve ?
// or
const respuestaSome = arreglo
    .some(
        (valorActual,indiceActual,arreegloCOmpleto) => {
            return valorActual.nota < 9;
        }
    );
console.log('respuestaSome', respuestaSome);

// Every => expresion
// devuelve booleano
// todas las notas son mayores a 14? si no
// and
const respuestaEvery = arreglo
    .every(
        function (valorActual,indiceActual,arregloCompleto){
            return valorActual.nota > 14
        }
    )
console.log('respuestaEvery', respuestaEvery);