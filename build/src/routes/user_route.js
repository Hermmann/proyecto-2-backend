"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticationMiddlewares = require("../middlewares/authentication_middleware");
const userController = require("../controllers/user_controller");
const express_1 = require("express");
const routerUser = (0, express_1.Router)();
routerUser.post(`/api/user/register`, userController.registerUser);
routerUser.post('/api/user/loginUser', userController.loginUser);
routerUser.get('/api/user/getUser', userController.getUser);
// poner él  authenticationMiddlewares.validateToken en donde sea necesario en este caso para update y quitarlo del get ese
routerUser.put('/api/user/updateUser', authenticationMiddlewares.validateToken, userController.updateUser);
module.exports = routerUser;
