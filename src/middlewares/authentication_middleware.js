const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    try {
        
        const {authorization} = req.headers;
        const token = authorization.split(" ")[1];
        const verify = jwt.verify(token, "secret");
       
        next();
    

    } catch (error) {
        return res.status(401).json({msg: "this user is not authenticated"})
    }
    
}

module.exports = {
    validateToken,
}