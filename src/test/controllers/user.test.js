const request = require('supertest');
const index = require('/workspace/proyecto-2-backend/index.ts');
const { generateAccessToken } = require('../src/services/jwt');
const USERS_PATH = '/api/usuario/register';

const {User} = requiere('/workspace/proyecto-2-backend/src/models/usuario_model.ts');
const {userController} = require('/workspace/proyecto-2-backend/src/controllers/usuario_controller.ts');
const { route } = require('moongose/routes');

const newUser = new User({
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'password123',
  phone: '1234567890',
  address: '123 Main St',
  role: 'cliente',
});

const anotherUser = new User({
  name: 'Jane Smith',
  email: 'janesmith@example.com',
  password: 'password456',
  phone: '9876543210',
  address: '456 Elm St',
  role: 'cliente',
});


describe('Users controllers', () =>{
  beforeAll(async() =>{
    const firstUser = await User.create(FIRST_USER);
    const secondUser = await User.create(anotherUser);
  });

  it('it should create a user', async () => {

    const response = (await request(index).post('/usuario/register')).send(firstUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');

  })

});