import inquirer from 'inquirer';
import StoreController from '../controllers/elect_store.controller';
import { getStoreByFormat, getQuestionsForSelectStore } from './update.elect_store';

export const askToDeleteAStore = async () => {
    const stores = await StoreController.getAllStores();
    const selection = await inquirer.prompt(getQuestionsForSelectStore(stores))
    const store = getStoreByFormat(stores, selection.store);
    return StoreController.deleteStoreById(store.id);
}