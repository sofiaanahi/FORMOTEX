
import express, {Application}  from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan  from "morgan";
import dotenv from 'dotenv';
import env from '../config/enviroments';
import sequelize from "../db/connection";
import bodyParser from 'body-parser';
import  "../models/Equipo";
import "../models/Users";
import "../models/HistorialEquipos";
import EquipoRouter from "../routes/EquipoRoutes";
import UserRouter from "../routes/UserRoutes";
import HistorialEquipoRouter from '../routes/HistorialEquiposRoutes';
import { errorHandlerMiddleware } from "../middlewares/errorHandMiddleware";

dotenv.config();

class Server {
    public app: Application;
    private port: string | undefined;

    constructor() {

        this.app = express();
        this.port = env.PORT || '4000';

        // probar la conexion en el constructor
        this.testConnection();
       
        // inicializar middlewares y rutas 
        this.middelware();   
        this.routes();  
    };

    //config de middelware
    middelware():void{
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'))
        this.app.use(errorHandlerMiddleware);
    }

    // metodo para probar la conexion a la base de datos   
    private testConnection = async () => {
        try{
            await sequelize.authenticate();
            console.log('Conectando a la base de datos PostgreSQL con sequelize');
            
            // sincronizar los modelos con la base de datos 
            await sequelize.sync({ force: false}); 
            console.log('Modelos registrados:', sequelize.models);

        }catch(error){
            console.error('Error al conectar la base de datos PostgreSQL', error);
        };
        
    };
    
     //metodos para configurar las rutas
     private routes(): void {
        this.app.use('/api', EquipoRouter);
        this.app.use('/api', UserRouter);
        this.app.use('/api', HistorialEquipoRouter);
        }

    //metodo para iniciar el servidor
    public listen(): void {
        this.app.listen(this.port, ()=>{
            console.log(`El servidor esta ejecutandose en http://localhost:${this.port}`);
        });
    };
};


export default Server;