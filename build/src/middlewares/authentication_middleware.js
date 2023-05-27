"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jwt = require('jsonwebtoken');
const validateToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const verify = jwt.verify(token, "secret");
        next();
    }
    catch (error) {
        res.status(401).json({ msg: "this user is not authenticated" });
    }
};
exports.validateToken = validateToken;
module.exports = {
    validateToken: exports.validateToken,
};
