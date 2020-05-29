import { UserInfoDocument } from "../models/UserInfo";
import { UserJobRelationDocument } from "../models/UserJobRelation";
import mongoose from "mongoose";

export class UserController {
    private userModel : any = null;
    private userJobRelation : any = null;
    constructor(userModel : any,userJobRelation : any ){
        this.userModel = userModel;
        this.userJobRelation = userJobRelation;
    }

    public async fetchUserById(userId : string) : Promise<UserInfoDocument>{
        let userDoc : UserInfoDocument = undefined; 
        try{
            userDoc = await this.userModel.findById(userId).exec();
            //await this.userModel.findById(userId).exec()
        } catch(e) {
            console.log(e);
        }

        return userDoc;
    }

    public async fetchUserAppliedJobs(userId : string): Promise<UserJobRelationDocument>{
        try{
            let userJobRelationDocument : UserJobRelationDocument = await this.userJobRelation.findOne({userId : userId}).populate('jobs').exec();
            return userJobRelationDocument
        } catch(e){
            console.log(e);
            throw e;
        }

    }

    public async applyToJob(userId : string, jobId : string) : Promise<boolean>{
        if(mongoose.Types.ObjectId.isValid(jobId)){
            let userJobRelationToAdd  = {
                userId : userId,
                jobs : [jobId]
            }
            try{
                let userJobRelationAdded = await this.userJobRelation.create(userJobRelationToAdd);
                if(userJobRelationAdded){
                    return true;
                }
            } catch(e){
                throw e;
            }
       }
       return false;
    }

}