"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// define mongoose schema
const EmployerInfoSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    password: String,
    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: { createdAt: 'createdAt' } });
// define model here
exports.EmployerInfo = mongoose_1.default.model('EmployerInfo', EmployerInfoSchema);
//# sourceMappingURL=EmployerInfo.js.map