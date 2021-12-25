const producto= require('./producto.js');
const tienda= require('./tienda.js');
const inquirer= require('inquirer');
const Console = require("console");
async function principalMenu(){
    let flag = true;
    while (flag){
        console.log("****************TIENDAS DE ELECTRONICA EPN*******************");
        console.log("Seleccione el modulo en el que va trabajar");
        console.log("1)Tienda Electronica\n2)Producto Electronico");
        const answer = await inquirer
            .prompt([
                {
                    type:'input',
                    name: 'opcionMenuPrincipal',
                    message: 'Ingrese el numeral correspondiente a la opcion:(Presione otra tecla para salir)'
                }
            ]);
        switch (answer.opcionMenuPrincipal) {
            case '1':
                console.log("***********Modulo Tienda Electronica************");
                await selectStore();
                break;
            case '2':
                console.log("************Modulo Productos Electronicos*************");
                await seleccionarCRUDProductos();
                break;
            default:
                flag=false;
                break;
        }
    }
}
async function selectStore(){
    let flag = true;
    while(flag){
        await tienda.listarTiendas().then(
            async (data)=>{
                console.log("1)Registrar\n2)Actualizar\n3)Eliminar");
                const selection =  await inquirer.
                prompt([
                    {
                        type:'input',
                        name: 'optionStoreCRUD',
                        message: 'Ingrese el numeral correspondiente a la opcion:'
                    }
                ]);
                switch (selection.optionStoreCRUD){
                    case '1':
                        await tienda.registrarMercado();
                        break;
                    case '2':
                        await tienda.listarTiendas();
                        const storeID = await inquirer.prompt([
                            {
                                type:'input',
                                name: 'optionStore',
                                message: 'Ingrese el id correspondiente a la tienda:'
                            }
                        ]);
                        await tienda.actualizarMercado(storeID.optionStore);
                        break;
                    case '3':
                        await tienda.listarTiendas();
                        const storeDelete = await inquirer.prompt([
                            {
                                type:'input',
                                name: 'storeDeleteOption',
                                message: 'Ingrese el id correspondiente al tienda que desee borrar:'
                            }
                        ]);
                        await tienda.eliminarMercado(storeDelete.storeDeleteOption);
                        break;
                    default:
                        flag=false;
                        Console.log("Salio de Tienda");
                        break;
                }
            }
        )
            .catch(
                async (error)=>{
                    console.log("Creando archivo...");
                    await tienda.appendFilaTienda("");
                }
            );

    }

}
async function  seleccionarCRUDProductos(){
    let continuarCRUDProd = true;
    while(continuarCRUDProd){
        await producto.listarProductos().then(
            async ()=>{
                console.log("1)Registrar\n2)Actualizar\n3)Eliminar");
                const seleccion =  await inquirer.
                prompt([
                    {
                        type:'input',
                        name: 'opcionProdCRUD',
                        message: 'Ingrese el id correspondiente a la opcion:'
                    }
                ]);
                switch (seleccion.opcionProdCRUD){
                    case '1':
                        await producto.registrarProducto();
                        break;
                    case '2':
                        await producto.listarProductos();
                        const prodIndice = await inquirer.prompt([
                            {
                                type:'input',
                                name: 'opcionProd',
                                message: 'Ingrese el id correspondiente al producto:'
                            }
                        ]);
                        await producto.actualizarProducto(prodIndice.opcionProd);
                        break;
                    case '3':
                        await producto.listarProductos();
                        const prodABorrar= await inquirer.prompt([
                            {
                                type:'input',
                                name: 'opcionProdBorrar',
                                message: 'Ingrese el id correspondiente al producto que desee borrar:'
                            }
                        ]);
                        await producto.eliminarProducto(prodABorrar.opcionProdBorrar);
                        break;
                    default:
                        continuarCRUDProd=false;
                        Console.log("Salio de Producto");
                        break;
                }
            }
        ).catch(
            async ()=>{
                console.log("Escribiendo archivo ...");
                await producto.appendFileProd("");
            }
        );

    }
}
principalMenu();