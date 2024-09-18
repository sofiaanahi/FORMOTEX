import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || 'Error interno del servidor',
  });
};
