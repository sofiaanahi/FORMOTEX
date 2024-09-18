import { Model, DataTypes } from "sequelize";
import sequelize from '../db/connection';  
import {IHistorialEquipo} from '../interfaces/interfacesHistorialEquipos'; 

class HistorialEquipo extends Model<IHistorialEquipo> implements IHistorialEquipo {

    public id!: number;
    public equipoId!: number;
    public tipoMovimiento!: 'asignacion' | 'devolucion' | 'mantenimiento';  
    public fechaMovimiento!: Date;  
    public ubicacion!: string;  
    public realizadoPor!: number; 

}

HistorialEquipo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        
      },
      equipoId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tipoMovimiento: {
        type: DataTypes.ENUM('asignacion', 'devolucion', 'mantenimiento'),
        allowNull: false
      },
      fechaMovimiento: {
        type: DataTypes.DATE,
        allowNull: false
      },
      ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
      },
      realizadoPor: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize, 
      modelName: 'HistorialEquipo', 
      tableName: 'historialequipos', 
      timestamps: true,
    }
  );
  

export default HistorialEquipo;