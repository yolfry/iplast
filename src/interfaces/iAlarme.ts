import alarmeCategory from "@/enums/alarmeCategory";
import alarmeType from "@/enums/alarmeType";
import { Weekday } from "@capacitor/local-notifications";

interface iAlarmeGroup {
    id: number;
    name: string;
}

interface iAlarme {
    id: number;    //Id de la alarma
    name: string;   //Nombre de la frecuencia
    type: alarmeType;  // si la alarma es por frecuencia o espesifico de una fecha
    active: boolean;                // Si la alarma esta activa, si o no
    body: string;                  //Cuerpo de la alarma
    alarmeCategory: alarmeCategory;  // Categoria de alarma 
    frequency?: {
        type: `hour` | `day` | `week` | `month`;   // Tipo de frecuencia, cada hora | mes
        frequencyNumber: number;   // Numero de frecuencia, cada (3)  hora | mes  
        day: Weekday[] | undefined;   //Dia de activacion de la frecuencia, Lunes Martes, Miercoles o todos los dias = undefainer
        stop: boolean;    //si la frecuencia tiene una fecha para terminar, si o no
        stopDate: string;  // fecha de la frecuencia, fecha de terminar
    };
    at?: string;                    // Date or specific Alarme 
    repeat?: boolean;               // Si la alarma se repite
    idGroup?: number | undefined;   //Grupo de alarma, las alarmas se pueden guardar por grupos, ej. en caso de una receta etc.
}


export { iAlarme, iAlarmeGroup, Weekday }

