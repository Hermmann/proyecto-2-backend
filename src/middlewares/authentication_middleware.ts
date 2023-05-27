import { Request,  Response, NextFunction} from 'express'
const jwt = require('jsonwebtoken');

export const validateToken = (req :Request, res : Response, next: NextFunction) => {
    try {
        
        const {authorization} = req.headers;
        const token = authorization?.split(" ")[1];
        const verify = jwt.verify(token, "secret");
       
        next();
    

    } catch (error) {
        res.status(401).json({msg: "this user is not authenticated"})
    }
    
}

module.exports = {
    validateToken,
}