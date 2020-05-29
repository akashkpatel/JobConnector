import express, {Application, Request, Response} from "express";
import { ApplicationEndPoint } from "./ApplicationEndPoint";

class EmployerEndPoint implements ApplicationEndPoint{
    public initialize(): void {
        throw new Error("Method not implemented.");
    }
    public registerRoutes(app : Application): void {
        const employerRouter = express.Router();
        employerRouter.get("/employer/:id", this.fetchEmployer)
        employerRouter.get("/employer/:id/job", this.fetchAllJobs);
        employerRouter.get("/employer/:id/job/:jobId", this.fetchEmployerJob);
        app.use("/", employerRouter);
    }
    public fetchEmployer(req : Request, res: Response){

    }

    public fetchAllJobs(req: Request, res : Response){

    }

    public fetchEmployerJob(req : Request, res: Response){

    }
}