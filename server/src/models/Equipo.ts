import { Model, DataTypes } from "sequelize";
import sequelize from '../db/connection';  
import { IEquipo } from '../interfaces/interfacesEquipo';

class Equipo extends Model<IEquipo> implements IEquipo {
    public id!: number;
    public nombre!: string;
    public tipo!: string;
    public marca!: string;
    public modelo!: string;
    public numeroSerie!: string;
    public fechaAdquisicion!: Date;
    public estado!: "operativo" | "mantenimiento" | "fuera de servicio";
}

Equipo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numeroSerie: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        fechaAdquisicion: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM('operativo', 'mantenimiento', 'fuera de servicio'),
            defaultValue: 'operativo',
            allowNull: false,
        },
    },
    {
        sequelize,  
        modelName: 'Equipo',
        tableName: 'equipos',
        timestamps: true,  
    }
);

export default Equipo;
