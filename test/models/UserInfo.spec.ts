import {UserInfo, UserInfoDocument} from "../../src/models/UserInfo"
import { databaseOperations } from "../utils/DatabaseConnection";
import { assert, expect, should } from "chai";


describe("CRUD Testing for UserInfo", function(){

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
    before(function(done){
        this.enableTimeouts(false);
        databaseOperations.connectToDatabase().then((result) => {
            done();
        }).catch((error) => done(error));
    })

    it("Insert into UserInfo", function(){

        const userInfo1 : UserInfoDocument  = new UserInfo({ email: "akash08@gmail.com",
            password: "aasas",
            profile: {
                name: "Akash Patel",
                gender: "M",
                location: "2006 Saint Laurent",
                website: "",
                picture: ""
        }});
        userInfo1.save(function(err, userInfo : UserInfoDocument){
            if(err){
                console.log(err);
                assert.fail("Problem while saving data");
            }
            
            assert.exists(userInfo);
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
    it("Updating document", function(done){
        UserInfo.updateOne({email : "akash08@gmail.com"}, {email : "akashpatel@gmail.com"}, function(err, updatedDoc : UserInfoDocument){
            console.log(updatedDoc);
            done();
        });
    });

    it("Removing the document", function(done){
        const userInfo1 : UserInfoDocument  = new UserInfo(userData3);
        userInfo1.save(function(err, userInfo : UserInfoDocument){
            UserInfo.findOneAndDelete({email : userData3.email}, function(error, deletedDoc : UserInfoDocument){
                if(error){
                    assert.fail("Problem while deleting doc");
                }
                done();
            });
        });
       
    });

    it("Insert multiple documents", function(){
        const userInfo1 : UserInfoDocument  = new UserInfo({ email: "akash08ce@gmail.com",
            password: "aasas",
            profile: {
                name: "Akash Patel",
                gender: "M",
                location: "2006 Saint Laurent",
                website: "",
                picture: ""
            }
        });

        const userInfo2 : UserInfoDocument  = new UserInfo({ email: "akash08ce063@gmail.com",
            password: "aasas",
            profile: {
                name: "Akash Babar",
                gender: "M",
                location: "2006 Saint Mathiue",
                website: "http://fake.com",
                picture: "http://imgur.com"
            }
        });

        UserInfo.insertMany([userInfo1, userInfo2], function(err, docs){
            //assert.isNotNull(err, "There is error while adding data");
            assert.notExists(err, "Problem while saving data");
            assert.equal(docs.length, 2);
        });
    });


    it("Find similar gender Users" , function(){
        UserInfo.find({"profile.gender" : 'M'}, function(err, userInfo: UserInfoDocument){
            userInfo.findSimilarGenderUser(function(errors : any, similarGenderUsers: UserInfoDocument[]){
                if(errors){
                    console.log(errors);
                } else {
                    console.log(similarGenderUsers);
                }
            });
        });
    });

    it("Find user with email Address", function(){
        UserInfo.schema.methods.findUserWithEmail("akash08@gmail.com", function(err : any, userInfos : UserInfoDocument[]){
            console.log(userInfos);
        });
    });


    it("Update UserInfo", function(){
        UserInfo.findOne({"profile.gender" : 'M'}, function(err, userInfo: UserInfoDocument){
            console.log(userInfo.UserIdTypes);
        });
    });

    after(function(done) {
        databaseOperations.closeConnection(done);
    });

});