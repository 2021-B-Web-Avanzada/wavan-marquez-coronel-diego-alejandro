import inquirer from 'inquirer'
import { getStoreByFormat, getQuestionsForSelectStore } from '../../elect_store/cli/update.elect_store';
import StoreController from '../../elect_store/controllers/elect_store.controller';
import Store from '../../elect_store/entities/elect_store.entity'
import ProductController from '../controllers/elect_product.controller';
import Product from '../entities/elect_product.entity';
import { getProductByFormat, getQuestionsForSelectAProduct, setFormatProduct } from './update.elect_product';


export const showProducts = async () => {
    const stores = await StoreController.getAllStores();
    const selection = await inquirer.prompt(getQuestionsForSelectStore(stores));
    const store = getStoreByFormat(stores, selection.store);
    const products = await ProductController.getAllProducts(store.id);
    products.forEach(product => {
        console.log(setFormatProduct(product));
    });
}


export const askToGetAProductBySerie = async () => {
    const stores = await StoreController.getAllStores();
    const selection = await inquirer.prompt(getQuestionsForSelectStore(stores));
    const store = getStoreByFormat(stores, selection.store);
    const products = await ProductController.getAllProducts(store.id);
    return await inquirer.prompt(getQuestionsForSelectAProduct(products));
}