const  userController  = require("/workspace/proyecto-2-backend/build/src/controllers/usuario_controller.js"); 
const User = require("/workspace/proyecto-2-backend/build/src/models/usuario_model.js"); 
const jwt = require('jsonwebtoken'); 
// en el caso de exito
describe('postUser', () => {
    it('should create a new user and return a success response', async () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password123',
          phone: '1234567890',
          address: '123 Street, City',
          role: 'user',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const mockUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        role: req.body.role,
      });
  
      const saveSpy = jest.spyOn(User.prototype, 'save').mockResolvedValue(mockUser);
  
      await userController.postUser(req, res);
  
      expect(saveSpy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  
    it('should return a server error response if an error occurs', async () => {
      const req = {
        body: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password123',
          phone: '1234567890',
          address: '123 Street, City',
          role: 'user',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const saveSpy = jest.spyOn(User.prototype, 'save').mockRejectedValue(new Error('Database connection failed'));
  
      await userController.postUser(req, res);
  
      expect(saveSpy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Error en el servidor' });
    });
  });

describe('getUserToken', () => {
  it('should return a token when valid email and password are provided', async () => {
    const req = {
      query: {
        email: 'johndoe@example.com',
        password: 'password123',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockUser = new User({
      email: req.query.email,
      password: req.query.password,
      active: true,
    });

    const findOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
    const signSpy = jest.spyOn(jwt, 'sign').mockReturnValue('mockToken');

    await userController.getUserToken(req, res);

    expect(findOneSpy).toHaveBeenCalledWith({ email: req.query.email, active: true });
    expect(signSpy).toHaveBeenCalledWith(
      { user: mockUser, password: req.query.password },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
  });

  it('should return an error message if email or password is missing', async () => {
    const req = {
      query: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.getUserToken(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'No envió email o password' });
  });

  it('should return an error message if user does not exist', async () => {
    const req = {
      query: {
        email: 'nonexistentuser@example.com',
        password: 'password123',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const findOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(null);

    await userController.getUserToken(req, res);

    expect(findOneSpy).toHaveBeenCalledWith({ email: req.query.email, active: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Usuario no existe' });
  });

  it('should return an error message if password is invalid', async () => {
    const req = {
      query: {
        email: 'johndoe@example.com',
        password: 'invalidpassword',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockUser = new User({
      email: req.query.email,
      password: 'password123',
      active: true,
    });

    const findOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

    await userController.getUserToken(req, res);

    expect(findOneSpy).toHaveBeenCalledWith({ email: req.query.email, active: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Contraseña inválida' });
  });

  it('should return a server error response if an error occurs', async () => {
    const req = {
      query: {
        email: 'johndoe@example.com',
        password: 'password123',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMock = new Error('Database connection failed');
    const findOneSpy = jest.spyOn(User, 'findOne').mockRejectedValue(errorMock);

    await userController.getUserToken(req, res);

    expect(findOneSpy).toHaveBeenCalledWith({ email: req.query.email, active: true });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error en el servidor' });
  });
});

describe('getUser', () => {
    it('should return the user when a valid id is provided', async () => {
      const req = {
        params: {
          id: 'validUserId',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const mockUser = {
        _id: 'validUserId',
        name: 'John Doe',
        email: 'johndoe@example.com',
        active: true,
      };
  
      const findOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
  
      await userController.getUser(req, res);
  
      expect(findOneSpy).toHaveBeenCalledWith({ _id: req.params.id, active: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  
    it('should return an error message if id is missing', async () => {
      const req = {
        params: {},
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      await userController.getUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ msg: 'provee una id' });
    });
  
    it('should return an error message if the user does not exist', async () => {
      const req = {
        params: {
          id: 'nonexistentUserId',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const findOneSpy = jest.spyOn(User, 'findOne').mockResolvedValue(null);
  
      await userController.getUser(req, res);
  
      expect(findOneSpy).toHaveBeenCalledWith({ _id: req.params.id, active: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: 'El usuario no existe' });
    });
  });

  describe('updateUser', () => {
    it('should update the user and return the updated user object', async () => {
      const req = {
        params: {
          id: 'validId123',
        },
        body: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'newpassword',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const mockUser = new User({
        _id: req.params.id,
        active: true,
        // Add other user properties as needed
      });
  
      const findOneAndUpdateSpy = jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue(mockUser);
      const saveSpy = jest.spyOn(mockUser, 'save').mockResolvedValue(mockUser);
  
      await userController.updateUser(req, res);
  
      expect(findOneAndUpdateSpy).toHaveBeenCalledWith({ _id: req.params.id, active: true }, req.body, { new: true });
      expect(saveSpy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  
    it('should return a server error response if an error occurs', async () => {
      const req = {
        params: {
          id: 'validId123',
        },
        body: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'newpassword',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const errorMock = new Error('Database connection failed');
      const findOneAndUpdateSpy = jest.spyOn(User, 'findOneAndUpdate').mockRejectedValue(errorMock);
  
      await userController.updateUser(req, res);
  
      expect(findOneAndUpdateSpy).toHaveBeenCalledWith({ _id: req.params.id, active: true }, req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Error en el servidor' });
    });
  });

  describe('deleteUser', () => {
    it('should delete the user and return the deleted user object', async () => {
      const req = {
        params: {
          id: 'validId123',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const mockUser = new User({
        _id: req.params.id,
        active: true,
        // Add other user properties as needed
      });
  
      const findOneAndUpdateSpy = jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue(mockUser);
      const saveSpy = jest.spyOn(mockUser, 'save').mockResolvedValue(mockUser);
  
      await userController.deleteUser(req, res);
  
      expect(findOneAndUpdateSpy).toHaveBeenCalledWith({ _id: req.params.id, active: true }, { active: false }, { new: true });
      expect(saveSpy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  
    it('should return a server error response if an error occurs', async () => {
      const req = {
        params: {
          id: 'validId123',
        },
      };
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      const errorMock = new Error('Database connection failed');
      const findOneAndUpdateSpy = jest.spyOn(User, 'findOneAndUpdate').mockRejectedValue(errorMock);
  
      await userController.deleteUser(req, res);
  
      expect(findOneAndUpdateSpy).toHaveBeenCalledWith({ _id: req.params.id, active: true }, { active: false }, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(errorMock);
    });
  });