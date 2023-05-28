import { Request,  Response, NextFunction} from 'express'
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config();

export const validateToken = (req :Request, res : Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "No autorizado" });
        }
        const {authorization} = req.headers;
        const token = authorization.split(" ")[1];
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (verify.user.active === true) {
            next();
        } else {
            throw new Error()
        }
    } catch (error) {
        res.status(401).json({msg: "Este usuario no esta autenticado"})
    }
    
}

module.exports = {
    validateToken,
}