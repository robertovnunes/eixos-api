import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const SECRET = process.env.JWT_SECRET || 'secret';
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '7d';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
        return res.status(403).json({ message: 'Token inválido' });
        }
        (req as any).user = decoded as { email: string };
        next();
    });
}

export const generateAccessToken = (username: string): string => {

    return jwt.sign({ username }, SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
}

export const generateRefreshToken = (username: string): string => {

    return jwt.sign({ username }, SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
    });
}
