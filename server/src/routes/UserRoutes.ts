import { Router } from 'express';
import UserController from '../controllers/UserControllers';

const UserRouter = Router();


// Obtener todos los usuarios 
UserRouter.get('/users', UserController.getUsers);

// Obtener un usuario por ID
UserRouter.get('/user/:id', UserController. getUserById);

// Crear un nuevo usuario
UserRouter.post('/user', UserController.createUser);

// Actualizar un usuario por ID
UserRouter.put('/user/:id', UserController.updateUser);

// Eliminar un usuario por ID
UserRouter.delete('/users/:id', UserController.deleteUser);



export default  UserRouter;
