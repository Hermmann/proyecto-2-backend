"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routerUser = require('./src/routes/usuario_route');
const routerProduct = require('./src/routes/producto_route');
const routerOrder = require('./src/routes/pedido_route');
mongoose_1.default.set('strictQuery', true);
// dotenv config Variables de entorno
dotenv_1.default.config();
// app creation
const app = (0, express_1.default)();
app.get("/api", (req, res) => {
    res.send("API USER");
});
// the conntion to MongoDB

mongoose_1.default.connect('mongodb+srv://' +
    process.env.MONGO_USER +
    ':' +
    process.env.MONGO_PASS +
    '@cluster0.ypwpfvo.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('Connected.');
}).catch((err) => {
    console.log('There was an error with connection!');
    console.log(err);
});
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//routes
app.use(routerUser);
app.use(routerProduct);
app.use(routerOrder);
// Endpoint para 404
app.use((req, res) => {
    res.status(404).json({ message: 'route not found' });
});
// Inicia app en puerto 8080
app.listen(8080, () => { console.log('Server is running on port 8080'); });
