import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface response {
    authenticate: boolean, 
    message: string
};

const SECRET = process.env.JWT_SECRET || 'secret';
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || '15m';
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '7d';

export const authenticateToken = (token: string): response  => {
    

    if (!token) {
        return { authenticate: false, message: 'Token não fornecido' };
    }
    
    try {
        jwt.verify(token, SECRET);
        return { authenticate: true, message: 'Token autenticado' };
    } catch (err) {
        return { authenticate: false, message: 'Token inválido' };
    }
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
