const productoController = require("/workspace/proyecto-2-backend/build/src/controllers/producto_controller.js");
const Product = require("/workspace/proyecto-2-backend/build/src/models/producto_model.js");

describe('postProducto', () => {
  it('should create a new product and return the created product object', async () => {
    const req = {
      body: {
        name: 'Product 1',
        description: 'Product description',
        category: 'Category 1',
        price: 9.99,
        user_id: 'user123',
        rating: 4.5,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      user_id: req.body.user_id,
      rating: req.body.rating,
      // Add other product properties as needed
    });

    const saveSpy = jest.spyOn(Product.prototype, 'save').mockResolvedValue(mockProduct);

    await productoController.postProducto(req, res);

    expect(saveSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });

  it('should return a server error response if an error occurs', async () => {
    const req = {
      body: {
        name: 'Product 1',
        description: 'Product description',
        category: 'Category 1',
        price: 9.99,
        user_id: 'user123',
        rating: 4.5,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMock = new Error('Database connection failed');
    const saveSpy = jest.spyOn(Product.prototype, 'save').mockRejectedValue(errorMock);

    await productoController.postProducto(req, res);

    expect(saveSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error en el servidor' });
  });
});

describe('getProductos', () => {
    it('should return products based on the provided query parameters', async () => {
      const req = {
        query: {
          user_id: 'user123',
          name: 'Product',
          category: 'Category',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const mockProducts = [
        { name: 'Product 1', category: 'Category 1', active: true },
        { name: 'Product 2', category: 'Category 2', active: true },
        // Add more mock product objects as needed
      ];
  
      const findSpy = jest.spyOn(Product, 'find').mockResolvedValue(mockProducts);
  
      await productoController.getProductos(req, res);
  
      const expectedFilter = {
        user_id: { $regex: req.query.user_id, $options: 'i' },
        name: { $regex: req.query.name, $options: 'i' },
        category: { $regex: req.query.category, $options: 'i' },
        active: true,
      };
  
      expect(findSpy).toHaveBeenCalledWith(expectedFilter);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });
  
    it('should return a server error response if an error occurs', async () => {
      const req = {
        query: {
          user_id: 'user123',
          name: 'Product',
          category: 'Category',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const errorMock = new Error('Database connection failed');
      const findSpy = jest.spyOn(Product, 'find').mockRejectedValue(errorMock);
  
      await productoController.getProductos(req, res);
  
      expect(findSpy).toHaveBeenCalledWith({
        user_id: { $regex: req.query.user_id, $options: 'i' },
        name: { $regex: req.query.name, $options: 'i' },
        category: { $regex: req.query.category, $options: 'i' },
        active: true,
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Error en el servidor' });
    });
  });