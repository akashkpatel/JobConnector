
import { ApplicationEndPoint } from "./ApplicationEndPoint";
import express, {Application, Request, Response} from "express";
import { JobController } from "../controllers/JobController";
import { JobPosting } from "../models/JobInfo";
import { EmployerJobPostingRelation } from "../models/EmployerJobPostingRelation";

export class JobEndPoint implements ApplicationEndPoint {

    private jobController : JobController = undefined;
    public registerRoutes(app : Application): void {
        const jobRouter = express.Router();
        jobRouter.get("/job/:jobId", this.fetchJobWithId);
        jobRouter.post("/job", this.addNewJob);
        jobRouter.put("/job", this.updateJob);
        jobRouter.delete("/job", this.deleteJob);
        app.use("/", jobRouter);
    }

    public async fetchJobWithId(req : Request, res : Response){
       
      //  res.send("Fetch job with id called" +  req.params.jobId);
        let employerId: string = req.params.jobId;
        let data = await this.jobController.findJobWithEmployer(employerId);
        res.send(data);
    }  

    /**
     *  All initialize will go here ! 
     */
    public initialize() {
        
        this.initializeController(JobPosting, EmployerJobPostingRelation);
    }

    /**
     *  seperate intializer for all components it
     */
    public initializeController(JobPosting : any, EmployerJobPostingRelation : any) {
        this.jobController = new JobController(JobPosting, EmployerJobPostingRelation);
    }

    public addNewJob(req: Request, res: Response){

        // collecting param placeholder!
        const employerId: string = req.body.employerId;
        const jobHeadText: string = req.body.jobHeadText;
        const jobDescription: string = req.body.jobDescription;
        const jobImageUrl: string = req.body.jobImageUrl;

        this.jobController.addNewJob(jobHeadText, jobDescription, jobImageUrl, employerId).then((result) => {
            res.send(result);
        }).catch(e => {
            res.send(e);
        })
    }
    public updateJob(req: Request, res: Response){
        res.send("Update job");
    }
    public deleteJob(req: Request, res: Response){
        res.send("Delete job");
    }
}