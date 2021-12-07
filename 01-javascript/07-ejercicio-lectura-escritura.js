const fs = require('fs');

/*
Hacer una funcion que me acepte como parametro una variable
con el path del archivo y el contenido a agregar al contenido
del archivo. La funcion debe tomar estos dos parametros y leer el archivo
anadir el texto al final del archivo
 */


function escribirArchivo(path, contenidoNuevo) {
    fs.writeFile(path,contenidoNuevo,function (err){
        if(err) return console.log(err);
        console.log(contenidoNuevo + ' agregado al archivo ' + path)
    })
}

escribirArchivo(
    './06-ejemplo.txt',
    'Buenas tardes'
)
escribirArchivo(
    './06-ejemplo.txt',
    'Buenas noches'
)