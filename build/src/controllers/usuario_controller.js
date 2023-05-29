"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/usuario_model");
const jwt = require('jsonwebtoken');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//@ts-check
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, address, role } = req.body;
        const user = new User({
            name,
            email,
            password,
            phone,
            address,
            role
        });
        const resultado = yield user.save();
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const getUserToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.query;
        if (!email || !password) {
            return res.status(200).json({ msg: "No envió email o password" });
        }
        const user = yield User.findOne({ email: email, active: true });
        if (!user) {
            return res.status(200).json({ msg: "Usuario no existe" });
        }
        if (user.password !== password) {
            return res.status(200).json({ msg: "Contraseña inválida" });
        }
        const token = jwt.sign({ user, password }, process.env.JWT_SECRET, { expiresIn: "2h" }); // sh quiere decir que expira en 2 horas
        return res.status(200).json({ token: token });
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        return res.status(200).json({ msg: "provee una id" });
    }
    let user = yield User.findOne({ _id: id, active: true });
    if (!user) {
        return res.status(404).json({ msg: "El usuario no existe" });
    }
    return res.status(200).json(user);
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield User.findOneAndUpdate({ _id: req.params.id, active: true }, req.body, { new: true });
        const resultado = yield usuario.save();
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuario = yield User.findOneAndUpdate({ _id: req.params.id, active: true }, { active: false }, { new: true });
        const resultado = yield usuario.save();
        res.status(200).json(resultado);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
module.exports = {
    postUser,
    getUserToken,
    getUser,
    updateUser,
    deleteUser
};
