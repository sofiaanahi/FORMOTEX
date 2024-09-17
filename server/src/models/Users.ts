import { Model, DataTypes } from "sequelize";
import sequelize from '../db/connection';  
import { IUsers } from "../interfaces/interfacesUser";

export class User extends Model<IUsers> implements IUsers {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public role!: 'admin' | 'user';
    public createdAt?: Date;
    public updatedAt?: Date;

};

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
        allowNull: false,
      },
    },
    {
      sequelize, 
      modelName: 'User',
      tableName: 'users',
      timestamps: true, 
    }
  );


export default User;