"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class EmployerEndPoint {
    initialize() {
        throw new Error("Method not implemented.");
    }
    registerRoutes(app) {
        const employerRouter = express_1.default.Router();
        employerRouter.get("/employer/:id", this.fetchEmployer);
        employerRouter.get("/employer/:id/job", this.fetchAllJobs);
        employerRouter.get("/employer/:id/job/:jobId", this.fetchEmployerJob);
        app.use("/", employerRouter);
    }
    fetchEmployer(req, res) {
    }
    fetchAllJobs(req, res) {
    }
    fetchEmployerJob(req, res) {
    }
}
//# sourceMappingURL=EmployerEndpoint.js.map