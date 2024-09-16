"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
;
// objeto env que almacena los valores de las variables de entorno
const env = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    NAME: process.env.NAME,
    DIALECT: process.env.DIALECT
};
exports.default = env;
