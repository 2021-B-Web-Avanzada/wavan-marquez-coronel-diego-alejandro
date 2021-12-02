// 11-inquirer
const inquirer = require("inquirer");
//npm install inquirer
async function main(){
    try {
        const respuesta = await inquirer
            .prompt([
                {
                    type: "input",
                    name: "apellido",
                    message: "Ingrese tu nombre"
                },
                {
                    type:"input",
                    name:"edad",
                    message:"Ingresa tu edad"
                }
            ]);
        console.log("Respuesta",respuesta);

    }catch (e){
        console.log(e)
    }}
main()