import app from './app.js';
import logger from './config/logger.config.js';


const PORT = process.env.PORT |8000 ;
console.log(process.env.NODE_ENV)
app.listen(PORT, ()=>{
    logger.info(`Server is listening at ${PORT}`);
});
