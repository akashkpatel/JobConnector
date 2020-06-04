import passport from "passport";
let LocalStrategy = require('passport-local').Strategy;
import { UserInfo, UserInfoDocument } from "../models/UserInfo";
import { ErrorObject } from "../utils/ErrorObject";

export class AuthenticationHandler {

    public async deployAuthenticationStrategy(){
        passport.use(new LocalStrategy({usernameField : 'email'}, function(username : string, password: string, done : any){
             UserInfo.findOne({email : username, password : password}, (err, user) =>{
                if(err){
                    return done(err);
                } else {
                    if(user)
                        done(null, user)
                    else {
                        done(new ErrorObject({status : 404, message : "User is not found"}), null);
                    }    
                }
             });
        }));

       passport.serializeUser(function(user : UserInfoDocument, done){
            done(null, user.id);
       });

       passport.deserializeUser(function(id, done){
            UserInfo.findById(id, function(err, user){
                done(err, user.id);
            });
       });

    };

}