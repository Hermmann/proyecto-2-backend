import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const routerUser = require('./src/routes/usuario_route');
const routerProduct = require('./src/routes/producto_route');
const routerOrder = require('./src/routes/pedido_route');

mongoose.set('strictQuery', true);

// dotenv config Variables de entorno
dotenv.config();

// app creation
const app = express();
app.get("/api", (req,res) => {
    res.send("API USER")
});

// the conntion to MongoDB

mongoose.connect(
  'mongodb+srv://' +
  process.env.MONGO_USER +
  ':' +
  process.env.MONGO_PASS +
  '@cluster0.ypwpfvo.mongodb.net/?retryWrites=true&w=majority',
).then(() => {
  console.log('Connected.');
}).catch((err) => {
  console.log('There was an error with connection!');
  console.log(err);
});

  // Middlewares
app.use(cors());
app.use(express.json());

//routes
app.use(routerUser);
app.use(routerProduct);
app.use(routerOrder);

// Endpoint para 404
app.use((req, res) => {
  res.status(404).json({ message: 'route not found' });
});
  
// Inicia app en puerto 8080
app.listen(8080, () => {console.log('Server is running on port 8080')});