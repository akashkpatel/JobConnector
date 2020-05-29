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
exports.UserController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class UserController {
    constructor(userModel, userJobRelation) {
        this.userModel = null;
        this.userJobRelation = null;
        this.userModel = userModel;
        this.userJobRelation = userJobRelation;
    }
    fetchUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let userDoc = undefined;
            try {
                userDoc = yield this.userModel.findById(userId).exec();
                //await this.userModel.findById(userId).exec()
            }
            catch (e) {
                console.log(e);
            }
            return userDoc;
        });
    }
    fetchUserAppliedJobs(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userJobRelationDocument = yield this.userJobRelation.findOne({ userId: userId }).populate('jobs').exec();
                return userJobRelationDocument;
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        });
    }
    applyToJob(userId, jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.default.Types.ObjectId.isValid(jobId)) {
                let userJobRelationToAdd = {
                    userId: userId,
                    jobs: [jobId]
                };
                try {
                    let userJobRelationAdded = yield this.userJobRelation.create(userJobRelationToAdd);
                    if (userJobRelationAdded) {
                        return true;
                    }
                }
                catch (e) {
                    throw e;
                }
            }
            return false;
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map