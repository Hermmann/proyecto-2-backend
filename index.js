import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.set('strictQuery', true);



// app creation
const app = express();
app.get("/api", (req,res) => {
    res.send("API USER")
});

app.use(express.json);

// the conntion to MongoDB
console.log(process.env.MONGO_USER);
console.log(process.env.MONGO_PASS);
mongoose
  .connect(       
    'mongodb+srv://' +
      
      process.env.MONGO_USER +
      ':' +  
      process.env.MONGO_PASS +
      '@cluster0.uawvyf5.mongodb.net/proyecto-2-backend',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected.');
  })
  .catch((err) => {
    console.log('There was an error with connection!');
    console.log(err);
  });

  // Middlewares
app.use(cors());
app.use(express.json());

  // Endpoint para 404
app.use((req, res) => {
    res.status(404).json({ message: 'Not found.' });
  });
  
  // Inicia app en puerto 8080
  app.listen(8080, console.log('listen'));