import mongoose from 'mongoose';
import app from './app.js';
import logger from './config/logger.config.js';


const {MONGO_URL} = process.env;
const {PORT} = process.env ;
console.log(process.env.NODE_ENV)
let server;

server = app.listen( ()=>{
    // logger.info(`Server is listening at ${PORT}`);
    console.log(`process id`,process.pid);
    // throw new Error("error");
});

//exit on mongodb error
mongoose.connection.on('error',(err)=>{
    logger.error(`mongodb connection error : ${MONGO_URL}`);
    logger.error(`mongodb connection error : ${error}`);
    process.exit(1);
});
//mongodb debug mode
if(process.env.NODE_ENV!=="production"){
    mongoose.set('debug',true);
}
//mongodb connection
mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    logger.info("Connected to mongodb");
});



//handle server error
const exitHandler = () =>{
    if(server){
        logger.info("Server closed");
        process.exit(1);
    } else {
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error)=>{
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException",unexpectedErrorHandler);
process.on("unhandledRejection",unexpectedErrorHandler);
process.on("SIGTERM",()=>{
    if(server){
        logger.info("Server closed");
        process.exit(1);
    }
});