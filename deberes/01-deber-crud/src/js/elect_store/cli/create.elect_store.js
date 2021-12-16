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
exports.askInformationToCreateAStore = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const elect_store_controller_1 = __importDefault(require("../controllers/elect_store.controller"));
inquirer_1.default.registerPrompt("date", require("inquirer-date-prompt"));
const questionsForCreateStore = [
    {
        type: 'input',
        name: 'id',
        message: "¿Cuál es el identificador de la tienda?",
        validate(value) {
            const pass = value.match(/^[0-9]{1,5}$/i);
            return (pass) ? true : 'Por favor ingrese un identificador entero válido.';
        }
    },
    {
        type: 'list',
        name: 'location',
        message: "¿Seleccione la ubicación de la tienda?",
        choices: [
            "QUITO", "GUAYAQUIL", "CUENCA", "IBARRA",
            "ESMERALDAS", "LOJA", "PUYO", "MANTA"
        ]
    },
    {
        type: 'input',
        name: 'responsable',
        message: "¿Ingrese el nombre del responsable de la tienda?",
    },
    {
        type: 'date',
        name: 'openingHour',
        message: "¿Cuál es la hora de atención de la tienda?",
        format: { month: undefined, year: undefined, day: undefined, hour: "numeric", minute: "numeric" },
        clearable: true,
    }
];
const askInformationToCreateAStore = () => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = yield inquirer_1.default.prompt(questionsForCreateStore);
    const newStore = Object.assign(Object.assign({ id: parseInt(userInput.id) }, userInput), { products: [] });
    return elect_store_controller_1.default.createProduct(newStore);
});
exports.askInformationToCreateAStore = askInformationToCreateAStore;
