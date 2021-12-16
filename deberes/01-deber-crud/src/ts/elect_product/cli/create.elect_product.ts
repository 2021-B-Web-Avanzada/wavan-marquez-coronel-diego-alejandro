import inquirer from 'inquirer'
import { getStoreByFormat, getQuestionsForSelectStore } from '../../elect_store/cli/update.elect_store';
import StoreController from '../../elect_store/controllers/elect_store.controller';
import ProductController from '../controllers/elect_product.controller';
import Product from '../entities/elect_product.entity';
inquirer.registerPrompt("date", require("inquirer-date-prompt"));


const questions = [
    {
        type: 'input',
        name: 'Serie',
        message: "¿Cuál es el numero de serie del producto?",
        validate(value: string) {
            const pass = value.match(
                /\d{2}-\d{3}-\d{6}/gm
            );
            if (pass) {
                return true;
            }
            return 'Por favor ingrese un numero de serie válido.';
        },
    },
    {
        type: 'input',
        name: 'name',
        message: "¿Cuál es el nombre del producto?",
    }, {
        type: 'input',
        name: 'brand',
        message: "¿Que marca es el producto?",
    },
    {
        type: 'date',
        name: 'datePurchase',
        message: "¿Cuál es la fecha de adquisicion de compra del producto?",
        format: { month: "short", hour: undefined, minute: undefined },
        clearable: true,
    },
    {
        type: 'list',
        name: 'available',
        message: "¿Está disponible el producto?",
        choices: ['Sí', 'No'],
        filter(val: string) {
            return val === 'Sí' ? true : false;
        },
    },
];

export const askInformationToCreateAProduct = async () => {
    const stores = await StoreController.getAllStores();
    const selection = await inquirer.prompt(getQuestionsForSelectStore(stores));
    const newProduct : Product = await inquirer.prompt(questions);
    const store = getStoreByFormat(stores, selection.store);
    return ProductController.createProduct(newProduct, store.id);
}