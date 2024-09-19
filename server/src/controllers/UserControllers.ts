import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Users';
import { createJWT } from '../utils/jwt.utils';

// Función para registrar usuarios
export const register = async (req: Request, res: Response) => {
  const { id, username, password, email, role } = req.body;

  try {
    // Validación simple de campos requeridos
    if (!username || !password || !role || !email) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios.' });
    }

    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'El correo ya está registrado.' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = await User.create({ id ,username, password: hashedPassword, email, role });
    const token = await createJWT({ id: newUser.id, role: newUser.role });

    res.status(201).json({ token, role: newUser.role });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({
      msg: 'Error al registrar usuario',
      error,
    });
  }
};

// Endpoint para iniciar sesión
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Validación de campos requeridos
    if (!email || !password) {
      return res.status(400).json({ msg: 'Correo y contraseña son obligatorios.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Comparar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    // Generar JWT incluyendo el rol del usuario
    const token = await createJWT({ id: user.id, role: user.role });
    res.json({token, role: user.role});
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ msg: 'Error en el servidor', error });
  }
};
