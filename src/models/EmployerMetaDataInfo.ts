import mongoose from "mongoose";


export type EmployerMetaDataInfoDocument = mongoose.Document & {
    ownerName: string,
    workerCapacities: number
}


const EmployerMetaDataInfoSchema = new mongoose.Schema({
    ownerName: String,
    workerCapacities: Number
});

export const EmployerMetaDataInfo = mongoose.model<EmployerMetaDataInfoDocument>('EmployerMetaDataInfo', EmployerMetaDataInfoSchema);