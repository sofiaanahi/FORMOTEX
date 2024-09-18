import { Model, DataTypes } from "sequelize";
import sequelize from '../db/connection';  
import {IProveedores} from '../interfaces/interfacesProveedores';

export class Proveedores extends Model<IProveedores> implements IProveedores {

    public id!: number;  
    public nombre!: string; 
    public telefono!: string;  
    public email!: string;  
    public direccion!: string; 
  }

Proveedores.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true 
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize, 
    modelName: 'Proveedores', 
    tableName: 'proveedores',
    timestamps: true,
  }
);

export default Proveedores;