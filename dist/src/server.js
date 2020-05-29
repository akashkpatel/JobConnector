"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const errorhandler_1 = __importDefault(require("errorhandler"));
app_1.default.use(errorhandler_1.default());
const server = app_1.default.listen(3003, function () {
    console.log("App is running at localhost:3003");
});
exports.default = server;
//# sourceMappingURL=server.js.map