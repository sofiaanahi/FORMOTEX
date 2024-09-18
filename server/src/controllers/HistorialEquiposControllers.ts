import { Request, Response } from 'express';
import HistorialEquipo from '../models/HistorialEquipos';

class HistorialEquiposControllers {

// obtener todos los historiales de equipo
    public async getHistorial( req:Request, res:Response): Promise<Response> {
        try{
            const historialEquipos = await HistorialEquipo.findAll(); // obtener todos los historiales de equipos 
            return res.json(historialEquipos);
        }catch(error){
            return res.status(500).json({message: 'Error al obtener todos historiales de equipos', error});
        }
    };

// obtener historial de equipo por ID 
    public async getHistorialById( req:Request, res:Response): Promise<Response> {
        const { id } = req.params;
        try {
            const historialEquipo = await HistorialEquipo.findByPk(id); // Buscar por ID
            if (!historialEquipo) {
                return res.status(404).json({message: 'historial del equipo no encontrado'});
            }
            return res.json(historialEquipo);
        }catch(error){
            return res.status(500).json({message: 'Error al obtener historial del equipo', error});
        }
    }

// crear nuevo historial de equipo
    public async createHistorial(req:Request, res:Response): Promise<Response> {
        
        const {id, equipoId, tipoMovimiento, fechaMovimiento, ubicacion, realizadoPor} = req.body;
        try {
            const nuevoHistorial = await HistorialEquipo.create({
               id,
               equipoId,
               tipoMovimiento,
               fechaMovimiento,
               ubicacion,
               realizadoPor
            });
    
            return res.status(201).json(nuevoHistorial);
        } catch(error){
            return res.status(500).json({message:'Error al crear historial de equipo', error});
        }
    }

// Actualizar historial de equipo
    public async updateHistorial(req:Request, res:Response): Promise<Response>{
        const { id } = req.params;
        const { equipoId, tipoMovimiento, fechaMovimiento, ubicacion, realizadoPor } = req.body;
        
        try{
            const historialEquipo = await HistorialEquipo.findByPk(id);
            if(!historialEquipo) {
                return res.status(404).json({message:'Historial equipo no encontrado'});
            }

            await historialEquipo.update({ equipoId, tipoMovimiento, fechaMovimiento, ubicacion, realizadoPor });
            return res.json({message:'Historial de equipo actualizado correctamente'});

        }catch(error){
           return res.status(500).json({message: 'Error al actualizar historial de equipo', error});
        }
    
    }

// Eliminar historial de equipo
    public async deleteHistorial(req:Request, res:Response): Promise<Response> {
        const {id} = req.params;
        try{
            const historialequipo = await HistorialEquipo.findByPk(id);
            if (!historialequipo) {
                return res.status(404).json({message:'Historial de equipo no encontrado'});
            }

            await historialequipo.destroy();
            return res.json({message:'Historial de equipo eliminado correctamente'});

        }catch(error){
            return res.status(500).json({message:'Error al eliminar historial de equipo'});
        }
    }

};


export default new HistorialEquiposControllers();