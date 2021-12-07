// 02 - 02-interfaces.ts
interface Usuario {
    nombre: string;
    apellido : string;
    edad ?: number;
    sueldo ?: number;
    casado : boolean | 0 | 1;
    estado: 'AC' | 'IN' | 'BN';
    imprimirUsuario: (mensaje: string) => string | 'BN';
    calcularImpuesto: (impuesto: number) => number;
    estadoActual: () => 'AP'|'AF'|'AT';
    //cALCULARiMPUESTO PARAMETRO NUMERO IMPUESTO, Sueldo + SUeldo * impuesto
    // Estado actual no reciba parametros 'AP', 'AF', 'AT'
}

let user: Usuario = {
    nombre: 'Diego',
    apellido: 'Marquez',
    casado: 0,
    sueldo: 11.2,
    estado: 'AC',
    imprimirUsuario: (mensaje )=> {
        return 'El mensaje es ' + mensaje;
    },
    calcularImpuesto: impuesto => {
        return this.sueldo + this.sueldo * impuesto;
    },
    estadoActual: () => {
        switch (this.estado) {
            case "AC":
                return 'AP';
            case "IN":
                return 'AF';
            case 'BN':
                return 'AT'
        }
    }
}