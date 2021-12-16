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
const fs_1 = require("fs");
const settings_1 = require("../../environment/settings");
const elect_store_controller_1 = __importDefault(require("../../elect_store/controllers/elect_store.controller"));
const JSONFilePath = settings_1.DATA_FILE_PATH;
const { readFile, writeFile, appendFile } = fs_1.promises;
class ProductController {
    static createProduct(newProduct, idStore) {
        return __awaiter(this, void 0, void 0, function* () {
            let stores = yield elect_store_controller_1.default.getAllStores();
            const store = stores.find(store => store.id = idStore);
            if (store) {
                const productExists = store.products.filter(product => product.Serie === newProduct.Serie);
                if (productExists.length !== 0) {
                    throw new Error('This product already exists');
                }
                store.products.push(newProduct);
                stores = stores.map(str => str.id === store.id ? Object.assign({}, store) : str);
                writeFile(JSONFilePath, JSON.stringify(stores, null, 4));
            }
        });
    }
    static getAllProducts(idStore) {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield elect_store_controller_1.default.getAllStores();
            const store = stores.find(store => store.id = idStore);
            if (store && store.products !== undefined) {
                return store.products;
            }
            throw new Error('Error in getAllProducts');
        });
    }
    static getProductBySerie(Serie, idStore) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.getAllProducts(idStore);
            const product = products.find(product => product.Serie === Serie);
            if (product) {
                return product;
            }
            else {
                throw new Error("This product doesn't exist");
            }
        });
    }
    static updateProduct(productModified, idStore) {
        return __awaiter(this, void 0, void 0, function* () {
            let stores = yield elect_store_controller_1.default.getAllStores();
            const store = stores.find(store => store.id = idStore);
            if (store) {
                const productExists = store.products.filter(product => product.Serie === productModified.Serie);
                if (productExists.length !== 0) {
                    throw new Error('This product doesnt exist');
                }
                store.products.push(productModified);
                yield elect_store_controller_1.default.updateStore(store);
            }
            else {
                throw new Error('Imposible to update a product that is not stored in a store');
            }
        });
    }
    static deleteProductBySerie(SerieProduct, idStore) {
        return __awaiter(this, void 0, void 0, function* () {
            let stores = yield elect_store_controller_1.default.getAllStores();
            const store = stores.find(store => store.id = idStore);
            if (store) {
                const productExists = store.products.filter(product => product.Serie === SerieProduct);
                if (productExists.length !== 0) {
                    throw new Error('This product doesnt exist');
                }
                store.products = store.products.filter(product => product.Serie !== SerieProduct);
                yield elect_store_controller_1.default.updateStore(store);
            }
            else {
                throw new Error('Imposible to delete a product that is not stored in a store');
            }
        });
    }
}
exports.default = ProductController;
