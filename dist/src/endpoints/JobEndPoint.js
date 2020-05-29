"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const JobController_1 = require("../controllers/JobController");
const JobInfo_1 = require("../models/JobInfo");
const EmployerJobPostingRelation_1 = require("../models/EmployerJobPostingRelation");
class JobEndPoint {
    constructor() {
        this.jobController = undefined;
    }
    registerRoutes(app) {
        const jobRouter = express_1.default.Router();
        jobRouter.get("/job/:jobId", this.fetchJobWithId);
        jobRouter.post("/job", this.addNewJob);
        jobRouter.put("/job", this.updateJob);
        jobRouter.delete("/job", this.deleteJob);
        app.use("/", jobRouter);
    }
    fetchJobWithId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //  res.send("Fetch job with id called" +  req.params.jobId);
            let employerId = req.params.jobId;
            let data = yield this.jobController.findJobWithEmployer(employerId);
            res.send(data);
        });
    }
    /**
     *  All initialize will go here !
     */
    initialize() {
        this.initializeController(JobInfo_1.JobPosting, EmployerJobPostingRelation_1.EmployerJobPostingRelation);
    }
    /**
     *  seperate intializer for all components it
     */
    initializeController(JobPosting, EmployerJobPostingRelation) {
        this.jobController = new JobController_1.JobController(JobPosting, EmployerJobPostingRelation);
    }
    addNewJob(req, res) {
        // collecting param placeholder!
        const employerId = req.body.employerId;
        const jobHeadText = req.body.jobHeadText;
        const jobDescription = req.body.jobDescription;
        const jobImageUrl = req.body.jobImageUrl;
        this.jobController.addNewJob(jobHeadText, jobDescription, jobImageUrl, employerId).then((result) => {
            res.send(result);
        }).catch(e => {
            res.send(e);
        });
    }
    updateJob(req, res) {
        res.send("Update job");
    }
    deleteJob(req, res) {
        res.send("Delete job");
    }
}
exports.JobEndPoint = JobEndPoint;
//# sourceMappingURL=JobEndPoint.js.map