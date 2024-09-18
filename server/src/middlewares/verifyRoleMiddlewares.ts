import { Request, Response, NextFunction } from 'express';

// Middleware para verificar si el usuario es admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (user && user.role === 'admin') {
    return next();  // Si es admin, se permite continuar
  }

  return res.status(403).json({ message: 'Acceso denegado, solo administradores pueden realizar esta acción.' });
};

// Middleware para verificar si el usuario es un user
export const isUser = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;

  if (user && user.role === 'user') {
    return next();  // Si es un user, se permite continuar
  }

  return res.status(403).json({ message: 'Acceso denegado.' });
};
