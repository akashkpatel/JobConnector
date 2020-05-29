import  mongoose from "mongoose";


export let databaseOperations = {
    connectToDatabase : function() : Promise<string>{
        return new Promise((resolve, reject) => {
            mongoose.connect("mongodb://localhost/JobConnector", { useNewUrlParser: true });
            const db = mongoose.connection;
            db.on('error', function(){
                reject("Problem while opening database connection");
            });
            db.on('open', function(){
                resolve("Succesfully Opened database connection");
            });
        })
    },
    closeConnection : function(callback : any){
        mongoose.connection.close(callback);
    }
}