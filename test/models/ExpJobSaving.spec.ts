import { JobPosting, JobPostingDocument } from "../../src/models/JobInfo";
import { UserJobRelation, UserJobRelationDocument } from "../../src/models/UserJobRelation";
import { databaseOperations } from "../utils/DatabaseConnection";
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

        jobPostingInfo.save(function(error : any,jobTemp : JobPostingDocument ){
            if(error){
                console.log("There is some errors while saving the data");
            }
            let jj = [];
            jj.push(jobTemp._id);
            const userJobRelations = new UserJobRelation({
                userId : 1234,
                jobs:jj
            })
            console.log(jj);
            userJobRelations.save(function(err, userJobRelation : UserJobRelationDocument){
                if(err){
                    console.log(err);
                    console.log("There is problem saving user job Relatiosns");
                }
                console.log(userJobRelation);
                done();
            })
        })
    });

    it("FF", function(done){
        UserJobRelation.find({"userId" : "1234"}).exec(function(err, data){
            console.log(err)
            console.log(JSON.stringify(data));
            done();
        });
    });



    after(function(done){
        databaseOperations.closeConnection(done);
    });
});