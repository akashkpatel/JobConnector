"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const JobEndPoint_1 = require("./endpoints/JobEndPoint");
const UserEndPoint_1 = require("./endpoints/UserEndPoint");
const body_parser_1 = __importDefault(require("body-parser"));
let app = express_1.default();
// parsing body of the app!
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect("mongodb://localhost/JobConnector", { useNewUrlParser: true });
let db = mongoose_1.default.connection;
db.on('error', console.error.bind("There is a problem with database connections"));
db.on('open', function () {
    console.log("Connection has been established successfully");
});
// create instance and initialize all the endpoints!
const allRouteEndpoints = [new JobEndPoint_1.JobEndPoint(), new UserEndPoint_1.UserEndPoint()];
allRouteEndpoints.forEach((routeEndpoint) => {
    routeEndpoint.registerRoutes(app);
    routeEndpoint.initialize();
});
exports.default = app;
//# sourceMappingURL=app.js.map