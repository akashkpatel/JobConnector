import mongoose from "mongoose";


export type UserEmployerSubScriptionDocument = mongoose.Document & {
    userId: string,
    employerIds: Array<string>
}


const UserEmployerSubScriptionSchema = new mongoose.Schema({
    userId: String,
    employerIds:[]
});

export const UserEmployerSubScription = mongoose.model<UserEmployerSubScriptionDocument>('UserEmployerSubScription', UserEmployerSubScriptionSchema);