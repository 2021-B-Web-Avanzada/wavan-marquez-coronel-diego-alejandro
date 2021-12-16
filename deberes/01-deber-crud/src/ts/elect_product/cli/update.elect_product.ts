import inquirer from 'inquirer'
import { getStoreByFormat, getQuestionsForSelectStore } from '../../elect_store/cli/update.elect_store';
import StoreController from '../../elect_store/controllers/elect_store.controller';
import ProductController from '../controllers/elect_product.controller';
import Product from '../entities/elect_product.entity';
import { showProducts } from './read.elect_product';



export const setFormatProduct = (product: Product) => {
    return `SERIE: ${product.Serie} - NOMBRE: ${product.name} - MARCA: ${product.brand} [${product.available ? "DISPONIBLE" : "NO DISPONIBLE"}]`
}

export const getQuestionsForSelectAProduct = (products: Array<Product>) => {
    const formatProducts = products.map(product => setFormatProduct(product));
    return [
        {
            type: 'list',
            name: 'product',
            message: "Seleccione un producto:",
            choices: formatProducts,
        },
    ];
}

const getQuestionsForModifyAProduct = (productSelected: Product) => {
    return [
        {
            type: 'input',
            name: 'name',
            message: "¿Cuál es el nombre del producto?",
            default() {
                return productSelected.name;
            },
        }, {
            type: 'input',
            name: 'brand',
            message: "¿Cual es la marca del producto?",
            default() {
                return productSelected.brand;
            },
        },
        {
            type: 'date',
            name: 'datePublished',
            message: "¿Cuál es la fecha de adquisicion del producto?",
            format: { month: "short", hour: undefined, minute: undefined },
            clearable: true,
            default() {
                return new Date(productSelected.datePurchase);
            },
        },
        {
            type: 'list',
            name: 'available',
            message: "¿Está disponible el producto?",
            choices: ['Sí', 'No'],
            filter(val: string) {
                return val === 'Sí' ? true : false;
            },
            default() {
                return productSelected.available;
            },
        },
    ];
}

export const getProductByFormat = (products: Array<Product>, productSelected: string): Product => {
    return products.filter(product => setFormatProduct(product) === productSelected)[0]
}

export const askToUpdateAProduct = async () => {
    const stores = await StoreController.getAllStores();
    const selection = await inquirer.prompt(getQuestionsForSelectStore(stores));
    const store = getStoreByFormat(stores, selection.store);
    const products = await ProductController.getAllProducts(store.id);
    const productSelected = await inquirer.prompt(getQuestionsForSelectAProduct(products));
    const product = getProductByFormat(products, productSelected.product);
    const userInput = await inquirer.prompt(getQuestionsForModifyAProduct(product));

    const productModified: Product = {
        SERIE: product.Serie,
        ...userInput
    }

    return ProductController.updateProduct(productModified, store.id);
}