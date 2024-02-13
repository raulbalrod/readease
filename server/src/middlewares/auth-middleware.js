import { HttpStatusError } from "common-errors";
import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

import config from "../config.js";

export function checkToken(req, res, next){
    console.log(req.headers.authorization)

    const {authorization} = req.headers;

    if(!authorization) throw HttpStatusError(401, 'No token provided');

    const [_bearer, token] = authorization.split(' ');

    try{
        jwt.verify(token, config.app.secretKey);
    }catch(err){
        logger.error(err.message);
        throw HttpStatusError(401, 'Invalid token');
    }

    next();
}