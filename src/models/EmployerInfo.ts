
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose"

// define mongoose Document schema here.
export type EmployerInfoDocument = mongoose.Document & {
    email : string,
    password: string,
    createdAt: Date,
    profile: {
        name: string;
        gender: string;
        location: string;
        website: string;
        picture: string;
    };
};


// define mongoose schema

const EmployerInfoSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: { createdAt: 'createdAt' }});

// define model here
export const EmployerInfo = mongoose.model<EmployerInfoDocument>('EmployerInfo', EmployerInfoSchema);