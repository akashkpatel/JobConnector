"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JobInfo_1 = require("../../src/models/JobInfo");
const UserJobRelation_1 = require("../../src/models/UserJobRelation");
const DatabaseConnection_1 = require("../utils/DatabaseConnection");
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
        jobPostingInfo.save(function (error, jobTemp) {
            if (error) {
                console.log("There is some errors while saving the data");
            }
            let jj = [];
            jj.push(jobTemp._id);
            const userJobRelations = new UserJobRelation_1.UserJobRelation({
                userId: 1234,
                jobs: jj
            });
            console.log(jj);
            userJobRelations.save(function (err, userJobRelation) {
                if (err) {
                    console.log(err);
                    console.log("There is problem saving user job Relatiosns");
                }
                console.log(userJobRelation);
                done();
            });
        });
    });
    it("FF", function (done) {
        UserJobRelation_1.UserJobRelation.find({ "userId": "1234" }).exec(function (err, data) {
            console.log(err);
            console.log(JSON.stringify(data));
            done();
        });
    });
    after(function (done) {
        DatabaseConnection_1.databaseOperations.closeConnection(done);
    });
});
//# sourceMappingURL=ExpJobSaving.spec.js.map