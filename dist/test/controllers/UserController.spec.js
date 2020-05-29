"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const UserController_1 = require("../../src/controllers/UserController");
const UserInfo_1 = require("../../src/models/UserInfo");
const UserJobRelation_1 = require("../../src/models/UserJobRelation");
describe("USER CONTROLLER testing", function () {
    let sandbox;
    let _UserJobRelation;
    let userData1 = {
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
    };
    let userIdToSupply = "4444";
    beforeEach(function () {
        sandbox = sinon_1.default.createSandbox();
        _UserJobRelation = sandbox.mock(UserJobRelation_1.UserJobRelation);
    });
    it("Stub fetching user testing", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let userIdToSupply = "4444";
            let userController = new UserController_1.UserController(UserInfo_1.UserInfo, UserJobRelation_1.UserJobRelation);
            sandbox.stub(UserInfo_1.UserInfo, 'findById').callsFake(() => {
                return {
                    exec: sinon_1.default.stub().resolves(userData1)
                };
            });
            let userDoc = yield userController.fetchUserById(userIdToSupply);
            chai_1.assert.equal(userDoc.email, userData1.email);
        });
    });
    it("Stub fetching user applied testing", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let userController = new UserController_1.UserController(UserInfo_1.UserInfo, UserJobRelation_1.UserJobRelation);
            sandbox.stub(UserJobRelation_1.UserJobRelation, 'findOne').callsFake(() => {
                return {
                    populate: (() => {
                        return {
                            exec: sinon_1.default.stub().resolves(jobApplied)
                        };
                    })
                };
            });
            let userJobApplied = yield userController.fetchUserAppliedJobs(userIdToSupply);
            chai_1.assert.equal(userJobApplied.jobs[0].jobHeadText, jobApplied.jobs[0].jobHeadText);
        });
    });
    it("Mocking apply to job", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let userController = new UserController_1.UserController(UserInfo_1.UserInfo, UserJobRelation_1.UserJobRelation);
            let jobId = "5ec967b2968524261588e1eb";
            let userJobRelationToAdd = {
                userId: userIdToSupply,
                jobs: [jobId]
            };
            _UserJobRelation.expects('create').withExactArgs(userJobRelationToAdd).resolves(jobApplied);
            let isSucess = yield userController.applyToJob(userIdToSupply, jobId);
            chai_1.assert.isTrue(isSucess);
            _UserJobRelation.verify();
        });
    });
    it("Another way Stub fetching user applied testing", function () {
        return __awaiter(this, void 0, void 0, function* () {
            let justFakeUserRelation = {
                findOne: () => {
                    return {
                        populate: () => {
                            return {
                                exec: function () {
                                    return Promise.resolve(jobApplied);
                                }
                            };
                        }
                    };
                }
            };
            let userController = new UserController_1.UserController(UserInfo_1.UserInfo, justFakeUserRelation);
            let userJobApplied = yield userController.fetchUserAppliedJobs(userIdToSupply);
            chai_1.assert.equal(userJobApplied.jobs[0].jobHeadText, jobApplied.jobs[0].jobHeadText);
        });
    });
    afterEach(function () {
        sandbox.restore();
    });
});
//# sourceMappingURL=UserController.spec.js.map