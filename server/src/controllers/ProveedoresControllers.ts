import { Request, Response } from 'express';
import Proveedores from '../models/Proveedores';

class ProveedoresController {
    
// obtener todos los proveedores
    public async getProveedores( req:Request, res:Response): Promise<Response> {
        try{
            const proveedores = await Proveedores.findAll(); // obtener todos los proveedores
            return res.json(proveedores);
        }catch(error){
            return res.status(500).json({message: 'Error al obtener a los proveedores', error});
        }
    };

// obtener proveedores por ID 
    public async getProveedorById( req:Request, res:Response): Promise<Response> {
        const { id } = req.params;
        try {
            const proveedor = await Proveedores.findByPk(id); // Buscar por ID
            if (!proveedor) {
                return res.status(404).json({message: ' Proveedor no encontrado'});
            }
            return res.json(proveedor);
        }catch(error){
            return res.status(500).json({message: 'Error al obtener el proveedor', error});
        }
    }

// crear nuevo proveedor
    public async createProveedor(req:Request, res:Response): Promise<Response> {
        
        const {id, nombre, telefono, email, direccion } = req.body;
        try {
            const nuevoProveedor = await Proveedores.create({
                id,
               nombre,
               telefono,
               email,
               direccion
            });
           
            return res.status(201).json(nuevoProveedor);
        } catch(error){
            return res.status(500).json({message:'Error al crear un proveedor', error});
        }
    }

// Actualizar proveedor
    public async updateProveedor(req:Request, res:Response): Promise<Response>{
        const { id } = req.params;
        const { nombre, telefono, email, direccion } = req.body;
        
        try{
            const proveedor = await Proveedores.findByPk(id);
            if(!proveedor) {
                return res.status(404).json({message:'Proveedor no encontrado'});
            }

            await proveedor.update({ nombre, telefono, email, direccion });
            return res.json({message:'Proveedor actualizado correctamente'});

        }catch(error){
           return res.status(500).json({message: 'Error al actualizar proveedor', error});
        }
    
    }


// Eliminar proveedor
    public async deleteProveedor(req:Request, res:Response): Promise<Response> {
        const {id} = req.params;
        try{
            const proveedor = await Proveedores.findByPk(id);
            if (!proveedor) {
                return res.status(404).json({message:'proveedor no encontrado'});
            }

            await proveedor.destroy();
            return res.json({message:'proveedor eliminado correctamente'});

        }catch(error){
            return res.status(500).json({message:'Error al eliminar proveedor'});
        }
    }

};

export default new  ProveedoresController ();
