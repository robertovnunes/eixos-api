import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserService from '../services/user.service';
import { authenticateToken, generateAccessToken, generateRefreshToken} from './autenticateToken';
export default class LoginControler {
  private prefix: string = '/login';
  public router: Router;
  private userService: UserService;

  constructor(
    router: Router,
    userService: UserService,
  ) {
    this.router = router;
    this.userService = userService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(this.prefix, (req: Request, res: Response) => {
      this.login(req, res);
    });

    this.router.delete(`${this.prefix}`, (req: Request, res: Response) => {
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
        const response = authenticateToken(user.refreshToken);
        if (!response.authenticate) {
          console.error('/POST 403 Forbidden');
          res.status(403).send({
            messageCode: 'forbidden',
            response,
          });
          return;
        }
        const access_token = generateAccessToken(user.email);
        res
          .cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            //secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000, // 15 minutos
          })
          .cookie('refresh_token', user.refreshToken, {
            httpOnly: true,
            secure: false,
            //secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
          })
          .sendStatus(200);
      } else {
        const access_token = generateAccessToken(user.email);
        const refresh_token = generateRefreshToken(user.email);
        await this.userService.updateRefreshToken(user.email, refresh_token);
        res
          .cookie('access_token', access_token, {
            httpOnly: true,
            secure: false,
            //secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000, // 15 minutos
          })
          .cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            //secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
          })
          .sendStatus(200);
      }
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
      res
        .clearCookie('access_token', {
          httpOnly: true,
          //secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .clearCookie('refresh_token', {
          httpOnly: true,
          //secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .status(200)
        .json({ message: 'Logout realizado com sucesso!' });
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

    const response = authenticateToken(refreshToken);
    if (!response.authenticate) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    const accessToken = generateAccessToken(user.email);
    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        //secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutos
      })
      .status(200)
      .json({ message: 'Token de acesso renovado' });
  };

  private verifyToken = async (req: Request, res: Response) => {
    const token = req.cookies['access_token'];
    console.log('token to verify ', token);
    if (!token) return res.status(401).json({ authenticated: false });
    const response = authenticateToken(token);
    console.log('response', response);
    if (response.authenticate) {
      console.log('GET /login/verify 200 OK');
      return res.status(200).json({ authenticated: true });
    } else {
      console.log('GET /login/verify 401 Unauthorized');
      return res.status(401).json(response.message);
    }
  };

  private verifyRefreshToken = async (req: Request, res: Response) => {
    const token = req.cookies['refresh_token'];
    console.log('token to verify ', token);
    if (!token) return res.status(401).json({ authenticated: false });
    const response = authenticateToken(token);
    console.log('response', response);
    if (response.authenticate) {
      console.log('GET /login/verify 200 OK');
      return res.status(200).json({ authenticated: true });
    } else {
      console.log('GET /login/verify 401 Unauthorized');
      return res.status(401).json(response.message);
    }
  };
}
