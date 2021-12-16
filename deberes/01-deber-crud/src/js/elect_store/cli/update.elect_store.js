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
exports.askInformationToUpdateAStore = exports.getStoreByFormat = exports.getQuestionsForSelectStore = exports.setFormatStore = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const elect_store_controller_1 = __importDefault(require("../controllers/elect_store.controller"));
inquirer_1.default.registerPrompt("date", require("inquirer-date-prompt"));
const setFormatStore = (store) => {
    return `ID: ${store.id} - Lugar: ${store.location} - Responsable: ${store.responsable}`;
};
exports.setFormatStore = setFormatStore;
const getQuestionsForSelectStore = (stores) => {
    const formatStores = stores.map(store => (0, exports.setFormatStore)(store));
    return [
        {
            type: 'list',
            name: 'store',
            message: "Seleccione una tienda:",
            choices: formatStores,
        },
    ];
};
exports.getQuestionsForSelectStore = getQuestionsForSelectStore;
const getQuestionsUpdateStore = (store) => {
    return [
        {
            type: 'list',
            name: 'location',
            message: "¿Seleccione la ubicación de la tienda?",
            choices: [
                "QUITO", "GUAYAQUIL", "CUENCA", "IBARRA",
                "ESMERALDAS", "LOJA", "PUYO", "MANTA"
            ],
            default() {
                return store.location;
            },
        },
        {
            type: 'input',
            name: 'responsable',
            message: "¿Ingrese el nombre del responsable?",
            default() {
                return store.responsable;
            },
        },
        {
            type: 'date',
            name: 'openingHour',
            message: "¿Cuál es la hora de atención?",
            format: { month: undefined, year: undefined, day: undefined, hour: "numeric", minute: "numeric" },
            clearable: true,
            default() {
                return new Date(store.openingHour);
            },
        }
    ];
};
const getStoreByFormat = (stores, storeSelected) => {
    return stores.filter(store => (0, exports.setFormatStore)(store) === storeSelected)[0];
};
exports.getStoreByFormat = getStoreByFormat;
const askInformationToUpdateAStore = () => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield elect_store_controller_1.default.getAllStores();
    const selection = yield inquirer_1.default.prompt((0, exports.getQuestionsForSelectStore)(stores));
    const store = (0, exports.getStoreByFormat)(stores, selection.library);
    const userInput = yield inquirer_1.default.prompt(getQuestionsUpdateStore(store));
    const storeModified = Object.assign({ id: store.id, books: store.products }, userInput);
    return elect_store_controller_1.default.updateStore(storeModified);
});
exports.askInformationToUpdateAStore = askInformationToUpdateAStore;
