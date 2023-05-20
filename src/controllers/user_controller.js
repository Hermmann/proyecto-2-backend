const User = require("../models/user_model");

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, address} = req.body;
        const user = new User({
            name,
            email,
            phone,
            password,
            address

        });

        await user
            .save()
            .then((data) =>
                res.status(200).json({
                    data,
                })
            )
            .catch((err) => res.json(err));
    } catch (error) {
        res.status(500).json({msg:"Error en el servidor"})
    }

};

module.exports = {
    registerUser,
}