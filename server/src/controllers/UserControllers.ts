import { Request, Response } from 'express';
import User from '../models/Users';

class UserController {

//obtener todos los usuario
     public async getUsers( req:Request, res:Response): Promise<Response> {
        try{
            const users = await User.findAll(); // obtener todos los users
            return res.json(users);
        }catch(error){
            return res.status(500).json({message: 'Error al obtener usuario', error});
        }
        
    };

// obtener usuario por ID
    public async getUserById( req:Request, res:Response): Promise<Response> {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id); // Buscar por ID
            if (!user) {
                return res.status(404).json({message: 'usuario no encontrado'});
            }
            return res.json(user);
        }catch(error){
            return res.status(500).json({message: 'Error al obtener el usuario', error});
        }
    };

// crear un nuevo usuario
    public async createUser(req:Request, res:Response): Promise<Response> {
            
        const {id, username, password, email, role } = req.body;
        try {
            const nuevoUser = await User.create({
                id,
                username,
                password,
                email,
                role
            });
    
            return res.status(201).json(nuevoUser);
        } catch(error){
            return res.status(500).json({message:'Error al crear un usuario', error});
        }
    };

// actualizar usuario
    public async updateUser(req:Request, res:Response): Promise<Response>{
        const { id } = req.params;
        const { username, password, email, role } = req.body;
        
        try{
            const user = await User.findByPk(id);
            if(!user) {
                return res.status(404).json({message:'Usuario no encontrado'});
            }

            await user.update({ username, password, email, role });
            return res.json({message:'usuario actualizado correctamente'});

        }catch(error){
        return res.status(500).json({message: 'Error al actualizar un usuario', error});
        }

    };

// eliminar usuario
    public async deleteUser(req:Request, res:Response): Promise<Response> {
        const {id} = req.params;
        try{
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({message:'usuario no encontrado'});
            }

            await user.destroy();
            return res.json({message:'usuario eliminado correctamente'});

        }catch(error){
            return res.status(500).json({message:'Error al eliminar el usuario'});
        }
    };

};

export default new UserController;