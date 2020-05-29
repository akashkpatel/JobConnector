import mongoose, {Schema} from "mongoose";


export type UserJobRelationDocument = mongoose.Document & {
    userId: string,
    jobs : [{ type: Schema.Types.ObjectId, ref: 'JobPosting' }]
}


const UserJobRelationSchema = new mongoose.Schema({
    userId: String,
    jobs: [{ type: Schema.Types.ObjectId, ref: 'JobPosting' }]
});


export const UserJobRelation = mongoose.model<UserJobRelationDocument>('UserJobRelation', UserJobRelationSchema);