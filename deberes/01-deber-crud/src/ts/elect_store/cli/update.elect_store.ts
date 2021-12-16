import inquirer from 'inquirer';
import StoreController from '../controllers/elect_store.controller';
import Store from '../entities/elect_store.entity';

inquirer.registerPrompt("date", require("inquirer-date-prompt"));


export const setFormatStore = (store: Store) => {
    return `ID: ${store.id} - Lugar: ${store.location} - Responsable: ${store.responsable}`
}

export const getQuestionsForSelectStore = (stores: Array<Store>) => {
    const formatStores = stores.map(store => setFormatStore(store));
    return [
        {
            type: 'list',
            name: 'store',
            message: "Seleccione una tienda:",
            choices: formatStores,
        },
    ];
}

const getQuestionsUpdateStore = (store: Store) => {
    return [
        {
            type: 'list',
            name: 'location',
            message: "¿Seleccione la ubicación de la tienda?",
            choices: [
                "QUITO" , "GUAYAQUIL" , "CUENCA" , "IBARRA" ,
                "ESMERALDAS" , "LOJA" , "PUYO" , "MANTA"
            ],
            default() {
                return store.location;
            },
        },
        {
            type: 'input',
            name: 'responsable',
            message: "¿Ingrese el nombre del responsable?",
            default() {
                return store.responsable;
            },
        },
        {
            type: 'date',
            name: 'openingHour',
            message: "¿Cuál es la hora de atención?",
            format: { month: undefined, year: undefined, day: undefined, hour: "numeric", minute: "numeric" },
            clearable: true,
            default() {
                return new Date(store.openingHour);
            },
        }
    ];
}

export const getStoreByFormat = (stores: Array<Store>, storeSelected: string): Store => {
    return stores.filter(store => setFormatStore(store) === storeSelected)[0]
}

export const askInformationToUpdateAStore = async () => {
    const stores = await StoreController.getAllStores();
    const selection = await inquirer.prompt(getQuestionsForSelectStore(stores))
    const store = getStoreByFormat(stores, selection.library);
    const userInput = await inquirer.prompt(getQuestionsUpdateStore(store))
    const storeModified: Store = {
        id: store.id,
        books: store.products,
        ...userInput,
    }
    return StoreController.updateStore(storeModified);
}