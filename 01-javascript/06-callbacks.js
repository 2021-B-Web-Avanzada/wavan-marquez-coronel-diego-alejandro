//06 - callbacks.js
const fs = require('fs'); // file system
//console.log('Primero');
// 06-ejemplo.txt -> Hola
console.log('PRIMERO');
fs.readFile(
    './06-ejemplo.txt',
    'utf-8',
    (error, contenido) => {
        console.log('SEGUNDO');
    }
);
console.log('TERCERO');

fs.readFile(
    './06-ejemplo.txt',
    'utf-8',
    (error, contenido) => {
        if(error){
            console.error({mensaje:'error leyendo contenido 06 ejemplo txt', error: error});
        }else{
            fs.readFile(
                './01-variables.js',
                'utf-8',
                (errorVariable, contenidoVariable) => {
                    if(errorVariable){
                        console.error({mensaje:'error leyendo contenido', error: errorVariable});
                    }else{
                        console.log(contenido, contenidoVariable)
                    }
                }
            )}
    }
)
