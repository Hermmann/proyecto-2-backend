const autenticacion = require("../middlewares/autenticacion")
const pedidoController = require("../controllers/pedido_controller");
import Router from 'express';
const router = Router()

//Create: (AUTENTICADO) El endpoint crea un pedido de un producto en la base de datos con los datos enviados al backend.
router.post(`/api/pedidos/pedido`, autenticacion.validateToken, pedidoController.postPedido);
//Read (cantidad): (AUTENTICADO) El endpoint retorna los datos de los pedidos realizados por el usuario, y/o entre las fechas proveídas, si son proveídas
router.get('/api/pedidos', autenticacion.validateToken, pedidoController.getPedidos);
//Read (unidad): (AUTENTICADO) El endpoint retorna los datos del pedido que corresponde a la id proveída.
router.get('/api/pedidos/pedido/:id', autenticacion.validateToken, pedidoController.getPedido);
//Update: (AUTENTICADO) El endpoint modifica la calificación y comentarios del pedido
router.patch('/api/pedidos/pedido/:id', autenticacion.validateToken, pedidoController.updatePedido);

module.exports = router;