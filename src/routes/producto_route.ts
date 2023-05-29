const autenticacion = require("../middlewares/autenticacion")
const productoController = require("../controllers/producto_controller");
import Router from 'express';
const router = Router()

//Create: (AUTENTICADO) El endpoint crea un producto de un usuario en la base de datos con los datos enviados al backend.
router.post(`/api/productos/producto`, autenticacion.validateToken, productoController.postProducto);
//Read (cantidad): El endpoint retorna los datos de los productos que correspondan a el usuario, el texto de busqueda, y/o categoría proveída.
router.get('/api/productos', productoController.getProductos);
//Read (unidad): El endpoint retorna los datos del producto que corresponde a la id proveída. 
router.get('/api/productos/producto/:id', productoController.getProducto);
//Read (cantidad): El endpoint retorna las categorias de los productos que correspondan a el usuario proveído
router.get('/api/productos/:user_id', productoController.getProductosCategorias);
//Update: (AUTENTICADO) El endpoint modifica los datos del producto que corresponde a la id proveída, usando los datos proveídos
router.patch('/api/productos/producto/:id', autenticacion.validateToken, productoController.updateProducto);
//Delete: (AUTENTICADO) El endpoint “inhabilita” un producto que corresponde a la id proveída.
router.delete('/api/productos/producto/:id', autenticacion.validateToken, productoController.deleteProducto);

module.exports = router;