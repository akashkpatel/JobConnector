import mongoose, { Schema } from "mongoose";


export type EmployerJobPostingRelationDocument = mongoose.Document & {
    employerId: string,
    jobPostings: Array< Schema.Types.ObjectId>,

}

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

const EmployerJobPostingRelationSchema = new mongoose.Schema({
    employerId: String,
    jobPostings : [{ type: Schema.Types.ObjectId, ref: 'JobPosting' }]
});

export const EmployerJobPostingRelation = mongoose.model<EmployerJobPostingRelationDocument>("EmployerJobPostingRelation", EmployerJobPostingRelationSchema);