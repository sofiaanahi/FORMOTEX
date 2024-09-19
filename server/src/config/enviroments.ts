import dotenv from 'dotenv';

dotenv.config();

// definicion de la interfaz IEnv describe el tipo de datos de las varibles de entorno
interface  IEnv {
    PORT: string | undefined;
    HOST: string | undefined;
    USER: string | undefined;
    PASSWORD: string | undefined;
    NAME: string | undefined;
    DIALECT: string | undefined;
    JWT_SECRET: string | undefined // "clave_secreta_super_segura";
};


// objeto env que almacena los valores de las variables de entorno
const env: IEnv ={
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    NAME: process.env.NAME,
    DIALECT: process.env.DIALECT,
    JWT_SECRET: process.env.JWT_SECRET
};


export default env;
