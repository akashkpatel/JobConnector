"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserMetaDataInfoSchema = new mongoose_1.default.Schema({
    summary: String,
    cvPath: String,
    coverLetterPath: String,
    linkedInLink: String
});
exports.UserMetaDataInfo = mongoose_1.default.model("UserMetaDataInfo", UserMetaDataInfoSchema);
//# sourceMappingURL=UserMetaDataInfo.js.map