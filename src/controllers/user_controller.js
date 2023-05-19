const User = require("../models/user_model");

const registerUser = async (req, user) => {
    try {
        const { name, email, strees, password, phone } = req.body;
        const user = new User({
            name,
            email,
            password,
            address,
            phone,

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