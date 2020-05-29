import app  from "./app";
import errorhandler from "errorhandler";

app.use(errorhandler());

const server = app.listen(3003, function(){
    console.log("App is running at localhost:3003");
} );

export default server;