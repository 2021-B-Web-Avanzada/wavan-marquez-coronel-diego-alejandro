import inquirer from 'inquirer';
import StoreController from '../controllers/elect_store.controller';
import { getStoreByFormat, getQuestionsForSelectStore, setFormatStore } from './update.elect_store';

export const showStores = async () => {
    const stores = await StoreController.getAllStores();
    stores.map(store => {
        console.log(setFormatStore(store))
    })
}

export const showAStoreById = async () => {
    const stores = await StoreController.getAllStores();
    const selection = await inquirer.prompt(getQuestionsForSelectStore(stores))
    const store = getStoreByFormat(stores, selection.store);
    return setFormatStore(store);
}