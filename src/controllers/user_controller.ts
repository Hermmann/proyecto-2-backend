const User = require("../models/user_model");
const jwt = require('jsonwebtoken')
import { Request,  Response} from 'express'
//@ts-check
const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password, address } = req.body;
        const user = new User({
            name,
            email,
            phone,
            password,
            address

        });

        await user
            .save()
            .then((data: JSON) =>
                res.status(200).json({
                    data,
                })
            )
            .catch((err : Error) => res.json(err));
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" })
    }

};

const loginUser = async (req: Request,res: Response) => {
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
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ msg: "Usuario no existe" })
        }
        if (user.password !== password) {
            return res.status(200).json({ msg: "Contraseña inválida" })

        }
        const token = jwt.sign({ user, password }, "secret", { expiresIn: "2h" })// sh quiere decir que expira en 2 horas
        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const getUser = async (req: Request,res: Response) => {
    const { id_user } = req.query;

    if (!id_user) {
        return res.status(200).json({ msg: "You must provide id" });
    }
    let user = await User.findOne({ _id: id_user });
    if (!user) {
        return res.status(404).json({ msg: "The user does not exist" });
    }
    return res.status(200).json(user);
}

const updateUser = async (req: Request,res: Response) => {
    try {
        const { name, password, email, phone } = req.body;
        //const { id_user } = req.query;
        const {authorization} = req.headers;
        const token = authorization?.split(" ")[1];
        const verify = jwt.verify(token, "secret")

        const u =
            (await User.updateMany(
           //    { _id: id_user }
           {verify},
                {
                    name,
                    email,
                    phone,
                    password,

                },
                { new: true }
            )) || null;

        if (u === null) {
            return res.status(500).json({ msg: "Error actualizando usuario" });
        }
        console.log(u);
        res.status(200).json(u);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
}