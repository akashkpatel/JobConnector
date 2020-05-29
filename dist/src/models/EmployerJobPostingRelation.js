"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
/*

We can add JobSchema as subDocument to the main document!
export type JobPostingSubDocument = {
    jobId: string,
    jobHeadText: string,
    jobDescription: string,
    jobImageUrl: string,
}

const JobSchema = new mongoose.Schema({
    jobId: String,
    jobHeadText: String,
    jobDescription: String,
    jobImageUrl: String,
}, {timestamps : true});

export type JobPosting = {
    jobId: string,
    jobHeadText: string,
    jobDescription: string,
    jobImageUrl: string,
    jobCreatedDate: string
}

*/
const EmployerJobPostingRelationSchema = new mongoose_1.default.Schema({
    employerId: String,
    jobPostings: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'JobPosting' }]
});
exports.EmployerJobPostingRelation = mongoose_1.default.model("EmployerJobPostingRelation", EmployerJobPostingRelationSchema);
//# sourceMappingURL=EmployerJobPostingRelation.js.map