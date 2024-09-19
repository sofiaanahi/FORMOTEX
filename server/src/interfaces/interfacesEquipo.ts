
export interface IEquipo {
    id: number;
    nombre: string;
    tipo: string;
    marca: string; 
    modelo: string;
    numeroSerie: string;
    fechaAdquisicion: Date;
    estado: 'operativo' | "mantenimiento" | "fuera de servicio"
};

export interface InterfazEquiposInfo extends Omit<IEquipo, 'id'>{}