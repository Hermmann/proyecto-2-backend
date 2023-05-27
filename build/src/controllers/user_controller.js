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
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user_model");
const jwt = require('jsonwebtoken');
//@ts-check
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password, address } = req.body;
        const user = new User({
            name,
            email,
            phone,
            password,
            address
        });
        yield user
            .save()
            .then((data) => res.status(200).json({
            data,
        }))
            .catch((err) => res.json(err));
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // const { id_user } = req.query;
        // if (id_user !== undefined) {
        //   let user = (await User.findOne({ _id: id_user })) || null;
        //   if (user === null) {
        //     return res.status(200).json({ msg: "Usuario no existe" });
        //   }
        //   return res.status(200).json(user);
        // }
        if (!(email && password)) {
            return res
                .status(200)
                .json({ msg: "No envió email o password" });
        }
        const user = yield User.findOne({ email });
        if (!user) {
            return res.status(200).json({ msg: "Usuario no existe" });
        }
        if (user.password !== password) {
            return res.status(200).json({ msg: "Contraseña inválida" });
        }
        const token = jwt.sign({ user, password }, "secret", { expiresIn: "2h" }); // sh quiere decir que expira en 2 horas
        return res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_user } = req.query;
    if (!id_user) {
        return res.status(200).json({ msg: "You must provide id" });
    }
    let user = yield User.findOne({ _id: id_user });
    if (!user) {
        return res.status(404).json({ msg: "The user does not exist" });
    }
    return res.status(200).json(user);
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password, email, phone } = req.body;
        //const { id_user } = req.query;
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
        const verify = jwt.verify(token, "secret");
        const u = (yield User.updateMany(
        //    { _id: id_user }
        { verify }, {
            name,
            email,
            phone,
            password,
        }, { new: true })) || null;
        if (u === null) {
            return res.status(500).json({ msg: "Error actualizando usuario" });
        }
        console.log(u);
        res.status(200).json(u);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
};
