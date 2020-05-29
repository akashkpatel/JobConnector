import mongoose from "mongoose";


export type UserMetaDataInfoDocument = mongoose.Document & {
    summary: string,
    cvPath: string,
    coverLetterPath: string,
    linkedInLink: string
};


const UserMetaDataInfoSchema = new mongoose.Schema({
    summary: String,
    cvPath: String,
    coverLetterPath: String,
    linkedInLink: String
});


export const UserMetaDataInfo = mongoose.model<UserMetaDataInfoDocument>("UserMetaDataInfo", UserMetaDataInfoSchema);