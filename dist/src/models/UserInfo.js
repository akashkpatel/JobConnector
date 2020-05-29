"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// define mongoose schema
/**
 *  we can put restriction on the some values
 *  UserInfoSchema.path('profile.gender').default('M')
 *  UserInfoSchema.path('profile.gender').validate(g => g == "M" || g == "F")
 */
const UserInfoSchema = new mongoose_1.default.Schema({
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
UserInfoSchema.methods.findSimilarGenderUser = function (cb) {
    return mongoose_1.default.model('UserInfo').find({ 'profile.gender': this.profile.gender }, cb);
};
UserInfoSchema.methods.findUserWithEmail = function (email, cb) {
    return mongoose_1.default.model('UserInfo').find({ "email": email }, cb);
};
UserInfoSchema.virtual('UserIdTypes').get(function () {
    return this.email + " : " + this.profile.name;
});
// define model here
exports.UserInfo = mongoose_1.default.model('UserInfo', UserInfoSchema);
//# sourceMappingURL=UserInfo.js.map