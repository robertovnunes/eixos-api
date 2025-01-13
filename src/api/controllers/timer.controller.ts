import { Router, Request, Response, NextFunction } from "express";
import TimerService from "../services/timer.service";
import TimerEntity from "../entities/timer.entity";
import { Result, SuccessResult } from "../utils/result";
import { HttpError } from "../utils/errors/http.error";
import jwt from "jsonwebtoken";
// Toda documentação está escrita em ./src/conf/swaggerDoc.yaml

class TimerController {
  private prefix: string = '/timers';
  public router: Router;
  private timerService: TimerService;

  constructor(router: Router, timerService: TimerService) {
    this.router = router;
    this.timerService = timerService;
    this.initRoutes();
  }

  private authenticateToken = (token: string) => {
    const SECRET = process.env.JWT_SECRET || 'secret';
    if (!token) {
      return false;
    }

    try {
      jwt.verify(token, SECRET);
      return true;
    } catch (err) {
      return false;
    }
  };

  private authToken(req: Request, res: Response, next: NextFunction): any {
    const token = req.cookies['access_token'];
    const JWT_SECRET = process.env.JWT_SECRET || 'secret';
    if (!token) {
      return res.status(401).send({ message: 'Token ausente ou inválido.' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      (req as any).user = decoded; // Anexa os dados do usuário à requisição
      next();
    } catch (err) {
      return res.status(403).send({ message: 'Token inválido.' });
    }
  }

  private initRoutes() {
    this.router.get(
      this.prefix,
      this.authToken,
      (req: Request, res: Response) => {
        this.getAllTimers(req, res);
      },
    );
    this.router.get(
      `${this.prefix}/:id`,
      this.authToken,
      (req: Request, res: Response) => {
        this.getTimerById(req, res);
      },
    );
    this.router.post(
      this.prefix,
      this.authToken,
      (req: Request, res: Response) => {
        this.createTimer(req, res);
      },
    );
    this.router.patch(
      `${this.prefix}/:id`,
      this.authToken,
      (req: Request, res: Response) => {
        this.updateTimer(req, res);
      },
    );
    this.router.delete(
      `${this.prefix}/:id`,
      this.authToken,
      (req: Request, res: Response) => {
        this.deleteTimer(req, res);
      },
    );
  }

  private getAllTimers = async (req: Request, res: Response) => {
    try {
      const timers = await this.timerService.getTimers();
      if (timers.length === 0) {
        console.error('/GET/timers 204 Empty list');
        res.status(204).send({
          messageCode: 'empty_list',
          message: 'No timers in database',
        });
      } else {
        console.log('/GET/timers 200 OK');
        res.status(200).send(timers);
      }
    } catch (error) {
      console.error(`/GET 500 ${error}`);
      res.status(500).send({
        messageCode: 'server_error',
        message: 'internal server error',
      });
    }
  };

  private getTimerById = async (req: Request, res: Response) => {
    try {
      const timer = await this.timerService.getTimerById(req.params.id);
      if (!timer) {
        console.error('/GET 404 not found');
        res
          .status(404)
          .send({ messageCode: 'not_found', message: 'Timer not found' });
      } else {
        console.log('/GET 200 OK');
        res.status(200).send(timer);
      }
    } catch (error) {
      console.error('/GET 500 ' + error);
      res.status(500).send({
        messageCode: 'server_error',
        message: 'internal server error',
      });
    }
  };

  private createTimer = async (req: Request, res: Response) => {
    try {
      const timer = await this.timerService.createTimer(
        req.body as TimerEntity,
      );
      console.log('/POST/timers 201 Created');
      res.status(201).send(timer);
    } catch (error) {
      console.error(`/POST/timers 500 ${error}`);
      res.status(500).send({
        messageCode: 'server_error',
        message: 'internal server error',
      });
    }
  };

  private updateTimer = async (req: Request, res: Response) => {
    try {
      const timer = await this.timerService.updateTimer(
        req.params.id,
        req.body as TimerEntity,
      );
      if (!timer) {
        console.error('/PATCH/timers 404 not found');
        res
          .status(404)
          .send({ messageCode: 'not_found', message: 'Timer not found' });
      } else {
        console.log('/PATCH/timers 200 OK');
        res.status(200).send(timer);
      }
    } catch (error) {
      console.error(`/PATCH/timers 500 ${error}`);
      res.status(500).send({
        messageCode: 'server_error',
        message: 'internal server error',
      });
    }
  };

  private deleteTimer = async (req: Request, res: Response) => {
    try {
      await this.timerService.deleteTimer(req.params.id);
      console.log('/DELETE/timers 204 No content');
      res.status(204).send();
    } catch (error) {
      console.error(`/DELETE/timers 500 ${error}`);
      res.status(500).send({
        messageCode: 'server_error',
        message: 'internal server error',
      });
    }
  };
}

export default TimerController;