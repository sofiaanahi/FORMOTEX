
import express, {Application}  from "express";
import env from '../config/enviroments';
import sequelize from "../db/connection";
import  "../models/Equipo";
import "../models/Users";

class Server {
    public app: Application;
    private port: string | undefined;

    constructor() {
        this.app = express();
        this.port = env.PORT || '4000';
        // probar la conexion en el constructor
        this.testConnection();

        // inicializar middlewares y rutas      
    };

    //metodos para configurar las rutas

    // metodo para probar la conexion a la base de datos   
    private testConnection = async () => {
        try{
            await sequelize.authenticate();
            console.log('Conectando a la base de datos PostgreSQL con sequelize');
            
            // sincronizar los modelos con la base de datos 
            await sequelize.sync({ force: true }); 
            console.log('Modelos registrados:', sequelize.models);

        }catch(error){
            console.error('Error al conectar la base de datos PostgreSQL', error);
        };
    };
   

    //metodo para iniciar el servidor
    public listen(): void {
        this.app.listen(this.port, ()=>{
            console.log(`El servidor esta ejecutandose en http://localhost:${this.port}`);
        });
    };
};


export default Server;