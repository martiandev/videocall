
import express from 'express';
import { register,login,logout,refreshToken } from '../controllers/auth.controller.js';
import trimRequest from 'trim-request';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();


router.route('/register').post(trimRequest.all,register);
router.route('/login').post(trimRequest.all,login);
router.route('/logout').post(trimRequest.all,logout);
router.route('/refreshToken').post(trimRequest.all,refreshToken);

router.route('/testingAuthMiddleware').post(
        trimRequest.all,authMiddleware,
        (req,res) =>{
            res.send(req.user);
        }
    );


export default router;