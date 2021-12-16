"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_cli_1 = require("./general/cli/general.cli");
function runApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuSelection = yield (0, general_cli_1.askForModule)();
            switch (menuSelection.module) {
                case 'Salir del programa':
                    console.log('Vuelva pronto');
                    break;
                case 'Tiendas':
                    const storeOperationSelection = yield (0, general_cli_1.askForOperation)('tienda');
                    yield (0, general_cli_1.processOption)(storeOperationSelection.crudOperation, runApp);
                    yield runApp();
                    break;
                case 'Productos':
                    const productOperationSelection = yield (0, general_cli_1.askForOperation)('producto');
                    yield (0, general_cli_1.processOption)(productOperationSelection.crudOperation, runApp);
                    yield runApp();
                    break;
                default:
                    break;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
runApp();
