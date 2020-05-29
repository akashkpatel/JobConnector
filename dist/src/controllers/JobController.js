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
const mongoose_1 = __importDefault(require("mongoose"));
class JobController {
    constructor(JobInfoDao, EmployerJobPostingRelation) {
        this.JobInfoDao = null;
        this.EmployerJobPostingRelation = null;
        this.JobInfoDao = JobInfoDao;
        this.EmployerJobPostingRelation = EmployerJobPostingRelation;
    }
    findJobWithEmployer(employerId) {
        return __awaiter(this, void 0, void 0, function* () {
            let employerJobRelation = yield this.EmployerJobPostingRelation.findOne({ employerId: employerId }).populate("jobPostings").exec();
            return employerJobRelation;
        });
    }
    /**
     * addNewJob
     *
     */
    addNewJob(jobHeadText, jobDescription, jobImageUrl, employerId) {
        return __awaiter(this, void 0, void 0, function* () {
            let jobInfo = new this.JobInfoDao({
                _id: new mongoose_1.default.Types.ObjectId(),
                jobHeadText: jobHeadText,
                jobDescription: jobDescription,
                jobImageUrl: jobImageUrl
            });
            let employerJobRelation = yield this.EmployerJobPostingRelation.findOne({ employerId: employerId }).exec();
            if (employerJobRelation) {
                try {
                    let jobSaved = yield jobInfo.save();
                    let totalJobPostings = employerJobRelation.jobPostings;
                    if (totalJobPostings) {
                        totalJobPostings.push(jobSaved._id);
                    }
                    else {
                        totalJobPostings = [jobSaved._id];
                    }
                    console.log(totalJobPostings);
                    yield employerJobRelation.save();
                }
                catch (e) {
                    console.log(e);
                    return false;
                }
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.JobController = JobController;
//# sourceMappingURL=JobController.js.map