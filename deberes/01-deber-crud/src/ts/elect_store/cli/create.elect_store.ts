import inquirer from 'inquirer';
import ElectStore from "../entities/elect_store.entity";
import ElectStoreController from "../controllers/elect_store.controller";

inquirer.registerPrompt("date", require("inquirer-date-prompt"));


const questionsForCreateStore = [
    {
        type: 'input',
        name: 'id',
        message: "¿Cuál es el identificador de la tienda?",
        validate(value: string) {
            const pass = value.match(
                /^[0-9]{1,5}$/i
            );
            return (pass) ? true : 'Por favor ingrese un identificador entero válido.';
        }
    },
    {
        type: 'list',
        name: 'location',
        message: "¿Seleccione la ubicación de la tienda?",
        choices: [
            "QUITO" , "GUAYAQUIL" , "CUENCA" , "IBARRA" ,
            "ESMERALDAS" , "LOJA" , "PUYO" , "MANTA"
        ]
    },
    {
        type: 'input',
        name: 'responsable',
        message: "¿Ingrese el nombre del responsable de la tienda?",
    },
    {
        type: 'date',
        name: 'openingHour',
        message: "¿Cuál es la hora de atención de la tienda?",
        format: { month: undefined, year: undefined, day: undefined, hour: "numeric", minute: "numeric" },
        clearable: true,
    }
];

export const askInformationToCreateAStore = async () => {

    const userInput = await inquirer.prompt(questionsForCreateStore)

    const newStore: ElectStore = {
        id: parseInt(userInput.id),
        ...userInput,
        products: [],
    };

    return ElectStoreController.createProduct(newStore)
}