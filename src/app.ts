import express, {Request, Response} from "express";
import mongoose from "mongoose";
import { JobEndPoint } from "./endpoints/JobEndPoint";
import { UserEndPoint} from "./endpoints/UserEndPoint";
import bodyParser from "body-parser";
import { ApplicationEndPoint } from "./endpoints/ApplicationEndPoint";
let app = express();

// parsing body of the app!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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