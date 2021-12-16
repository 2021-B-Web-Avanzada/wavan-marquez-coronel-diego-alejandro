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
exports.askInformationToCreateAProduct = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const update_elect_store_1 = require("../../elect_store/cli/update.elect_store");
const elect_store_controller_1 = __importDefault(require("../../elect_store/controllers/elect_store.controller"));
const elect_product_controller_1 = __importDefault(require("../controllers/elect_product.controller"));
inquirer_1.default.registerPrompt("date", require("inquirer-date-prompt"));
const questions = [
    {
        type: 'input',
        name: 'Serie',
        message: "¿Cuál es el numero de serie del producto?",
        validate(value) {
            const pass = value.match(/\d{2}-\d{3}-\d{6}/gm);
            if (pass) {
                return true;
            }
            return 'Por favor ingrese un numero de serie válido.';
        },
    },
    {
        type: 'input',
        name: 'name',
        message: "¿Cuál es el nombre del producto?",
    }, {
        type: 'input',
        name: 'brand',
        message: "¿Que marca es el producto?",
    },
    {
        type: 'date',
        name: 'datePurchase',
        message: "¿Cuál es la fecha de adquisicion de compra del producto?",
        format: { month: "short", hour: undefined, minute: undefined },
        clearable: true,
    },
    {
        type: 'list',
        name: 'available',
        message: "¿Está disponible el producto?",
        choices: ['Sí', 'No'],
        filter(val) {
            return val === 'Sí' ? true : false;
        },
    },
];
const askInformationToCreateAProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield elect_store_controller_1.default.getAllStores();
    const selection = yield inquirer_1.default.prompt((0, update_elect_store_1.getQuestionsForSelectStore)(stores));
    const newProduct = yield inquirer_1.default.prompt(questions);
    const store = (0, update_elect_store_1.getStoreByFormat)(stores, selection.store);
    return elect_product_controller_1.default.createProduct(newProduct, store.id);
});
exports.askInformationToCreateAProduct = askInformationToCreateAProduct;
