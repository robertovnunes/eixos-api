import e, { Router, Request, Response } from 'express';    // Importando Router, Request e Response de 'express'
import UserService from '../services/user.service';
import UserEntity from '../entities/user.entity';
import { Result, SuccessResult } from '../utils/result';

// Toda documentação está escrita em ./src/conf/swaggerDoc.yaml

class UserController {
    private prefix: string = '/users';    // Prefixo para as rotas
    public router: Router;    // Router
    private userService: UserService;    // Serviço de usuário

    constructor(router: Router, userService: UserService) {
        this.router = router;
        this.userService = userService;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(this.prefix, (req: Request, res: Response) => {
            this.getAllUsers(req, res);
        });
        this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) => {
            this.getUserById(req, res);
        });
        this.router.get(`${this.prefix}/:email`, (req: Request, res: Response) => {
            this.getUserByEmail(req, res);
        });
        this.router.get(`${this.prefix}/:id/defaultTimer`, (req: Request, res: Response) => {
            this.getUserDefaultTimer(req, res);
        });
        this.router.post(this.prefix, (req: Request, res: Response) => {
            this.createUser(req, res);
        });
        this.router.patch(`${this.prefix}/:id`, (req: Request, res: Response) => {
            this.updateUser(req, res);
        });
        this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) => {
            this.deleteUser(req, res);
        });
    }

    private getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.getAllUsers();
            if (users.length === 0) {
                console.error('/GET/users 204 Empty list');
                res.status(204)
                    .send({ messageCode: 'empty_list', message: 'No users in database' });
            } else {
                console.log('/GET/users 200 OK');
                res.status(200).send(users);
            }
        } catch (error) {
            console.error(`/GET 500 ${error}`);
            res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
        }
    };
    
    private getUserById = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            if (!user) {
                console.error('/GET 404 not found');
                res
                    .status(404)
                    .send({ messageCode: 'not_found', message: 'User not found' });
            } else {
                console.log('/GET 200 OK');
                res.status(200).send(user);
            }
        } catch (error) {
            console.error(`/GET 500 ${error}`);
            res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
        }
    };

    private getUserByEmail = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.getUserByEmail(req.params.email);
            if (!user) {
                console.error('/GET 404 not found');
                res
                    .status(404)
                    .send({ messageCode: 'not_found', message: 'User not found' });
            } else {
                console.log('/GET 200 OK');
                res.status(200).send(user);
            }
        } catch (error) {
            console.error(`/GET 500 ${error}`);
            res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
        }
    };

    private getUserDefaultTimer = async (req: Request, res: Response) => {
        try {
            const defaultTimer = await this.userService.getUserDefaultTimer(req.params.id);
            if (!defaultTimer) {
                console.error('/GET 404 not found');
                res
                    .status(404)
                    .send({ messageCode: 'not_found', message: 'User not found' });
            } else {
                console.log('/GET 200 OK');
                res.status(200).send(defaultTimer);
            }
        } catch (error) {
            console.error(`/GET 500 ${error}`);
            res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
        }
    };

    private createUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.createUser(req.body);
            console.log('/POST 201 Created');
            res.status(201).send(user);
        } catch (error) {
            console.error(`/POST 500 ${error}`);
            res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
        }
    };

    private updateUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.updateUser(req.params.id, req.body);
            if (!user) {
                console.error('/PATCH 404 not found');
                res
                    .status(404)
                    .send({ messageCode: 'not_found', message: 'User not found' });
            } else {
                console.log('/PATCH 200 OK');
                res.status(200).send(user);
            }
        } catch (error) {
            console.error(`/PATCH 500 ${error}`);
            res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
        }
    };

    private deleteUser = async (req: Request, res: Response) => {
        try {
            await this.userService.deleteUser(req.params.id);
            console.log('/DELETE 204 No content');
            res.status(204).send();
        } catch (error) {
            console.error(`/DELETE 500 ${error}`);
            res.status(500).send({ messageCode: 'server_error', message: 'internal server error' });
        }
    };
}

export default UserController;