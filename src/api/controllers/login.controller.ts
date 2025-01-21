import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';
export default class LoginControler {
  private prefix: string = '/login';
  public router: Router;
  private userService: UserService;
  private SECRET: string;

  constructor(
    router: Router,
    userService: UserService,
  ) {
    this.router = router;
    this.userService = userService;
    this.initRoutes();
    this.SECRET = process.env.JWT_SECRET || 'secret';
  }

  private generateAccessToken = (email: string) => {
    return jwt.sign({ email }, this.SECRET, { expiresIn: '5m' });
  };

  private generateRefreshToken = (email: string) => {
    return jwt.sign({ email }, this.SECRET, { expiresIn: '15m' });
  };

  private authenticateToken = (token: string)  => {
  
      if (!token) {
          return { authenticate: false, message: 'Token não fornecido' };
      }
      
      try {
          jwt.verify(token, this.SECRET);
          return { authenticate: true, message: 'Token autenticado' };
      } catch (err) {
          return { authenticate: false, message: 'Token inválido' };
      }
  }

  private initRoutes() {
    this.router.post(this.prefix, (req: Request, res: Response) => {
      this.login(req, res);
    });

    this.router.post(`/logout`, (req: Request, res: Response) => {
      this.logout(req, res);
    });

    this.router.post('/refresh', (req: Request, res: Response) => {
      this.refreshToken(req, res);
    });

    this.router.get(`${this.prefix}/verify`, (req: Request, res: Response) => {
      this.verifyToken(req, res);
    });

    this.router.get(`${this.prefix}/verifyRefresh`, (req: Request, res: Response) => {
      this.verifyRefreshToken(req, res);
    });
  }

  private login = async (req: Request, res: Response) => {
    let access_token, refresh_token: string;
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        console.error('/POST 400 Bad Request');
        res.status(400).send({
          messageCode: 'bad_request',
          message: 'Email and password are required',
        });
        return;
      }
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        console.error('/POST 404 not found');
        res
          .status(404)
          .send({ messageCode: 'not_found', message: 'User not found' });
        return;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        console.error('/POST 401 Unauthorized');
        res.status(401).send({
          messageCode: 'unauthorized',
          message: 'Invalid password',
        });
        return;
      }
      if (user.refreshToken) {
        refresh_token = user.refreshToken;
        const response = this.authenticateToken(refresh_token);
        if (!response.authenticate) {
          console.error('/POST 403 Forbidden');
          return res.status(403).send({
            messageCode: 'forbidden',
            response,
          });
        } 
        access_token = this.generateAccessToken(user.email);
        
      } else {
        access_token = this.generateAccessToken(user.email);
        refresh_token = this.generateRefreshToken(user.email);
        this.userService.updateRefreshToken(user.email, refresh_token);
      }
      res
        .cookie('access_token', access_token, {
          httpOnly: true,
          //path: '/*',
          //secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 5 * 60 * 1000, // 15 minutos
        })
        .cookie('refresh_token', refresh_token, {
          httpOnly: true,
          //path: '/*',
          //secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000, // 7 dias
        })
        .status(200)
        .json({ success: true, message: 'Login realizado com sucesso!' });
      console.log('/POST 200 OK');
    } catch (error) {
      console.error(`/POST 500 ${error}`);
      res.status(500).send({
        messageCode: 'server_error',
        message: 'internal server error',
      });
    }
  };

  private logout = async (req: Request, res: Response) => {
    try {
      const refreshToken = req.cookies['refresh_token'];
      const user = await this.userService.getUserByRefreshToken(refreshToken);
      if (!user) {
        return res.status(403).json({ message: 'Token inválido' });
      }
      await this.userService.updateRefreshToken(user.email, '');
      res
        .clearCookie('access_token')
        .clearCookie('refresh_token')
        .status(200)
        .json({ message: 'Logout realizado com sucesso!' });
        console.log('/POST logout 200 OK');
    } catch (error) {
      console.error(`/DELETE/login/logout 500 ${error}`);
      res.status(500).send({
        messageCode: 'server_error',
        message: 'internal server error',
      });
    }
  };

  private refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token não fornecido' });
    }

    const user = await this.userService.getUserByRefreshToken(refreshToken);

    if (!user) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    const response = this.authenticateToken(refreshToken);
    if (!response.authenticate) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    const accessToken = this.generateAccessToken(user.email);
    return res
      .cookie('access_token', accessToken, {
        httpOnly: false,
        //path: '/*',
        //secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 5 * 60 * 1000, // 15 minutos
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: false,
        //path: '/*',
        ///secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 20 * 60 * 1000, // 7 dias
      })
      .status(200)
      .json({ success: 'true', message: 'Token de acesso renovado' });
  };

  private verifyToken = async (req: Request, res: Response) => {
    const token = req.cookies['access_token'];
    if (!token) {
      console.log('GET /login/verify 401 sem token');
      return res.status(401).json({ authenticated: false });
    }
    try {
      const decoded = this.authenticateToken(token);
      if (decoded.authenticate) {
        console.log('GET /login/verify 200 OK');
        return res.status(200).json({ authenticated: true });
      } else {
        console.log('GET /login/verify 401 Unauthorized');
        return res.status(401).json({ authenticated: false });
      }
    } catch (error) {
      console.error(`/GET/login/verify 500 ${error}`);
      return res.status(500).json({ authenticated: false });
    }
  };

  private verifyRefreshToken = async (req: Request, res: Response) => {
    const token = req.cookies['refresh_token'];
    if (!token) {
      console.log('GET /login/verifyRefresh 401 sem token');
      return res
        .clearCookie('access_token')
        .clearCookie('refresh_token')
        .status(401)
        .json({ authenticated: null });
    }
    const response = this.authenticateToken(token);
    console.log('response', response);
    if (response.authenticate === true) {
      console.log('GET /login/verifyRefresh 200 OK');
      return res.status(200).json({ authenticated: true });
    } else {
      console.log('GET /login/verify 401 Unauthorized');
      return res.status(401).json(response.message);
    }
  };
}
