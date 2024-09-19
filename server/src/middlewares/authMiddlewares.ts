
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no se proporcionó token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Verificamos que el token decodificado sea un objeto (JwtPayload) y no un string
    if (typeof decoded === 'object' && decoded !== null) {
      req.user = decoded as jwtPayload;  // Guardamos el payload (datos del usuario) en la request
      next();  // Permitir acceso a la siguiente ruta
    } else {
      return res.status(403).json({ message: 'Token inválido.' });
    }
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};
