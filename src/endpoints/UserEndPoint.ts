import { ApplicationEndPoint } from "./ApplicationEndPoint";
import { UserController } from "../controllers/UserController";
import { UserInfo, UserInfoDocument  } from "../models/UserInfo";
import { UserJobRelation } from "../models/UserJobRelation";
import * as JwtTokenMiddleware from "../middlewares/JwtTokenMiddleware";
import express, {Application, Request, Response, NextFunction} from "express";
import {check, validationResult } from "express-validator";
import {Types} from "mongoose";
import passport from "passport";
import jwt  from "jsonwebtoken";

export class UserEndPoint implements ApplicationEndPoint {
    private userController : UserController = undefined;
    public initialize(): void {
        this.initializeController(UserInfo, UserJobRelation);
    }

    public initializeController(UserInfo : any, UserJobRelation :any){
        this.userController = new UserController(UserInfo, UserJobRelation);
    }

    public checkJWTToken(req : Request, res: Response, next: NextFunction){

    }

    public registerRoutes(app: Application): void {
        let userRouter = express.Router();
        userRouter.post('/user/login', this.handleLogin.bind(this));
        userRouter.get('/user/:userId',  [ JwtTokenMiddleware.verifyJwtToken, check("userId").isLength({min : 5}).withMessage("There must be atleast 5 characters")],this.fetchUserById.bind(this));
        userRouter.get('/user/:userId/job', this.fetchUserAppliedJobs.bind(this));
        userRouter.post('/user/:userId/job', [check("userId").custom(this.checkMongooseValidId).withMessage("Id is invalid"),
                                              check("jobId").custom(this.checkMongooseValidId).withMessage("Id is invalid")],
                                              this.applyJob.bind(this));
        app.use('/', userRouter);
    }

    public checkMongooseValidId(id : string){
        return Types.ObjectId.isValid(id);
    }

    /* peform authentication and on success return JWT token! */
    
    public handleLogin(req: Request, res: Response, next : NextFunction){
        passport.authenticate('local', function(err, user, info){
            if(err){
                res.status(401).send(err);
            } else {

                /* Another way of login into sessions! req.logIn(user, function(err) */
                const jwtSecret = process.env["JWT_SECRET"]
                jwt.sign({userId : user.id}, jwtSecret, function(err : any, decoded : string){
                if(err){
                    res.status(401).send({ "message" : "You have not been authenticated!"});
                }
                res.status(200).send({ "message" : "You have been successfully logged in as" + decoded});
                });
           }
        })(req,res,next);
    }

    public fetchUserById(req : Request, res : Response){
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(422).json({errors : error.array()});
        }
        let userId = req.params.userId;
        this.userController.fetchUserById(userId).then(result => {
            res.send(result);
        }).catch((e) => {
            res.status(502).send("Internal server error" + JSON.stringify(e));
        });
    }

    public async fetchUserAppliedJobs(req : Request, res : Response){
        let userId = req.params.userId;
        try{
            let userJobDoc = await this.userController.fetchUserAppliedJobs(userId);
            res.send(userJobDoc);
        } catch(e){
            res.send(e);
        }
    }

    public applyJob(req : Request, res : Response){
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(422).json({errors : error.array()});
        }
        let userId = req.body.userId;
        let jobId = req.body.jobId;
        this.userController.applyToJob(userId, jobId).then((isSucess : boolean) => {
            if(isSucess){
                res.status(201).send("Job has been added successfully");
            } else {
                res.send(502).send("Internal server error");
            }
        }).catch(e => {
            res.send(502).send("Internal server error");
        });
    }

}