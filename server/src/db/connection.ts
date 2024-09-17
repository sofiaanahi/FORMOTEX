import { Sequelize } from 'sequelize'; 
import env from '../config/enviroments';

// configuración de la base de datos
const sequelize = new Sequelize(env.NAME!, env.USER!,env.PASSWORD!,
    {
        host: env.HOST,
        dialect:'postgres',
       logging:false
    }
);


export default sequelize;