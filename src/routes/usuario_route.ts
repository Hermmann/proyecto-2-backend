const autenticacion = require("../middlewares/autenticacion")
const usuarioController = require("../controllers/usuario_controller");
import Router from 'express';
const router = Router()

router.post(`/api/usuario/register`, usuarioController.postUser);
router.get('/api/usuario/login',usuarioController.getUserToken);
router.get('/api/usuario/:id', usuarioController.getUser);
router.patch('/api/usuario/:id', autenticacion.validateToken, usuarioController.updateUser);
router.delete('/api/usuario/:id', autenticacion.validateToken, usuarioController.deleteUser);

module.exports = router;