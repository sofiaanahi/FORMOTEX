import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
// Asegúrate de que esta clave esté definida en tu archivo de configuración

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no se proporcionó token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;  // Guardamos el payload (datos del usuario) en la request
    next();  // Permitir acceso a la siguiente ruta
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};
