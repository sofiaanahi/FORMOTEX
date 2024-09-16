import pool from '../db/connection'; //importacion de la conexion de la db

interface User {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    rol?: string;
};

    