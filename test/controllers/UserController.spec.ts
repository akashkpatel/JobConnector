import sinon, {SinonSandbox, SinonMock} from "sinon";
import {assert} from "chai";
import { UserController } from "../../src/controllers/UserController";
import { UserInfo, UserInfoDocument } from "../../src/models/UserInfo";
import { UserJobRelation } from "../../src/models/UserJobRelation";


describe("USER CONTROLLER testing", function(){

    let sandbox : SinonSandbox;
    let _UserJobRelation : SinonMock;
    let userData1 : any = { 
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
    let jobApplied = {
        "jobs": [
            {
                "_id": "5ec967b2968524261588e1eb",
                "jobHeadText": "Subway Artist opening",
                "jobDescription": "New job in deerfield Area",
                "jobImageUrl": "http://subway.com",
                "__v": 0
            }
        ],
        "_id": "5ecc4eb4efcf16f808b7a4b0",
        "userId": "5ec88596215b1d56b9fad41f",
        "__v": 0
    }
    let userIdToSupply = "4444";
      
    beforeEach(function(){
        sandbox =  sinon.createSandbox();
        _UserJobRelation = sandbox.mock(UserJobRelation);
    });

    it("Stub fetching user testing", async function(){
        let userIdToSupply = "4444";
        let userController = new UserController(UserInfo, UserJobRelation);
        sandbox.stub(UserInfo, 'findById').callsFake(() :any => {
            return {
                exec : sinon.stub().resolves(userData1)
            };
        })
        
        let userDoc = await userController.fetchUserById(userIdToSupply);
        assert.equal(userDoc.email, userData1.email);
    });

    it("Stub fetching user applied testing", async function(){
        let userController = new UserController(UserInfo, UserJobRelation);
        sandbox.stub(UserJobRelation, 'findOne').callsFake(() :any => {
            return {
                populate : (() => {
                    return {
                        exec : sinon.stub().resolves(jobApplied)
                    };
                })
            };
        })
        
        let userJobApplied : any = await userController.fetchUserAppliedJobs(userIdToSupply);
        assert.equal(userJobApplied.jobs[0].jobHeadText, jobApplied.jobs[0].jobHeadText);
    });

    it("Mocking apply to job", async function(){
        let userController = new UserController(UserInfo, UserJobRelation);
        let jobId = "5ec967b2968524261588e1eb";
        let userJobRelationToAdd  = {
            userId : userIdToSupply,
            jobs : [jobId]
        }
        _UserJobRelation.expects('create').withExactArgs(userJobRelationToAdd).resolves(jobApplied);
        let isSucess = await userController.applyToJob(userIdToSupply, jobId);
        assert.isTrue(isSucess);
        _UserJobRelation.verify();
       
    });

    
    it("Another way Stub fetching user applied testing", async function(){
        let justFakeUserRelation = {
            findOne : () => {
                return {
                    populate: () =>{
                        return {
                            exec : function(){
                                return Promise.resolve(jobApplied);
                            }
                        }
                    }
                }
            }
        }
        let userController = new UserController(UserInfo, justFakeUserRelation);
        let userJobApplied : any = await userController.fetchUserAppliedJobs(userIdToSupply);
        assert.equal(userJobApplied.jobs[0].jobHeadText, jobApplied.jobs[0].jobHeadText);
       
    });

    afterEach(function(){
        sandbox.restore();
    })


});