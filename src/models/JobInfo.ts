import mongoose,{ Schema } from "mongoose"


export type JobPostingDocument = mongoose.Document & {
    _id: Schema.Types.ObjectId,
    jobHeadText: string,
    jobDescription: string,
    jobImageUrl: string,
}

const JobPostingSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    jobHeadText: String,
    jobDescription: String,
    jobImageUrl: String,
});


export const JobPosting = mongoose.model<JobPostingDocument>('JobPosting', JobPostingSchema);