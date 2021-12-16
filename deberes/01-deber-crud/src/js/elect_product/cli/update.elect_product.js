"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askToUpdateAProduct = exports.getProductByFormat = exports.getQuestionsForSelectAProduct = exports.setFormatProduct = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const update_elect_store_1 = require("../../elect_store/cli/update.elect_store");
const elect_store_controller_1 = __importDefault(require("../../elect_store/controllers/elect_store.controller"));
const elect_product_controller_1 = __importDefault(require("../controllers/elect_product.controller"));
const setFormatProduct = (product) => {
    return `SERIE: ${product.Serie} - NOMBRE: ${product.name} - MARCA: ${product.brand} [${product.available ? "DISPONIBLE" : "NO DISPONIBLE"}]`;
};
exports.setFormatProduct = setFormatProduct;
const getQuestionsForSelectAProduct = (products) => {
    const formatProducts = products.map(product => (0, exports.setFormatProduct)(product));
    return [
        {
            type: 'list',
            name: 'product',
            message: "Seleccione un producto:",
            choices: formatProducts,
        },
    ];
};
exports.getQuestionsForSelectAProduct = getQuestionsForSelectAProduct;
const getQuestionsForModifyAProduct = (productSelected) => {
    return [
        {
            type: 'input',
            name: 'name',
            message: "¿Cuál es el nombre del producto?",
            default() {
                return productSelected.name;
            },
        }, {
            type: 'input',
            name: 'brand',
            message: "¿Cual es la marca del producto?",
            default() {
                return productSelected.brand;
            },
        },
        {
            type: 'date',
            name: 'datePublished',
            message: "¿Cuál es la fecha de adquisicion del producto?",
            format: { month: "short", hour: undefined, minute: undefined },
            clearable: true,
            default() {
                return new Date(productSelected.datePurchase);
            },
        },
        {
            type: 'list',
            name: 'available',
            message: "¿Está disponible el producto?",
            choices: ['Sí', 'No'],
            filter(val) {
                return val === 'Sí' ? true : false;
            },
            default() {
                return productSelected.available;
            },
        },
    ];
};
const getProductByFormat = (products, productSelected) => {
    return products.filter(product => (0, exports.setFormatProduct)(product) === productSelected)[0];
};
exports.getProductByFormat = getProductByFormat;
const askToUpdateAProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield elect_store_controller_1.default.getAllStores();
    const selection = yield inquirer_1.default.prompt((0, update_elect_store_1.getQuestionsForSelectStore)(stores));
    const store = (0, update_elect_store_1.getStoreByFormat)(stores, selection.store);
    const products = yield elect_product_controller_1.default.getAllProducts(store.id);
    const productSelected = yield inquirer_1.default.prompt((0, exports.getQuestionsForSelectAProduct)(products));
    const product = (0, exports.getProductByFormat)(products, productSelected.product);
    const userInput = yield inquirer_1.default.prompt(getQuestionsForModifyAProduct(product));
    const productModified = Object.assign({ SERIE: product.Serie }, userInput);
    return elect_product_controller_1.default.updateProduct(productModified, store.id);
});
exports.askToUpdateAProduct = askToUpdateAProduct;
