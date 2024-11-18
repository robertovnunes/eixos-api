import { Request, Response } from 'express';

class TaskController {
    
    async index(req: Request, res: Response) {
        console.log('GET /tasks');
        res.send('Hello from taskController');
    }

}

export { TaskController };