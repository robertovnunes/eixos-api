import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware para proteger rotas privadas
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[0];
    const secret = process.env.JWT_SECRET || 'defaultsecret';

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        (req as any).user = decoded;
        next();
    });
}