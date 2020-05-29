"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EmployerMetaDataInfoSchema = new mongoose_1.default.Schema({
    ownerName: String,
    workerCapacities: Number
});
exports.EmployerMetaDataInfo = mongoose_1.default.model('EmployerMetaDataInfo', EmployerMetaDataInfoSchema);
//# sourceMappingURL=EmployerMetaDataInfo.js.map