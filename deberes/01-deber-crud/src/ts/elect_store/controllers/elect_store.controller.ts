import { promises } from "fs";
import Elect_Product from "../../elect_product/entities/elect_product.entity";
import Elect_Store from "../entities/elect_store.entity";
import { DATA_FILE_PATH } from "../../environment/settings";

const JSONFilePath = DATA_FILE_PATH
const { readFile, writeFile, appendFile } = promises;


export default class ElectStoreController {
    static async createProduct(newElectStore: Elect_Store) {
        const content = await readFile(JSONFilePath, 'utf-8');
        if (content !== '') {
            const stores = await this.getAllStores();
            const storesExists = stores.filter(store => store.id === newElectStore.id)
            if (storesExists.length !== 0) {
                throw new Error('This store already exists');
            }
            stores.push(newElectStore);
            writeFile(JSONFilePath, JSON.stringify(stores, null, 4));
        } else {
            writeFile(JSONFilePath, JSON.stringify([newElectStore], null, 4));
        }
    }

    static async getAllStores(): Promise<Elect_Store[]> {
        const products = await readFile(
            JSONFilePath,
            { encoding: 'utf-8' },
        )
        try {
            return JSON.parse(products)
        } catch (error) {
            throw new Error("An error has ocurred")
        }
    }

    static async getStoreById(idStore: number): Promise<Elect_Store> {
        const stores = await this.getAllStores();
        const store = stores.find(store => store.id === idStore);
        if (store) {
            return store
        } else {
            throw new Error("This library doesn't exist")
        }
    }

    static async updateStore(storeModified: Elect_Store) {
        const stores = await this.getAllStores()
        const storeExists = stores.filter(store => store.id === storeModified.id)
        if (storeExists.length === 0) {
            throw new Error('Imposible to update');
        }
        const storesAfterUpdate = stores.map(store => {
            if (store.id == storeModified.id) {
                store = storeModified
            }
            return store;
        })
        await writeFile(JSONFilePath, JSON.stringify(storesAfterUpdate, null, 4))
    }

    static async deleteStoreById(idStore: number) {
        const stores = await this.getAllStores()
        const storeExists = stores.filter(store => store.id === idStore)
        if (storeExists.length === 0) {
            throw new Error('Imposible to delete a product that is not stored');
        }
        const storesAfterDelete = stores.filter(store => store.id !== idStore)
        await writeFile(JSONFilePath, JSON.stringify(storesAfterDelete, null, 4))
    }
}