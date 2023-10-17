import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import cors from 'cors';


dotenv.config();
const app = express();

app.get('/',(req,res)=>{
    res.send("hello");
});

//Morgan
if(process.env.NODE_ENV!=="production"){
    app.use(morgan("dev"));
}

//helmet
app.use(helmet());

//parse json request url
app.use(express.urlencoded({extended:true}));

//parse json request body
app.use(express.json());

//sanitize request data
app.use(mongoSanitize());

//enable cookie parser
app.use(cookieParser());

//gzip compression
app.use(compression());


//file upload
app.use(fileUpload({
    useTempFiles : true
}));

//corss middleware
app.use(cors(
    // {origin:'httpp://localhost:3000',}
));




export default app;
