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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const settings_1 = require("../../environment/settings");
const JSONFilePath = settings_1.DATA_FILE_PATH;
const { readFile, writeFile, appendFile } = fs_1.promises;
class ElectStoreController {
    static createProduct(newElectStore) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield readFile(JSONFilePath, 'utf-8');
            if (content !== '') {
                const stores = yield this.getAllStores();
                const storesExists = stores.filter(store => store.id === newElectStore.id);
                if (storesExists.length !== 0) {
                    throw new Error('This store already exists');
                }
                stores.push(newElectStore);
                writeFile(JSONFilePath, JSON.stringify(stores, null, 4));
            }
            else {
                writeFile(JSONFilePath, JSON.stringify([newElectStore], null, 4));
            }
        });
    }
    static getAllStores() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield readFile(JSONFilePath, { encoding: 'utf-8' });
            try {
                return JSON.parse(products);
            }
            catch (error) {
                throw new Error("An error has ocurred");
            }
        });
    }
    static getStoreById(idStore) {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield this.getAllStores();
            const store = stores.find(store => store.id === idStore);
            if (store) {
                return store;
            }
            else {
                throw new Error("This library doesn't exist");
            }
        });
    }
    static updateStore(storeModified) {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield this.getAllStores();
            const storeExists = stores.filter(store => store.id === storeModified.id);
            if (storeExists.length === 0) {
                throw new Error('Imposible to update');
            }
            const storesAfterUpdate = stores.map(store => {
                if (store.id == storeModified.id) {
                    store = storeModified;
                }
                return store;
            });
            yield writeFile(JSONFilePath, JSON.stringify(storesAfterUpdate, null, 4));
        });
    }
    static deleteStoreById(idStore) {
        return __awaiter(this, void 0, void 0, function* () {
            const stores = yield this.getAllStores();
            const storeExists = stores.filter(store => store.id === idStore);
            if (storeExists.length === 0) {
                throw new Error('Imposible to delete a product that is not stored');
            }
            const storesAfterDelete = stores.filter(store => store.id !== idStore);
            yield writeFile(JSONFilePath, JSON.stringify(storesAfterDelete, null, 4));
        });
    }
}
exports.default = ElectStoreController;
