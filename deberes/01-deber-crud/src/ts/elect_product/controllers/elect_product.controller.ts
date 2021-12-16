import { promises } from "fs";
import Product from "../entities/elect_product.entity";
import { DATA_FILE_PATH } from "../../environment/settings";
import StoreController from "../../elect_store/controllers/elect_store.controller";

const JSONFilePath = DATA_FILE_PATH
const { readFile, writeFile, appendFile } = promises;


export default class ProductController {
    static async createProduct(newProduct: Product, idStore: number) {
        let stores = await StoreController.getAllStores();
        const store = stores.find(store => store.id = idStore);
        if (store) {
            const productExists = store.products.filter(product => product.Serie === newProduct.Serie)
            if (productExists.length !== 0) {
                throw new Error('This product already exists');
            }
            store.products.push(newProduct);
            stores = stores.map(
                str => str.id === store.id ? {...store} : str
            )
            writeFile(JSONFilePath, JSON.stringify(stores, null, 4));
        }
    }


    static async getAllProducts(idStore: number): Promise<Product[]> {
        const stores = await StoreController.getAllStores();
        const store = stores.find(store => store.id = idStore);
        if (store && store.products !== undefined) {
            return store.products
        }
        throw new Error('Error in getAllProducts')
    }

    static async getProductBySerie(Serie: string, idStore: number): Promise<Product> {
        const products = await this.getAllProducts(idStore);
        const product = products.find(product => product.Serie === Serie);
        if (product) {
            return product
        } else {
            throw new Error("This product doesn't exist")
        }
    }

    static async updateProduct(productModified: Product, idStore: number) {
        let stores = await StoreController.getAllStores();
        const store = stores.find(store => store.id = idStore);
        if (store) {
            const productExists = store.products.filter(product => product.Serie === productModified.Serie)
            if (productExists.length !== 0) {
                throw new Error('This product doesnt exist');
            }
            store.products.push(productModified);
            await StoreController.updateStore(store)
        }else{
            throw new Error('Imposible to update a product that is not stored in a store');
        }
    }

    static async deleteProductBySerie(SerieProduct: string, idStore: number) {
        let stores = await StoreController.getAllStores();
        const store = stores.find(store => store.id = idStore);
        if (store) {
            const productExists = store.products.filter(product => product.Serie === SerieProduct)
            if (productExists.length !== 0) {
                throw new Error('This product doesnt exist');
            }
            store.products = store.products.filter(product => product.Serie !== SerieProduct);
            await StoreController.updateStore(store);
        }else{
            throw new Error('Imposible to delete a product that is not stored in a store');
        }
    }
}