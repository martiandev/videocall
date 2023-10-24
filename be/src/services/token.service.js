import { sign,verify } from "../utils/token.util.js";

export const generateToken = async (payload,expiersIn,secret) =>{
    let token = await sign(payload,expiersIn,secret);
    return token;
};

export const verifyToken = async (token,secret)=>{
    let check = await verify(token,secret);
    return check;
}
