import inquirer from 'inquirer'
import { getStoreByFormat, getQuestionsForSelectStore } from '../../elect_store/cli/update.elect_store';
import StoreController from '../../elect_store/controllers/elect_store.controller';
import ProductController from '../controllers/elect_product.controller';
import { getProductByFormat, getQuestionsForSelectAProduct } from './update.elect_product';


export const askToDeleteAProduct = async () => {
    const stores = await StoreController.getAllStores();
    const selection = await inquirer.prompt(getQuestionsForSelectStore(stores));
    const store = getStoreByFormat(stores, selection.store);
    const products = await ProductController.getAllProducts(store.id);
    const productSelected = await inquirer.prompt(getQuestionsForSelectAProduct(products));
    const product = getProductByFormat(products, productSelected.product);
    return ProductController.deleteProductBySerie(product.Serie, store.id);
}