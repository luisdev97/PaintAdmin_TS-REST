import { Request, Response, Router, NextFunction } from 'express';
import ClientModel from '../models/Client';
import { Client } from '../models/Client';



class ClientRoutes {

    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }



    //Get the list of clients saved on our database
    async getClients(req: Request, res: Response, next: NextFunction): Promise<void>{

        try{
            
            const clients: Array<Client> = await ClientModel.find();

            res.json({
                ok: true,
                clients
            });

        }catch(error){
            res.json({ ok: false, error: error.message });
            next();
        }
    }



    //get a client for our db, receives an id on url.
    async getClient(req: Request, res: Response, next: NextFunction): Promise<void>{

        try{
            
            const id: String = req.params.id;   
            const client: Client|null = await ClientModel.findById(id);
            
            res.json({
                ok: true,
                client
            });

        }catch(error){
            res.json({ ok: false, error: error.message });
            next();
        }
    }


    //Add a new client on our database,receives the properties on the body.
    async createClient(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{

            const { name, lastName, phoneNum, address } = req.body;
            const newClient: Client = new ClientModel({
                name,
                lastName,
                phoneNum,
                address
            });
            
            const savedClient: Client = await newClient.save();

            res.json({
                ok: true,
                savedClient
            });

        }catch(error){
            res.json({ ok: false, error: error.message });
            next();
        }
    }



    //Modify one or several properties of one user saved on our database, receives an id on the url and the properties we want to change on the body
    async updateClient(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {

            let id: String = req.params.id;   
            const body: Object = req.body;

            const updatedClient: Client|null = await ClientModel.findByIdAndUpdate(id,body,{ new: true, runValidators: true });
        
            res.json({
                ok: true,
                updatedClient
            });
            
        }catch(error){
            res.json({ ok: false, error: error.message });
            next();
        }
    }



    //Remove one client on our db, receives an id on the url.
    async deleteClient(req: Request, res: Response, next: NextFunction): Promise<void>{
       
        try{

            let id: String = req.params.id;
            const deletedClient: Client|null = await ClientModel.findByIdAndRemove(id);
    
            res.json({
                ok: true,
                deletedClient
            });

       }catch(error){
           res.json({ ok: false, error: error.message });
           next();
       }
    }




    //Method that config the routes for ClientRoutes
    routes(){
        this.router.get('/',this.getClients);
        this.router.get('/:id',this.getClient);
        this.router.post('/',this.createClient);
        this.router.put('/:id',this.updateClient);
        this.router.delete('/:id',this.deleteClient);
    }

}

const clientRoutes: ClientRoutes = new ClientRoutes();
export default clientRoutes.router;