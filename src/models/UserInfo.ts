
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// define mongoose Document schema here.
export type UserInfoDocument = mongoose.Document & {
    email : string,
    password: string,
    createdAt: Date,
    profile: {
        name: string;
        gender: string;
        location: string;
        website: string;
        picture: string;
    };
    findSimilarGenderUser: Function,
    UserIdTypes: string
};


// define mongoose schema
/**
 *  we can put restriction on the some values
 *  UserInfoSchema.path('profile.gender').default('M')
 *  UserInfoSchema.path('profile.gender').validate(g => g == "M" || g == "F")
 */
const UserInfoSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: { createdAt: 'createdAt' }});

UserInfoSchema.methods.findSimilarGenderUser = function(cb : any){
    return mongoose.model('UserInfo').find({'profile.gender': this.profile.gender}, cb);
}

UserInfoSchema.methods.findUserWithEmail = function(email : string, cb: (err: any, userInfo: UserInfoDocument)=>{}){
    return mongoose.model('UserInfo').find({"email" : email}, cb);
};

UserInfoSchema.virtual('UserIdTypes').get(function(){
    return this.email + " : " + this.profile.name;
});

// define model here
export const UserInfo = mongoose.model<UserInfoDocument>('UserInfo', UserInfoSchema);