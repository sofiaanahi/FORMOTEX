
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import JWT_SECRET from '../config/enviroments';


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no se proporcionó token.' });
  }

  try {
    const decifrar = jwt.verify(token, JWT_SECRET as unknown as string);
    (req as any).user = decifrar;
  } catch(error) {
    return res.status(403).json({ message: 'Token inválido' });

  };
  

}