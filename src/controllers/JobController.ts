import mongoose from "mongoose";
export class JobController {
    private JobInfoDao : any =null;
    private EmployerJobPostingRelation: any = null;
    constructor(JobInfoDao : any, EmployerJobPostingRelation: any){
        this.JobInfoDao = JobInfoDao;
        this.EmployerJobPostingRelation = EmployerJobPostingRelation;
    }

    public async findJobWithEmployer(employerId : string){
        let employerJobRelation = await this.EmployerJobPostingRelation.findOne({employerId : employerId}).populate("jobPostings").exec();
        return employerJobRelation;
    }

    /**
     * addNewJob
     * 
     */


    public async addNewJob(jobHeadText: string, jobDescription: string, jobImageUrl: string, employerId : string) : Promise<any> {

        let jobInfo = new this.JobInfoDao({
            _id: new mongoose.Types.ObjectId(),
            jobHeadText : jobHeadText,
            jobDescription: jobDescription,
            jobImageUrl: jobImageUrl
        });
      
        let employerJobRelation = await this.EmployerJobPostingRelation.findOne({employerId : employerId}).exec();
        if(employerJobRelation){
           try {
               let jobSaved =  await jobInfo.save();
               let totalJobPostings = employerJobRelation.jobPostings;
               if(totalJobPostings ){
                  totalJobPostings.push(jobSaved._id);
               } else {
                  totalJobPostings = [jobSaved._id];
               }
               console.log(totalJobPostings);
               await employerJobRelation.save();
            } catch(e) {
                console.log(e);    
                return false;
            }
            return true;
        } else {
            return false;
        }
        
    }
}