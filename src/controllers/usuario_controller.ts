const User = require("../models/usuario_model");
const jwt = require('jsonwebtoken')
import { Request,  Response} from 'express'
import dotenv from 'dotenv';
dotenv.config();

//@ts-check
const postUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password,  phone,  address, role } = req.body;
        const user = new User({
            name,
            email,
            password,
            phone,
            address,
            role
        });

        const resultado = await user.save();
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" })
    }

};

const getUserToken = async (req: Request,res: Response) => {
    try {

        const { email, password } = req.query;

        if (!email || !password) {
            return res.status(200).json({ msg: "No envió email o password" });
        }

        const user = await User.findOne({ email : email, active: true});
        if (!user) {
            return res.status(200).json({ msg: "Usuario no existe" })
        }
        if (user.password !== password) {
            return res.status(200).json({ msg: "Contraseña inválida" })
        }
        const token = jwt.sign({ user, password }, process.env.JWT_SECRET, { expiresIn: "2h" })// sh quiere decir que expira en 2 horas
        return res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const getUser = async (req: Request,res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(200).json({ msg: "provee una id" });
    }
    let user = await User.findOne({ _id: id, active: true});
    if (!user) {
        return res.status(404).json({ msg: "El usuario no existe" });
    }
    return res.status(200).json(user);
}

const updateUser = async (req: Request,res: Response) => {
    try {
        const usuario = await User.findOneAndUpdate({ _id: req.params.id, active: true}, req.body, { new: true});
        const resultado = await usuario.save();
        res.status(200).json(resultado);        
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
}

const deleteUser = async (req: Request,res: Response) => {
    try {
        const usuario = await User.findOneAndUpdate({ _id: req.params.id, active: true}, {active: false}, {new: true});
        const resultado = await usuario.save();
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    postUser,
    getUserToken,
    getUser,
    updateUser,
    deleteUser
}