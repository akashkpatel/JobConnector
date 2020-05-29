import { EmployerJobPostingRelation, EmployerJobPostingRelationDocument } from "../../src/models/EmployerJobPostingRelation";
import { databaseOperations } from "../utils/DatabaseConnection";
import {JobPostingDocument,  JobPosting } from "../../src/models/JobInfo";
import mongoose from "mongoose";

describe("CRUD operations for EmployerJobPostingRelation", function(){
    before(function(done){
        this.enableTimeouts(false);
        databaseOperations.connectToDatabase().then((result) => {
            done();
        }).catch((error) => done(error));
    });
    it("Insert Employer Job Relationship", function(done){
        
        let jobInfo  = {
            _id: new mongoose.Types.ObjectId(),
            jobHeadText: "SubWay Sandwitch Artist",
            jobDescription: "This job require to make sandwitch as per the standards",
            jobImageUrl: "http://subway.com"
        }
        let jobPostingInfo : JobPostingDocument = new JobPosting(jobInfo);

        jobPostingInfo.save(function(err: any , job : JobPostingDocument){
            if(err){
                done(err);
            }
            let employerJobRelation : EmployerJobPostingRelationDocument = new EmployerJobPostingRelation({
                employerId: "1234",
                jobPostings : [job._id]
            });
    
            employerJobRelation.save(function(error : any,employerJobRel : EmployerJobPostingRelationDocument ){
                if(error){
                    console.log("There is some errors while saving the data");
                }
                console.log(employerJobRel);
                done();
            })
        });

        
    });

    it("Read Employer Job Relation Data", function(done){

        EmployerJobPostingRelation.findOne({"employerId" : "1234"}).populate('jobPostings').exec(function(err, docs){
            console.log(docs)
            done();
        })
    });

    after(function(done){
        databaseOperations.closeConnection(done);
    });
});