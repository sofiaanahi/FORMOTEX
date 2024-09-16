"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const process_1 = require("process");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process_1.env.PORT || '5000';
        // inicializar middlewares y rutas 
    }
    //metodo para iniciar el servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor esta ejecutandose en http://localhost:${this.port}`);
        });
    }
    ;
}
;
//crear una instancia del servidor y ejecutarlo
const server = new Server();
server.listen();
