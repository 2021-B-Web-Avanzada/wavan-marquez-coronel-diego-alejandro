// Crear archivos de texto plano que representaran cada Tienda

const fs = require('fs');
const readLineSync = require('readline-sync')
var tiendas = fs.readdirSync("./Tiendas de Electronica")
function promesaCrearTiendaElectronica (nombreTienda, contenidoActual , nuevoContenido ){
    const PromesaEscritura = new Promise(
        (resolve, reject) => {
            fs.writeFile(
                path, contenidoActual + '\n' + nuevoContenido, 'utf-8',
                (error) => {
                    if (error) {
                        reject('error escribiendo contenido');
                    } else {
                        console.log('Se escribio Correctamente')
                        console.log(fs.readFileSync('./06-ejemplo.txt', "utf8"));
                    }
                }
            );
        }
    )
    return PromesaEscritura
}
function promesaLeerTienda(path){
    const Promesa = new Promise(
        (resolve, reject) => {
            fs.readFile(
                path, 'utf-8',
                (error,contenido) => {
                    if (error) {
                        reject('Erro al leer el archivo');
                    } else {
                        console.log('Se leyo correctamente')
                        resolve(contenido)
                    }
                }
            );
        }
    )
    return Promesa
}
function ejercicio(path, nuevoContenido) {
    promesaLeerTienda(path)
        .then(
            (datosPromesa)=>{
                console.log(datosPromesa);
                return promesaCrearTiendaElectronica(path,datosPromesa,nuevoContenido)
            }
        )
        .then(
            (datosEscritura)=>{
                console.log(datosEscritura)
                return promesaLeerTienda(datosEscritura)

            }
        )
        .catch(
            (error)=>{
                console.log(error)
            }
        )
}


let userRes;
while (userRes !== '0') {
    console.log("1. Listar tiendas de electronica disponible")
    console.log("2. Crear nueva tienda de electronica")
    console.log("3. Elegir una tienda de electronica")
    console.log("4. Editar el nombre de tienda de electronica")
    console.log("5. Borrar tienda de electronica")
    console.log("0. Salir")
    userRes = readLineSync.question("Elige una opcion: ")
    if(userRes === '1'){
        console.log(tiendas);
    }else if(userRes === '2') {
        console.log("Escriba el nombre de la nueva tienda")
        let nombreTienda
        nombreTienda = readLineSync.question("Nombre:")
        console.log(nombreTienda)
        ejercicio(nombreTienda," ")
    }
}
