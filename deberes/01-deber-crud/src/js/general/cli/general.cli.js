"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOption = exports.askForOperation = exports.askForModule = void 0;
const inquirer = __importStar(require("inquirer"));
const create_elect_store_1 = require("../../elect_store/cli/create.elect_store");
const read_elect_store_1 = require("../../elect_store/cli/read.elect_store");
const update_elect_store_1 = require("../../elect_store/cli/update.elect_store");
const delete_elect_store_1 = require("../../elect_store/cli/delete.elect_store");
const create_elect_product_1 = require("../../elect_product/cli/create.elect_product");
const read_elect_product_1 = require("../../elect_product/cli/read.elect_product");
const update_elect_product_1 = require("../../elect_product/cli/update.elect_product");
const delete_elect_product_1 = require("../../elect_product/cli/delete.elect_product");
const askForModule = () => {
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
};
exports.askForModule = askForModule;
const askForOperation = (moduleName) => {
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
};
exports.askForOperation = askForOperation;
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
const processOption = (crudOperation, runApp) => __awaiter(void 0, void 0, void 0, function* () {
    switch (crudOperation) {
        // Library
        case storeOptions.create:
            yield (0, create_elect_store_1.askInformationToCreateAStore)();
            console.log('Se ha creado correctamente una biblioteca');
            break;
        case storeOptions.read[0]:
            yield (0, read_elect_store_1.showStores)();
            break;
        case storeOptions.read[1]: // by id
            const library = yield (0, read_elect_store_1.showAStoreById)();
            console.log(library);
            break;
        case storeOptions.update:
            yield (0, update_elect_store_1.askInformationToUpdateAStore)();
            console.log('La tienda ha sido actualizada');
            break;
        case storeOptions.delete:
            yield (0, delete_elect_store_1.askToDeleteAStore)();
            console.log('La tienda ha sido eliminada');
            break;
        // Book
        case productOptions.create:
            yield (0, create_elect_product_1.askInformationToCreateAProduct)();
            console.log('Se ha creado correctamente un producto.');
            break;
        case productOptions.read[0]:
            yield (0, read_elect_product_1.showProducts)();
            break;
        case productOptions.read[1]: // by id
            const product = yield (0, read_elect_product_1.askToGetAProductBySerie)();
            console.log(product.product);
            break;
        case productOptions.update:
            yield (0, update_elect_product_1.askToUpdateAProduct)();
            break;
        case productOptions.delete:
            yield (0, delete_elect_product_1.askToDeleteAProduct)();
            console.log('El producto ha sido eliminado');
            break;
        case 'Volver':
            yield runApp();
            break;
    }
});
exports.processOption = processOption;
