const autenticacion = require("../middlewares/autenticacion")
const usuarioController = require("../controllers/usuario_controller");
import Router from 'express';
const router = Router()

//Create: El endpoint crea un usuario en la base de datos con los datos enviados al backend.
router.post(`/api/usuario/register`, usuarioController.postUser);
//Read (unidad): El endpoint retorna un JWT que corresponde a las credenciales(correo y contraseña) proveidas. 
router.get('/api/usuario/login',usuarioController.getUserToken);
//Read (unidad): El endpoint retorna los datos del usuario que corresponden a la id proveída. 
router.get('/api/usuario/:id', usuarioController.getUser);
//Update: (AUTENTICADO) El endpoint modifica los datos del usuario que corresponde a la id proveída, usando los datos proveídos.
router.patch('/api/usuario/:id', autenticacion.validateToken, usuarioController.updateUser);
//Delete: (AUTENTICADO) El endpoint “inhabilita” un usuario que corresponde a la id proveída
router.delete('/api/usuario/:id', autenticacion.validateToken, usuarioController.deleteUser);

module.exports = router;