import { Router } from 'express';
import ProveedoresControllers from '../controllers/ProveedoresControllers';

const ProveedoresRouter = Router();

// Obtener todos los proveedores
ProveedoresRouter.get('/proveedores', ProveedoresControllers.getProveedores);

// Obtener un proveedor por ID
ProveedoresRouter.get('/proveedor/:id', ProveedoresControllers.getProveedorById);

// Crear un nuevo proveedor
ProveedoresRouter.post('/proveedores', ProveedoresControllers.createProveedor);

// Actualizar un proveedor por ID
ProveedoresRouter.put('/proveedor/:id', ProveedoresControllers.updateProveedor);

// Eliminar un proveedor por ID
ProveedoresRouter.delete('/proveedor/:id', ProveedoresControllers.deleteProveedor);



export default ProveedoresRouter;