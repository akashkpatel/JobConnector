"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmployerJobPostingRelation_1 = require("../../src/models/EmployerJobPostingRelation");
const DatabaseConnection_1 = require("../utils/DatabaseConnection");
const JobInfo_1 = require("../../src/models/JobInfo");
const mongoose_1 = __importDefault(require("mongoose"));
describe("CRUD operations for EmployerJobPostingRelation", function () {
    before(function (done) {
        this.enableTimeouts(false);
        DatabaseConnection_1.databaseOperations.connectToDatabase().then((result) => {
            done();
        }).catch((error) => done(error));
    });
    it("Insert Employer Job Relationship", function (done) {
        let jobInfo = {
            _id: new mongoose_1.default.Types.ObjectId(),
            jobHeadText: "SubWay Sandwitch Artist",
            jobDescription: "This job require to make sandwitch as per the standards",
            jobImageUrl: "http://subway.com"
        };
        let jobPostingInfo = new JobInfo_1.JobPosting(jobInfo);
        jobPostingInfo.save(function (err, job) {
            if (err) {
                done(err);
            }
            let employerJobRelation = new EmployerJobPostingRelation_1.EmployerJobPostingRelation({
                employerId: "1234",
                jobPostings: [job._id]
            });
            employerJobRelation.save(function (error, employerJobRel) {
                if (error) {
                    console.log("There is some errors while saving the data");
                }
                console.log(employerJobRel);
                done();
            });
        });
    });
    it("Read Employer Job Relation Data", function (done) {
        EmployerJobPostingRelation_1.EmployerJobPostingRelation.findOne({ "employerId": "1234" }).populate('jobPostings').exec(function (err, docs) {
            console.log(docs);
            done();
        });
    });
    after(function (done) {
        DatabaseConnection_1.databaseOperations.closeConnection(done);
    });
});
//# sourceMappingURL=EmployerJobPostingRelation.spec.js.map