import * as inquirer from 'inquirer'
import {askInformationToCreateAStore} from "../../elect_store/cli/create.elect_store";
import {showAStoreById, showStores} from "../../elect_store/cli/read.elect_store";
import {askInformationToUpdateAStore} from "../../elect_store/cli/update.elect_store";
import {askToDeleteAStore} from "../../elect_store/cli/delete.elect_store";
import {askInformationToCreateAProduct} from "../../elect_product/cli/create.elect_product";
import {askToGetAProductBySerie, showProducts} from "../../elect_product/cli/read.elect_product";
import {askToUpdateAProduct} from "../../elect_product/cli/update.elect_product";
import {askToDeleteAProduct} from "../../elect_product/cli/delete.elect_product";

export const askForModule = (): Promise<any> => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'module',
            message: 'Bievenido a ELECTRONICA POLITECNICA. Elija el modulo donde va a trabajar:.',
            choices: [
                'Tiendas',
                'Productos',
                new inquirer.Separator(),
                'Salir del programa',
            ],
        }
    ]);
}

export const askForOperation = (moduleName: string): Promise<any> => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'crudOperation',
            message: '¿Qué deseas hacer?',
            choices: [
                `Crear ${moduleName.slice(-1) === 'a' ? 'una' : 'un'} ${moduleName.toLowerCase()}`,
                `Consultar ${moduleName.slice(-1) === 'a' ? 'todas las' : 'todos los'} ${moduleName.toLowerCase()}s`,
                `Consultar ${moduleName.slice(-1) === 'a' ? 'una' : 'un'} ${moduleName.toLowerCase()} por su ID`,
                `Actualizar ${moduleName.slice(-1) === 'a' ? 'una' : 'un'} ${moduleName.toLowerCase()}`,
                `Eliminar ${moduleName.slice(-1) === 'a' ? 'una' : 'un'} ${moduleName.toLowerCase()}`,
                new inquirer.Separator(),
                'Volver',
            ],
        }
    ]);
}
const productOptions = {
    create: 'Crear un producto',
    read: ['Consultar todos los productos',
        'Consultar un producto por su Serie'],
    update: 'Actualizar un product',
    delete: 'Eliminar un producto',
};

const storeOptions = {
    create: 'Crear una tienda',
    read: ['Consultar todas las tiendas',
        'Consultar una tienda por su ID'],
    update: 'Actualizar una tienda',
    delete: 'Eliminar una tienda',
};

export const processOption = async (crudOperation: string, runApp: Function) => {
    switch (crudOperation) {
        // Library
        case storeOptions.create:
            await askInformationToCreateAStore();
            console.log('Se ha creado correctamente una biblioteca')
            break;
        case storeOptions.read[0]:
            await showStores();
            break;
        case storeOptions.read[1]: // by id
            const library = await showAStoreById()
            console.log(library);
            break;
        case storeOptions.update:
            await askInformationToUpdateAStore();
            console.log('La tienda ha sido actualizada');
            break;
        case storeOptions.delete:
            await askToDeleteAStore();
            console.log('La tienda ha sido eliminada');
            break;
        // Book
        case productOptions.create:
            await askInformationToCreateAProduct();
            console.log('Se ha creado correctamente un producto.');
            break;
        case productOptions.read[0]:
            await showProducts();
            break;
        case productOptions.read[1]: // by id
            const product = await askToGetAProductBySerie();
            console.log(product.product);
            break;
        case productOptions.update:
            await askToUpdateAProduct();
            break;
        case productOptions.delete:
            await askToDeleteAProduct();
            console.log('El producto ha sido eliminado');
            break;
        case 'Volver':
            await runApp();
            break;
    }
}