import { Router } from 'express';
import EquipoController from '../controllers/EquipoControllers';

const EquipoRouter = Router();

// Obtener todos los equipos
EquipoRouter.get('/equipos', EquipoController.getEquipos);

// Obtener un equipo por ID
EquipoRouter.get('/equipos/:id', EquipoController.getEquipoById);

// Crear un nuevo equipo
EquipoRouter.post('/equipos', EquipoController.createEquipo);

// Actualizar un equipo por ID
EquipoRouter.put('/equipos/:id', EquipoController.updateEquipo);

// Eliminar un equipo por ID
EquipoRouter.delete('/equipos/:id', EquipoController.deleteEquipo);



export default EquipoRouter;
