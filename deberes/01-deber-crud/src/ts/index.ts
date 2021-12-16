import {askForModule, askForOperation, processOption} from './general/cli/general.cli';


async function runApp() {
    try {
        const menuSelection = await askForModule()
        switch (menuSelection.module) {
            case 'Salir del programa':
                console.log('Vuelva pronto')
                break;
            case 'Tiendas':
                const storeOperationSelection = await askForOperation('tienda');
                await processOption(storeOperationSelection.crudOperation, runApp);
                await runApp();
                break;
            case 'Productos':
                const productOperationSelection = await askForOperation('producto');
                await processOption(productOperationSelection.crudOperation, runApp);
                await runApp();
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error)
    }
}



runApp()