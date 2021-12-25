const inquirer = require('inquirer');
const fs = require('fs');
const Console = require("console");
const mercado= require('./tienda.js');

let nombreProducto=String;
let precioConIVA=Number;
let descripcion = {
    categoria:"",
    pesoKg:0,
    devolucion:true,
    proveedor:""
}
let stock=Number;
let disponible = false;
let fechaElaboracion=Date;
let tiendas = [];
function imprimirProducto(){
    console.log("----------PRODUCTO-------------");
    console.log("Nombre:",nombreProducto);
    console.log("Precio Incluido Iva:",precioConIVA);
    console.log("descripcion:",descripcion);
    console.log("Stock:",stock);
    console.log("disponibilidad",disponible);
    console.log("Fecha Elab.:",fechaElaboracion);

}
function validarFecha(fechaCadena){
    let arregloFecha = fechaCadena.split('-');
    if(arregloFecha.length!=3){
        return false;
    }
    try {
        let dia = parseInt(arregloFecha[0]);
        let mes = parseInt(arregloFecha[1]);
        let anio = parseInt(arregloFecha[2]);
        if( dia>31){
            return false;
        }
        if(mes>12){
            return false
        }
    }catch (e) {
        console.log(e);
        return false;
    }
    return true;
}
async function registrarProducto(){
    try{
        const respuestaRegisro = await inquirer.prompt([
            {
                type:'input',
                name:'nombreProducto',
                message:'Ingresa el nombre del producto:'
            },
            {
                type:'input',
                name:'precioProducto',
                message:'Ingresa el precio del producto:'
            },
            {
                type:'input',
                name:'categoria',
                message:'Ingresa la categoria del producto:'
            },
            {
                type:'input',
                name:'pesoProducto',
                message:'Ingresa el peso del producto:'
            },
            {
                type:'input',
                name:'devolucionProducto',
                message:'Ingrese si el producto tiene politica de devolucion:'
            },
            {
                type:'input',
                name:'proveedorProducto',
                message:'Ingresa el proveedor del producto:'
            },
            {
                type:'input',
                name:'stockProducto',
                message:'Ingresa la cantidad de stock del producto:'
            }
        ]);
        //Asignacion variables
        nombreProducto = respuestaRegisro.nombreProducto;
        precioConIVA = parseFloat(respuestaRegisro.precioProducto);
        descripcion.categoria = respuestaRegisro.categoria;
        descripcion.pesoKg = respuestaRegisro.pesoProducto;
        descripcion.devolucion = respuestaRegisro.caloriasProducto;
        descripcion.proveedor= respuestaRegisro.proveedorProducto;
        stock = parseInt(respuestaRegisro.stockProducto);
        if(stock>0){
            disponible=true;
        }else{
            stock=0;
            disponible=false;
        }
        while(true){
            const respuestaFechaElab = await inquirer.prompt([
                {
                    type:'input',
                    name:'fechaElabProducto',
                    message:'Ingresa la fecha de elaboracion del producto:(dd-mm-anio)'
                }
            ]);
            if(validarFecha(respuestaFechaElab.fechaElabProducto)){
                let arregloFecha = respuestaFechaElab.fechaElabProducto.split('-');
                fechaElaboracion=new Date(arregloFecha[2],arregloFecha[1]-1,arregloFecha[0]);
                break;
            }else{
                console.log("Formato fecha no valido.");
            }
        }

        let listaTiendas = await mercado.getSupermercados();
        let listaTiendasProducto = [];
        while (true){
            console.log("****Tiendas Disponibles****");
            for(let i=0;i<listaTiendas.length-1;i++){
                console.log(i,' ',listaTiendas[i]);
            }
            const respuestaTiendas = await inquirer.prompt([
                {
                    type:'input',
                    name:'tiendas',
                    message:'Seleccione las tiendas que ofrecen el producto:(Inserte f para finalizar)'
                }
            ]);
            if(respuestaTiendas.tiendas=='f'){
                tiendas = listaTiendasProducto;
                break;
            }
            let indice = parseInt(respuestaTiendas.tiendas);
            console.log('indice',indice);
            if(indice<listaTiendas.length-1){
                let tienda = listaTiendas.splice(indice,1);
                listaTiendasProducto.push(tienda[0].split('|')[1]);
            }
            console.log("Tiendas que Ofrecen Producto:",listaTiendasProducto);
            if(listaTiendas.length-1==0){
                Console.log("Todas las tiendas disponibles ya han sido añadidos.");
                tiendas = listaTiendasProducto;
                break;
            }
        }
        let filaAInsertar = nombreProducto+'|'+precioConIVA+'|'+descripcion.categoria+'|'+descripcion.pesoKg+'|'
            +descripcion.devolucion+'|'+descripcion.proveedor+'|'+stock+'|'+disponible+'|'+fechaElaboracion+'|'
            +tiendas+'\n';
        await appendFileProd(filaAInsertar);
    }catch (e){
        console.log(e);
    }
}
function getListaProductos(){
    const promesaListaProds = new Promise(
        (resolve,reject)=>{
            fs.readFile('./producto.txt', 'utf8', function(err, data){
                if(err){
                    console.log("¡¡¡¡¡¡Error de lectura de archivo!!!!!!!!")
                    reject(false);
                }else{
                    let filas = data.split('\n');
                    resolve(filas);
                }
            });
        }
    );
    return promesaListaProds;
}
async function listarProductos(){
    let listaProductos = await getListaProductos();
    console.log("------------Productos---------------");
    console.log("indice|nombre|precio|categoria|peso(gr)|devolucion|Proveedor|stock|disponible|fecha elaboracion|Tiendas");
    for(let indProducto in listaProductos){
        if(indProducto< listaProductos.length-1){
            console.log(indProducto,' ', listaProductos[indProducto]);
        }
    }
}
async function eliminarProducto(indice){
    let listaProductos = await getListaProductos();
    if(listaProductos && indice<listaProductos.length){
        listaProductos.splice(indice,1);
    }
    await persistirProductos(listaProductos);
}
async function getListaTiendasDisponibles(mercadosOcupados){
    let listaMercados = await mercado.getSupermercados();
    for(let mercado of mercadosOcupados){
        for(let i=0;i<listaMercados.length-1;i++){
            let arregloMercado = listaMercados[i].split('|');
            if(mercado == arregloMercado[1]){
                listaMercados.splice(i,1);
            }
        }
    }
    return listaMercados;
}
async function actualizarProducto(indice){
    let listaProductos = await getListaProductos();
    try{
        let datosProducto = listaProductos[indice].split('|');
        while(true){
            console.log("Has seleccionado el siguiente Producto:");
            console.log("0)Nombre de producto:",datosProducto[0]);
            console.log("1)Precio:",datosProducto[1]);
            console.log("Descripcion:");
            console.log("   2)Categoria:",datosProducto[2]);
            console.log("   3)Peso Gramos:",datosProducto[3]);
            console.log("   4)Devolucion:",datosProducto[4]);
            console.log("   5)Proveedor:",datosProducto[5]);
            console.log("6)Stock:",datosProducto[6]);
            console.log("Disponibilidad:",datosProducto[7]);
            console.log("8)Fec. Elab.:",datosProducto[8]);
            console.log("9)Tiendas:",datosProducto[9]);
            const respuesta1 =  await inquirer
                .prompt([
                    {
                        type:'input',
                        name:'datoAModificar',
                        message:'Escribe el numero del dato que deseas actualizar:(Para salir presiona la tecla q )'
                    }
                ]);
            if(respuesta1.datoAModificar!='q'){
                while(true){
                    let respuesta2 = undefined;
                    if(respuesta1.datoAModificar=='10'){
                        console.log("*****Actualizar tiendas de producto*****");
                        console.log("Mercados Asociados Actualmente:");
                        console.log(datosProducto[10]);
                        console.log("Lista de acciones:\n1)Agregar nuevos tiendas\n2)Eliminar tiendas\n3)Regresar");
                        const respuestaAccion = await inquirer
                            .prompt([
                                {
                                    type:'input',
                                    name:'opcionAccion',
                                    message:'Ingresa el numeral de la accion que quieras realizar:'
                                }
                            ]);
                        if(respuestaAccion.opcionAccion=='1'){
                            let tiendasOcupados = datosProducto[respuesta1.datoAModificar].split(',');
                            let listaTiendaDisponibles = await getListaTiendasDisponibles(tiendasOcupados);
                            if(listaTiendaDisponibles.length==1){
                                console.log("Se han agregado todos los tiendas a este producto.");
                            }
                            while (true){
                                console.log("---Tiendas Disponibles---")
                                for(let indTiend in listaTiendaDisponibles){
                                    if(indTiend<listaTiendaDisponibles.length-1){
                                        console.log(indTiend,' ', listaTiendaDisponibles[indTiend]);
                                    }
                                }
                                if(listaTiendaDisponibles.length==1){
                                    console.log("****Todos los tiendas han sido agregados a este producto.****");
                                    break;
                                }
                                const respuestaAgregar = await inquirer.prompt([
                                    {
                                        type:'input',
                                        name:'opcionTiendAgregar',
                                        message:'Ingresa el numeral de la tienda a agregar:(Presiones r para regresar)'
                                    }
                                ]);
                                try{
                                    if(respuestaAgregar.opcionTiendAgregar=='r'){
                                        break;
                                    }
                                    let opcionTienda = parseInt(respuestaAgregar.opcionTiendAgregar);
                                    if(opcionTienda<listaTiendaDisponibles.length-1){
                                        let nombreTiendaNuevo = listaTiendaDisponibles[opcionTienda].split('|')[1];
                                        if(datosProducto[respuesta1.datoAModificar]==''){
                                            datosProducto[respuesta1.datoAModificar]=nombreTiendaNuevo;
                                        }else{
                                            datosProducto[respuesta1.datoAModificar]=datosProducto[respuesta1.datoAModificar]+','+nombreTiendaNuevo;
                                        }
                                        listaTiendaDisponibles.splice(opcionTienda,1);
                                    }
                                }catch(e){
                                    console.log(e);
                                    break;
                                }
                            }
                        }else{
                            if(respuestaAccion.opcionAccion=='2'){
                                if(datosProducto[respuesta1.datoAModificar]==''){
                                    console.log("No existen tiendas asociados.");
                                    break;
                                }
                                let tiendasOcupados = datosProducto[respuesta1.datoAModificar].split(',');
                                while (true){
                                    if(tiendasOcupados.length==0){
                                        break;
                                    }
                                    console.log("****Tiendas Actualmente asociados al producto*****");
                                    if(tiendasOcupados.length){
                                        for(let ind in tiendasOcupados){
                                            console.log(ind,' ',tiendasOcupados[ind]);
                                        }
                                    }else{
                                        console.log("No hay ninguna tienda asociado a este producto.");
                                    }
                                    const respuestaTiendaBorrar = await inquirer.prompt([
                                        {
                                            type:'input',
                                            name:'opcionTiendBorrar',
                                            message:'Ingresa el numeral de la tienda a eliminar:(Presiones r para regresar)'
                                        }
                                    ]);
                                    try{
                                        if(respuestaTiendaBorrar.opcionTiendBorrar=='r'){
                                            break;
                                        }
                                        let indiceSeleccion = parseInt(respuestaTiendaBorrar.opcionTiendBorrar);
                                        if(indiceSeleccion<tiendasOcupados.length){
                                            tiendasOcupados.splice(respuestaTiendaBorrar.opcionTiendBorrar,1);
                                            let cadenaDatosProd ='';
                                            for(let indMercado in tiendasOcupados){
                                                if(indMercado < tiendasOcupados.length-1){
                                                    cadenaDatosProd = cadenaDatosProd + tiendasOcupados[indMercado] +',';
                                                }else{
                                                    cadenaDatosProd = cadenaDatosProd + tiendasOcupados[indMercado];
                                                }
                                            }
                                            datosProducto[respuesta1.datoAModificar]=cadenaDatosProd;
                                        }else{
                                            console.log("No se puede borrar la tienda seleccionada.")
                                        }
                                    }catch (e) {
                                        console.log(e);
                                        break;
                                    }
                                }
                            }
                            if(respuestaAccion.opcionAccion=='3'){
                                break;
                            }
                        }
                    }else{
                        respuesta2 = await inquirer
                            .prompt([
                                {
                                    type:'input',
                                    name:'nuevoValor',
                                    message:'Escribe el nuevo valor:'
                                }
                            ]);
                        if(respuesta1.datoAModificar=='8'||respuesta1.datoAModificar=='9'){
                            if(validarFecha(respuesta2.nuevoValor)){
                                let arregloFecha = respuesta2.nuevoValor.split('-');
                                let fechaNueva = new Date(arregloFecha[2],arregloFecha[1]-1,arregloFecha[0]);
                                respuesta2.nuevoValor = fechaNueva.toString();
                            }else {
                                respuesta2.nuevoValor=datosProducto[respuesta1.datoAModificar];
                                console.log("La fecha ingresada no es valida. Recuerde que el formato es dd-mm-aaaa.");
                            }
                        }
                        datosProducto[respuesta1.datoAModificar]=respuesta2.nuevoValor;
                        if(datosProducto[6]<=0){
                            datosProducto[6]=0;
                            datosProducto[7]=false;
                        }else{
                            datosProducto[7]=true;
                        }
                        break;
                    }
                }
            }else{
                break;
            }
        }
        let filaActualizada='';
        for(let indiceInterior in datosProducto){
            if(indiceInterior<datosProducto.length-1){
                filaActualizada=filaActualizada+datosProducto[indiceInterior]+'|';
            }else{
                filaActualizada=filaActualizada+datosProducto[indiceInterior];
            }
        }
        listaProductos[indice]=filaActualizada;
        const persistencia = await persistirProductos(listaProductos);
    }catch (e) {
        console.log("No se puede actualizar porque no existen registros de productos.");
    }
}

function persistirProductos(listaProductos){
    const promisePersistir = new Promise(
        (resolve, reject)=>{
            let productosAPersistir=""
            for(let producto of listaProductos){
                if(producto!=''){
                    productosAPersistir=productosAPersistir+producto+'\n';
                }
            }
            fs.writeFile('./producto.txt', productosAPersistir,'utf-8', function (err) {
                if (err) {
                    console.log('¡¡¡Error de persistencia de productos!!!');
                }else{
                    console.log('Datos registrados correctamente!');
                    resolve(true);
                }
            });
        }
    );
    return promisePersistir;
}
function appendFileProd(filaProd){
    const promesaAppendProd = new Promise(
        (resolve)=>{
            fs.appendFile('./producto.txt', filaProd, function (err) {
                if (err) throw err;
                console.log('¡Registro de producto correcto!');
                resolve(true);
            });
        }
    );
    return promesaAppendProd;
}
module.exports = {registrarProducto,listarProductos,eliminarProducto,actualizarProducto,appendFileProd}