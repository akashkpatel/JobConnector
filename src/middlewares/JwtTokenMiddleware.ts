import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const verifyJwtToken =  (req : Request,res : Response, next : NextFunction) => {
    const authHeader = req.headers['authorization'];
    const jwtTokenFromClient = authHeader && authHeader.split(' ')[1];
    if(jwtTokenFromClient == null){
        res.status(401).send({"message" : "Not Authorized"});
    } else {
        jwt.verify(jwtTokenFromClient, process.env["JWT_SECRET"], (err : any, userId: any) => {
            if(err) return res.sendStatus(403);
            req.user = userId;
            next();
        });
    }
}
