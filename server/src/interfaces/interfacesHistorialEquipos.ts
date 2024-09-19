export interface IHistorialEquipo {
    id: number,
    equipoId: number,
    tipoMovimiento: 'asignacion' | 'devolucion' | 'mantenimiento';  
    fechaMovimiento: Date;  
    ubicacion: string;  
    realizadoPor: number; 
}

export interface InterfaceHistorial extends Omit<IHistorialEquipo, 'id'>{}