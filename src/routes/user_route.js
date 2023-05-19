const userController = require("../controllers/user_controller");
const Router = require("express");
const routerUser = Router()

routerUser.post(`/api/user/register`, userController.registerUser);

module.exports = routerUser;