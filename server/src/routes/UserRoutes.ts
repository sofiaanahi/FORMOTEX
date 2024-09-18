import { Router } from 'express';
import { register, login } from '../controllers/UserControllers';


const UserRouter= Router();

UserRouter.post('/register', register);  // Ruta para registrar usuarios
UserRouter.post('/login', login);        // Ruta para iniciar sesión

export default UserRouter;

