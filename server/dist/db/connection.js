"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const enviroments_1 = __importDefault(require("../config/enviroments"));
// configuración de la base de datos
const sequelize = new sequelize_1.Sequelize(enviroments_1.default.NAME, // Nombre de la base de datos
enviroments_1.default.USER, // Usuario
enviroments_1.default.PASSWORD, // Contraseña
{
    host: enviroments_1.default.HOST, // Host de la base de datos
    dialect: enviroments_1.default.DIALECT, // Dialecto, en este caso PostgreSQL
    port: Number(enviroments_1.default.PORT), // Puerto (debe ser un número)
    logging: false, // Desactiva el log de consultas SQL
});
// prueba de conexion
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log('Conectando a la base de datos PostgreSQL con sequelize');
    }
    catch (error) {
        console.error('Error al conectar la base de datos PostgreSQL', error);
    }
    ;
});
// llamar a la funcion para probar la conexion
testConnection();
exports.default = sequelize;
