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
exports.UserEndPoint = void 0;
const UserController_1 = require("../controllers/UserController");
const UserInfo_1 = require("../models/UserInfo");
const UserJobRelation_1 = require("../models/UserJobRelation");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const mongoose_1 = require("mongoose");
class UserEndPoint {
    constructor() {
        this.userController = undefined;
    }
    initialize() {
        this.initializeController(UserInfo_1.UserInfo, UserJobRelation_1.UserJobRelation);
    }
    initializeController(UserInfo, UserJobRelation) {
        this.userController = new UserController_1.UserController(UserInfo, UserJobRelation);
    }
    registerRoutes(app) {
        let userRouter = express_1.default.Router();
        userRouter.get('/user/:userId', [express_validator_1.check("userId").isLength({ min: 5 }).withMessage("There must be atleast 5 characters")], this.fetchUserById.bind(this));
        userRouter.get('/user/:userId/job', this.fetchUserAppliedJobs.bind(this));
        userRouter.post('/user/:userId/job', [express_validator_1.check("userId").custom(this.checkMongooseValidId).withMessage("Id is invalid"),
            express_validator_1.check("jobId").custom(this.checkMongooseValidId).withMessage("Id is invalid")], this.applyJob.bind(this));
        app.use('/', userRouter);
    }
    checkMongooseValidId(id) {
        return mongoose_1.Types.ObjectId.isValid(id);
    }
    fetchUserById(req, res) {
        const error = express_validator_1.validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ errors: error.array() });
        }
        let userId = req.params.userId;
        this.userController.fetchUserById(userId).then(result => {
            res.send(result);
        }).catch((e) => {
            res.status(502).send("Internal server error" + JSON.stringify(e));
        });
    }
    fetchUserAppliedJobs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userId = req.params.userId;
            try {
                let userJobDoc = yield this.userController.fetchUserAppliedJobs(userId);
                res.send(userJobDoc);
            }
            catch (e) {
                res.send(e);
            }
        });
    }
    applyJob(req, res) {
        const error = express_validator_1.validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ errors: error.array() });
        }
        let userId = req.body.userId;
        let jobId = req.body.jobId;
        this.userController.applyToJob(userId, jobId).then((isSucess) => {
            if (isSucess) {
                res.status(201).send("Job has been added successfully");
            }
            else {
                res.send(502).send("Internal server error");
            }
        }).catch(e => {
            res.send(502).send("Internal server error");
        });
    }
}
exports.UserEndPoint = UserEndPoint;
//# sourceMappingURL=UserEndPoint.js.map