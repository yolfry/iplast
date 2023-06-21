import alarmeCategory from "@/enums/alarmeCategory";
import alarmeType from "@/enums/alarmeType";


type ScheduleEvery = "day" | "month" | "year" | "hour" | "minute" | "second" | "two-weeks" | "week"


enum Weekday {
    Sunday = 1,
    Monday = 2,
    Tuesday = 3,
    Wednesday = 4,
    Thursday = 5,
    Friday = 6,
    Saturday = 7
}

interface ScheduleOn {
    year?: number;
    month?: number;
    day?: number;
    weekday?: Weekday;
    hour?: number;
    minute?: number;
    second?: number;
}


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
    at: string;                    // Date or specific Alarme 
    alarmeCategory: alarmeCategory;  // Categoria de alarma 
    repeat?: boolean;               // Si la alarma se repite,
    color?: string;
    on?: ScheduleOn;
    every?: ScheduleEvery;
    count?: number;
    idGroup?: number | undefined;   //Grupo de alarma, las alarmas se pueden guardar por grupos, ej. en caso de una receta etc.
}


export { iAlarme, iAlarmeGroup, Weekday, ScheduleEvery, ScheduleOn }

