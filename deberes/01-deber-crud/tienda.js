const inquirer = require('inquirer');
const fs = require('fs');
const Console = require("console");

let idTienda = Number;
let nombreTienda=String;
let idTiendaSymbol = Symbol();
let  detalle= {
    propietario: '',
    CI:''
};
let empleados=undefined;
let cantidadDeudaSRI = null;
let cantidadSucursales=BigInt(0);

async function listarSupermercados(){
    let errorLectura = false;
    console.log("----------------TIENDAS----------------------")
    console.log("Indice|Id|Nombre|Cantidad Sucursales|Symbol|Propietario|CI Propietario|Empleados|Cantidad Deudas");
    const promesaLeerArchivo = new Promise(
        async (resolve,reject)=>{
            try {
                fs.readFile('./tienda.txt', 'utf8', function(err, data){
                    if(err){
                        console.log("¡¡¡¡¡¡Error de lectura de archivo!!!!!!!!");
                        reject(err);
                    }else{
                        let filas = data.split('\n');
                        for(let i=0;i<filas.length-1;i++){
                            console.log(i,filas[i]);
                        }
                        resolve(true);
                    }
                });
            }catch (e) {
                console.log("entra");
                appendFilaTienda("");
                resolve(false);
            }

        }
    );
    return promesaLeerArchivo;
}
function getTiendas(){
    const promesaLeerArchivo = new Promise(
        (resolve)=>{
            fs.readFile('./tienda.txt', 'utf8', function(err, data){
                if(err){
                    console.log("¡¡¡¡¡¡Error de lectura de archivo!!!!!!!!")
                }else{
                    let filas = data.split('\n');
                    resolve(filas);
                }
            });
        }
    );
    return promesaLeerArchivo;
}
async function registrarTienda(){
    try{
        const respuesta = await inquirer
            //nombre Mercado
            .prompt([
                {
                    type:'input',
                    name:'nombreTienda',
                    message:'Ingresa el nombre de la tienda de electronica:'
                },
                {
                    type:'input',
                    name: 'cantidadSucursales',
                    message: 'Ingresa la cantidad de sucursales:'
                },
                {
                    type:'input',
                    name: 'nombrePropietario',
                    message: 'Ingresa el nombre del propietario:'
                },
                {
                    type:'input',
                    name: 'cedulaPropietario',
                    message: 'Ingresa la cedula de propietario:'
                }
            ]);
        idTienda=Math.floor(Math.random()*((9999-1)+1));
        nombreTienda = respuesta.nombreTienda;
        idTiendaSymbol = Symbol.for(nombreTienda);
        detalle.propietario=respuesta.nombrePropietario;
        detalle.CI=respuesta.cedulaPropietario;
        cantidadSucursales = respuesta.cantidadSucursales;
        const infoTienda = idTienda+'|'+nombreTienda+'|'+cantidadSucursales+'|'+String(idTiendaSymbol)
            +'|'+detalle.propietario+'|'+detalle.CI+'|'+empleados+'|'+cantidadDeudaSRI+'\n';
        await appendFilaTienda(infoTienda);

    }catch (e){
        console.error(e);
    }
}
async function eliminarTienda(indice){
    let listaTiendas = await getTiendas();
    if(listaTiendas && indice<listaTiendas.length){
        listaTiendas.splice(indice,1);
    }
    await persistTienda(listaTiendas);
}
async function actualizarTienda(indice){
    let listaTiendas = await getTiendas();
    try{
        let datosTienda = listaTiendas[indice].split('|');
        while(true){
            console.log("Has seleccionado la siguiente Tienda:");
            console.log("ID:",datosTienda[0]);
            console.log("1)Nombre de la tienda:",datosTienda[1]);
            console.log("2)Cantidad Sucursales:",datosTienda[2]);
            console.log("Symbol:",datosTienda[3]);
            console.log("Detalle:");
            console.log("   4)Propietario:",datosTienda[4]);
            console.log("   5)CI Propietario:",datosTienda[5]);
            console.log("6)Empleados:",datosTienda[6]);
            console.log("7)Deuda SRI:",datosTienda[7]);
            const respuesta1 =  await inquirer
                .prompt([
                    {
                        type:'input',
                        name:'datoAModificar',
                        message:'Escribe el numero del dato que deseas actualizar:(Para salir presiona la tecla q )'
                    }
                ]);
            try {
                let indice = parseInt(respuesta1.datoAModificar);
                if(indice>datosTienda.length-1){
                    break;
                }
            }catch (e){
                console.log(e);
                break;
            }
            if(respuesta1.datoAModificar)
                if(respuesta1.datoAModificar!='q'){
                    const respuesta2 = await inquirer
                        .prompt([
                            {
                                type:'input',
                                name:'nuevoValor',
                                message:'Escribe el nuevo valor:'
                            }
                        ]);
                    datosTienda[respuesta1.datoAModificar]=respuesta2.nuevoValor;
                }else{
                    break;
                }
        }
        let filaActualizada='';
        for(let indiceInterior in datosTienda){
            if(indiceInterior<datosTienda.length-1){
                filaActualizada=filaActualizada+datosTienda[indiceInterior]+'|';
            }else{
                filaActualizada=filaActualizada+datosTienda[indiceInterior];
            }
        }
        listaTiendas[indice]=filaActualizada;
        const persistencia = await persistTienda(listaTiendas);
    }catch(e){
        console.log("No se puede actualizar porque no hay registros.")
    }
}
function persistTienda(listTienda){
    const promisePersistir = new Promise(
        (resolve, reject)=>{
            let tiendasToPersist=""
            for(let tienda of listTienda){
                if(tienda!=''){
                    tiendasToPersist=tiendasToPersist+tienda+'\n';
                }
            }
            fs.writeFile('./tienda.txt', tiendasToPersist,'utf-8', function (err) {
                if (err) {
                    console.log('¡¡¡Error de persistencia de tiendas!!!');
                }else{
                    console.log('Datos registrados correctamente!');
                    resolve(true);
                }
            });
        }
    )
    return promisePersistir;
}
function appendFilaTienda(filaTienda){
    const promesaAppendArchivo = new Promise(
        (resolve)=>{
            fs.appendFile('./tienda.txt', filaTienda, function (err) {
                if (err) throw err;
                console.log('Registro de tienda correcto!');
                resolve(true);
            });
        }
    );
    return promesaAppendArchivo;
}
module.exports = {registrarMercado: registrarTienda,listarTiendas: listarSupermercados, eliminarMercado: eliminarTienda, actualizarMercado: actualizarTienda, getSupermercados: getTiendas,appendFilaTienda: appendFilaTienda};