import { Router } from 'express';
import EquipoController from '../controllers/EquipoControllers';
import { authenticateJWT } from '../middlewares/authMiddlewares';
import { isAdmin, isUser } from '../middlewares/verifyRoleMiddlewares';

const EquipoRouter = Router();


// rutas solo para usuarios autenticados 

// Obtener todos los equipos
EquipoRouter.get('/equipos', EquipoController.getEquipos);
// Obtener un equipo por ID
EquipoRouter.get('/equipos/:id', authenticateJWT, isUser, EquipoController.getEquipoById);



// rutas solo para los administradores 
// Crear un nuevo equipo
EquipoRouter.post('/equipos',authenticateJWT, isAdmin, EquipoController.createEquipo);

// Actualizar un equipo por ID
EquipoRouter.put('/equipos/:id',authenticateJWT, isAdmin, EquipoController.updateEquipo);

// Eliminar un equipo por ID
EquipoRouter.delete('/equipos/:id',authenticateJWT, isAdmin, EquipoController.deleteEquipo);



export default EquipoRouter;
