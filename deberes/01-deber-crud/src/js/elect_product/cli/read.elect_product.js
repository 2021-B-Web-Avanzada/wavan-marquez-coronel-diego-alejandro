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
exports.askToGetAProductBySerie = exports.showProducts = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const update_elect_store_1 = require("../../elect_store/cli/update.elect_store");
const elect_store_controller_1 = __importDefault(require("../../elect_store/controllers/elect_store.controller"));
const elect_product_controller_1 = __importDefault(require("../controllers/elect_product.controller"));
const update_elect_product_1 = require("./update.elect_product");
const showProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield elect_store_controller_1.default.getAllStores();
    const selection = yield inquirer_1.default.prompt((0, update_elect_store_1.getQuestionsForSelectStore)(stores));
    const store = (0, update_elect_store_1.getStoreByFormat)(stores, selection.store);
    const products = yield elect_product_controller_1.default.getAllProducts(store.id);
    products.forEach(product => {
        console.log((0, update_elect_product_1.setFormatProduct)(product));
    });
});
exports.showProducts = showProducts;
const askToGetAProductBySerie = () => __awaiter(void 0, void 0, void 0, function* () {
    const stores = yield elect_store_controller_1.default.getAllStores();
    const selection = yield inquirer_1.default.prompt((0, update_elect_store_1.getQuestionsForSelectStore)(stores));
    const store = (0, update_elect_store_1.getStoreByFormat)(stores, selection.store);
    const products = yield elect_product_controller_1.default.getAllProducts(store.id);
    return yield inquirer_1.default.prompt((0, update_elect_product_1.getQuestionsForSelectAProduct)(products));
});
exports.askToGetAProductBySerie = askToGetAProductBySerie;
