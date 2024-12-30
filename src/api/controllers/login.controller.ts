import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';
import { TokenService } from '../services/token.service';
import {TokenEntity} from '../entities/token.entity';

export default class LoginControler {
  private prefix: string = '/login';
  public router: Router;
  private userService: UserService;
  private tokenService: TokenService;

  constructor(router: Router, userService: UserService, tokenService: TokenService) {
    this.router = router;
    this.userService = userService;
    this.tokenService = tokenService;
    this.initRoutes();
  }

  // Função para gerar um token JWT
  private generateToken(username: string): string {
    const secret = process.env.JWT_SECRET || 'defaultsecret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '360h';
    return jwt.sign({ username }, secret, { expiresIn });
  }

  private initRoutes() {

    this.router.post(
      this.prefix, 
      (req: Request, res: Response) => {
        this.login(req, res);
      }
    );

    this.router.delete(
      `${this.prefix}/logout`,
      (req: Request, res: Response) => {
        this.logout(req, res);
      },
    );
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
      console.log('/POST 200 OK');
      const token = this.generateToken(user.email);
      return this.tokenService.createToken( new TokenEntity({ token }) );
    } catch (error) {
      console.error(`/POST 500 ${error}`);
      res.status(500).send({
        messageCode: 'server_error',
        message: 'internal server error',
      });
    }
  };

  private logout = async (req: Request, res: Response) => {
    console.log('/DELETE/login/logout 200 OK');
    res
      .status(200)
      .send({ messageCode: 'success', message: 'Logout successful' });
  };
}
