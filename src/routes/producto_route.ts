const autenticacion = require("../middlewares/autenticacion")
const productoController = require("../controllers/producto_controller");
import Router from 'express';
const router = Router()

router.post(`/api/productos/producto`, autenticacion.validateToken, productoController.postProducto);
router.get('/api/productos', productoController.getProductos);
router.get('/api/productos/producto/:id', productoController.getProducto);
router.get('/api/productos/:id', productoController.getProductosCategorias);
router.patch('/api/productos/producto/:id', autenticacion.validateToken, productoController.updateProducto);
router.delete('/api/productos/producto/:id', autenticacion.validateToken, productoController.deleteProducto);

module.exports = router;