const autenticacion = require("../middlewares/autenticacion")
const pedidoController = require("../controllers/pedido_controller");
import Router from 'express';
const router = Router()

router.post(`/api/pedidos/pedido`, autenticacion.validateToken, pedidoController.postPedido);
router.get('/api/pedidos', autenticacion.validateToken,pedidoController.getPedidos);
router.get('/api/pedidos/pedido/:id', autenticacion.validateToken, pedidoController.getPedido);
router.patch('/api/pedidos/pedido/:id', autenticacion.validateToken, pedidoController.updatePedido);

module.exports = router;