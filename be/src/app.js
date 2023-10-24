import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import createHttpError from 'http-errors';
import routes from './routes/index.js'


dotenv.config();
const app = express();


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

//json parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(urlencodedParser);
app.use(jsonParser);
//gzip compression
app.use(compression());
//api v1 routes
app.use("/api/v1",routes);

//file upload
app.use(fileUpload({
    useTempFiles : true
}));

//corss middleware
app.use(cors(
    // {origin:'httpp://localhost:3000',}
));

//error handling
app.use(async(err,req,res,next)=>{
    res.status(err.status||500);
    res.send({
            error:{
                status:err.status||500,
                message: err.message
            }
        }
    );
});

app.use(async(req,res,next)=>{
    next(createHttpError.NotFound('This route does not exist.'));
});



// app.get('/',(req,res)=>{
//     // res.send("hello");
//     throw createHttpError.BadRequest("error po");
// });

export default app;
