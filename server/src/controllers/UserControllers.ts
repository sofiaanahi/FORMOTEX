import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/Users';

// Función para registrar usuarios
export const register = async (req: Request, res: Response) => {
  const { id, username, password, email, role } = req.body;

  try {
    // Validación simple de campos requeridos
    if (!username || !password || !email) {
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
    const newUser = await User.create({
      id,
      username,
      password: hashedPassword,  // Guardamos la contraseña encriptada
      email,
      role: role || 'user',  // Si no se envía un rol, por defecto es 'user'
    });

    res.status(201).json({
      msg: 'Usuario registrado con éxito',
      user: newUser,
    });

    //token 
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({
      msg: 'Error al registrar usuario',
      error,
    });
  }
};

// Función para iniciar sesión
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

    // Verificar si JWT_SECRET está definido
    if (!process.env.JWT_SECRET) {
      console.error('Falta configuración del JWT_SECRET');
      return res.status(500).json({ msg: 'Error del servidor, falta configuración del JWT_SECRET' });
    }

    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Mostrar la clave secreta (solo para depuración, no en producción)

    // Generar JWT incluyendo el rol del usuario
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h', // Tiempo de expiración
    });

    console.log('Token generado:', token); // Mostrar el token generado (solo para depuración, no en producción)

    res.json({ token });
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ msg: 'Error en el servidor', error });
  }
};
