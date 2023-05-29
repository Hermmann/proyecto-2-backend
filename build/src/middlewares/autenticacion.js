"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jwt = require('jsonwebtoken');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateToken = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "No autorizado" });
        }
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (verify.user.active === true && verify.user.role === "dueño") {
            next();
        }
        else {
            throw new Error();
        }
    }
    catch (error) {
        res.status(401).json({ msg: "Este usuario no esta autenticado" });
    }
};
exports.validateToken = validateToken;
module.exports = {
    validateToken: exports.validateToken,
};
