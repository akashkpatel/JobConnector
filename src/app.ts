import express, {Request, Response} from "express";
import mongoose from "mongoose";
import { JobEndPoint } from "./endpoints/JobEndPoint";
import { UserEndPoint} from "./endpoints/UserEndPoint";
import bodyParser from "body-parser";
import { ApplicationEndPoint } from "./endpoints/ApplicationEndPoint";
import session from "express-session";
import  passport from "passport";
import * as secrets from "./utils/secret";
let file = require("./utils/secret");
import { AuthenticationHandler } from "./middlewares/PassportMiddleware";
let app = express();

// parsing body of the app!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "ashdfjhasdlkjfhalksdjhflak"
}));
app.use(passport.initialize());
app.use(passport.session());

let authHandler = new AuthenticationHandler();
authHandler.deployAuthenticationStrategy();



mongoose.connect("mongodb://localhost/JobConnector", { useNewUrlParser: true })
let db = mongoose.connection
db.on('error', console.error.bind("There is a problem with database connections"))
db.on('open', function(){
    console.log("Connection has been established successfully");
})

// create instance and initialize all the endpoints!
const allRouteEndpoints = [new JobEndPoint(), new UserEndPoint()]
allRouteEndpoints.forEach((routeEndpoint : ApplicationEndPoint) => {
    routeEndpoint.registerRoutes(app);
    routeEndpoint.initialize();
});

export default app;