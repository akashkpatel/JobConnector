"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserInfo_1 = require("../../src/models/UserInfo");
const DatabaseConnection_1 = require("../utils/DatabaseConnection");
const chai_1 = require("chai");
describe("CRUD Testing for UserInfo", function () {
    let userData3 = {
        email: "bittu@gmail.com",
        password: "aasas",
        profile: {
            name: "Akash Patel",
            gender: "M",
            location: "2006 Saint Laurent",
            website: "",
            picture: ""
        }
    };
    before(function (done) {
        this.enableTimeouts(false);
        DatabaseConnection_1.databaseOperations.connectToDatabase().then((result) => {
            done();
        }).catch((error) => done(error));
    });
    it("Insert into UserInfo", function () {
        const userInfo1 = new UserInfo_1.UserInfo({ email: "akash08@gmail.com",
            password: "aasas",
            profile: {
                name: "Akash Patel",
                gender: "M",
                location: "2006 Saint Laurent",
                website: "",
                picture: ""
            } });
        userInfo1.save(function (err, userInfo) {
            if (err) {
                console.log(err);
                chai_1.assert.fail("Problem while saving data");
            }
            chai_1.assert.exists(userInfo);
        });
    });
    /*
        Well I don't prefer this way of updating the doc!
        UserInfo.findOne({email : "akash08@gmail.com"}, function(err, userDoc : UserInfoDocument){
            userDoc.email = "akashpatel@gmail.com";
            userDoc.save(function(error , updatedDoc){
                
                done();
            });
            
        });
    */
    it("Updating document", function (done) {
        UserInfo_1.UserInfo.updateOne({ email: "akash08@gmail.com" }, { email: "akashpatel@gmail.com" }, function (err, updatedDoc) {
            console.log(updatedDoc);
            done();
        });
    });
    it("Removing the document", function (done) {
        const userInfo1 = new UserInfo_1.UserInfo(userData3);
        userInfo1.save(function (err, userInfo) {
            UserInfo_1.UserInfo.findOneAndDelete({ email: userData3.email }, function (error, deletedDoc) {
                if (error) {
                    chai_1.assert.fail("Problem while deleting doc");
                }
                done();
            });
        });
    });
    it("Insert multiple documents", function () {
        const userInfo1 = new UserInfo_1.UserInfo({ email: "akash08ce@gmail.com",
            password: "aasas",
            profile: {
                name: "Akash Patel",
                gender: "M",
                location: "2006 Saint Laurent",
                website: "",
                picture: ""
            }
        });
        const userInfo2 = new UserInfo_1.UserInfo({ email: "akash08ce063@gmail.com",
            password: "aasas",
            profile: {
                name: "Akash Babar",
                gender: "M",
                location: "2006 Saint Mathiue",
                website: "http://fake.com",
                picture: "http://imgur.com"
            }
        });
        UserInfo_1.UserInfo.insertMany([userInfo1, userInfo2], function (err, docs) {
            //assert.isNotNull(err, "There is error while adding data");
            chai_1.assert.notExists(err, "Problem while saving data");
            chai_1.assert.equal(docs.length, 2);
        });
    });
    it("Find similar gender Users", function () {
        UserInfo_1.UserInfo.find({ "profile.gender": 'M' }, function (err, userInfo) {
            userInfo.findSimilarGenderUser(function (errors, similarGenderUsers) {
                if (errors) {
                    console.log(errors);
                }
                else {
                    console.log(similarGenderUsers);
                }
            });
        });
    });
    it("Find user with email Address", function () {
        UserInfo_1.UserInfo.schema.methods.findUserWithEmail("akash08@gmail.com", function (err, userInfos) {
            console.log(userInfos);
        });
    });
    it("Update UserInfo", function () {
        UserInfo_1.UserInfo.findOne({ "profile.gender": 'M' }, function (err, userInfo) {
            console.log(userInfo.UserIdTypes);
        });
    });
    after(function (done) {
        DatabaseConnection_1.databaseOperations.closeConnection(done);
    });
});
//# sourceMappingURL=UserInfo.spec.js.map