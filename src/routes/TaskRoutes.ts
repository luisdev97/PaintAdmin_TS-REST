import { Request, Response, Router, NextFunction } from 'express';
import TaskModel, { Task } from '../models/Task';


class TaskRoutes{

    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getTasks(req: Request, res: Response, next: NextFunction):Promise <void>{
        try{

            const tasks: Array<Task> = await TaskModel.find();

            res.json({
                ok: true,
                tasks
            });
        
        }catch(error){
            res.json({ ok: false, error: error.message });
            next();
        }
    }



    async getTask(req: Request, res: Response, next: NextFunction):Promise <void>{
        try{

            let id: String = req.params.id;
            
            const task: Task|null = await TaskModel.findById(id);

            res.json({
                ok: true,
                task
            });

        }catch(error){
            res.json({ ok: false, error: error.message });
            next();
        }
    }



    async createTask(req: Request, res: Response, next: NextFunction):Promise <void>{
        try{
            const { startDate, endDate, value, matter, state, client } = req.body;

            const newTask: Task = new TaskModel({
                startDate,
                endDate,
                value,
                matter,
                state,
                client
            });

            const savedTask: Task = await newTask.save();

            res.json({
                ok: true,
                savedTask
            });

        }catch(error){
            res.json({ ok: false, error: error.message });
            next();
        }

    }



    async updateTask(req: Request, res: Response, next: NextFunction):Promise <void>{

        try{

            const id: String = req.params.id
            const body: Object = req.body;

            const updatedTask: Task|null = await TaskModel.findByIdAndUpdate(id,body,{ new: true, runValidators: true });

            res.json({
                ok: true,
                updatedTask
            });

        }catch(error){
            res.json({ ok: false, error: error.message });
            next();
        }
    }



    async deleteTask(req: Request, res: Response, next: NextFunction):Promise <void>{
        try{

            const id: String = req.params.id;

            const removedTask: Task|null = await TaskModel.findByIdAndRemove(id);

            res.json({
                ok: true,
                removedTask
            });

        }catch(error){
            res.json({ ok: false, error: error.message });
            next();
        }
    }



    async setTaskState(req: Request, res: Response, next: NextFunction):Promise <void>{

    }



    routes(){
        this.router.get('/',this.getTasks);
        this.router.get('/:id',this.getTask);
        this.router.post('/',this.createTask);
        this.router.put('/:id',this.updateTask);
        this.router.delete('/:id',this.deleteTask);
    }

}

const taskRoutes: TaskRoutes = new TaskRoutes();
export default taskRoutes.router;