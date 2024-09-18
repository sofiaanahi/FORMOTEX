import { Request, Response } from 'express';
import Equipo from '../models/Equipo';

class EquipoController {
    
// obtener todos los equipos 
    public async getEquipos( req:Request, res:Response): Promise<Response> {
        try{
            const equipos = await Equipo.findAll(); // obtener todos los equipos 
            return res.json(equipos);
        }catch(error){
            return res.status(500).json({message: 'Error al obtener equipos', error});
        }
    };

// obtener equipo por ID 
    public async getEquipoById( req:Request, res:Response): Promise<Response> {
        const { id } = req.params;
        try {
            const equipo = await Equipo.findByPk(id); // Buscar por ID
            if (!equipo) {
                return res.status(404).json({message: ' Equipo no encontrado'});
            }
            return res.json(equipo);
        }catch(error){
            return res.status(500).json({message: 'Error al obtener el equipo', error});
        }
    }

// crear nuevo equipo
    public async createEquipo(req:Request, res:Response): Promise<Response> {
        
        const {id, nombre, tipo, marca, modelo, numeroSerie, fechaAdquisicion, estado } = req.body;
        try {
            const nuevoEquipo = await Equipo.create({
                id,
                nombre,
                tipo,
                marca,
                modelo,
                numeroSerie,
                fechaAdquisicion,
                estado
            });
           
            return res.status(201).json(nuevoEquipo);
        } catch(error){
            return res.status(500).json({message:'Error al crear equipo', error});
        }
    }

// Actualizar equipo
    public async updateEquipo(req:Request, res:Response): Promise<Response>{
        const { id } = req.params;
        const { nombre, tipo, marca, modelo, numeroSerie, fechaAdquisicion, estado } = req.body;
        
        try{
            const equipo = await Equipo.findByPk(id);
            if(!equipo) {
                return res.status(404).json({message:'Equipo no encontrado'});
            }

            await equipo.update({ nombre, tipo, marca, modelo, numeroSerie, fechaAdquisicion, estado });
            return res.json({message:'Equipo actualizado correctamente'});

        }catch(error){
           return res.status(500).json({message: 'Error al actualizar equipo', error});
        }
    
    }


// Eliminar equipo
    public async deleteEquipo(req:Request, res:Response): Promise<Response> {
        const {id} = req.params;
        try{
            const equipo = await Equipo.findByPk(id);
            if (!equipo) {
                return res.status(404).json({message:'Equipo no encontrado'});
            }

            await equipo.destroy();
            return res.json({message:'Equipo eliminado correctamente'});

        }catch(error){
            return res.status(500).json({message:'Error al eliminar equipo'});
        }
    }

};


export default new EquipoController();
