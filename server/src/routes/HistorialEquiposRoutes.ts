import { Router } from 'express';
import HistorialEquiposControllers from '../controllers/HistorialEquiposControllers';

const HistorialEquipoRouter = Router();

// Obtener todos los equipos
HistorialEquipoRouter.get('/historiales', HistorialEquiposControllers.getHistorial);

// Obtener un equipo por ID
HistorialEquipoRouter.get('/historial/:id', HistorialEquiposControllers.getHistorialById);

// Crear un nuevo equipo
HistorialEquipoRouter.post('/historial', HistorialEquiposControllers.createHistorial);

// Actualizar un equipo por ID
HistorialEquipoRouter.put('/historial/:id', HistorialEquiposControllers.updateHistorial);

// Eliminar un equipo por ID
HistorialEquipoRouter.delete('/historial/:id', HistorialEquiposControllers.deleteHistorial);



export default HistorialEquipoRouter;
