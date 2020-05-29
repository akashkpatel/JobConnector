"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.databaseOperations = {
    connectToDatabase: function () {
        return new Promise((resolve, reject) => {
            mongoose_1.default.connect("mongodb://localhost/JobConnector", { useNewUrlParser: true });
            const db = mongoose_1.default.connection;
            db.on('error', function () {
                reject("Problem while opening database connection");
            });
            db.on('open', function () {
                resolve("Succesfully Opened database connection");
            });
        });
    },
    closeConnection: function (callback) {
        mongoose_1.default.connection.close(callback);
    }
};
//# sourceMappingURL=DatabaseConnection.js.map