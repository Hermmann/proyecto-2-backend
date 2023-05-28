const Product = require("../models/producto_model");
import { Request,  Response} from 'express'

const postProducto = async (req: Request, res: Response) => {
    try {
        const { name, description, category, price, user_id} = req.body;
        const producto = new Product({
            name,
            description,
            category,
            price,
            user_id
        });
        const resultado = await producto.save();
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" })
    }
};

const getProductos = async (req: Request,res: Response) => {
    try {
        const { user_id, name, category } = req.query;
        const filter = { user_id: user_id, name: name, category: { $regex: category, $options: 'i' }, active: true};
        const resultado = await Product.find(filter);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const getProducto = async (req: Request,res: Response) => {
    try {
        const resultado = await Product.findById({ _id: req.params.id, active: true});
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const getProductosCategorias = async (req: Request,res: Response) => {
    try {
        const { user_id } = req.query;
        const filter = { user_id: user_id, active: true};
        const resultado = await Product.find(filter).distinct('category');
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const updateProducto = async (req: Request,res: Response) => {
    try {
        const producto = await Product.findOneAndUpdate({ _id: req.params.id, active: true}, req.body, { new: true});
        const resultado = await producto.save();
        res.status(200).json(resultado);        
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
}

const deleteProducto = async (req: Request,res: Response) => {
    try {
        const usuario = await Product.findOneAndUpdate({ _id: req.params.id, active: true}, {active: false}, {new: true});
        const resultado = await usuario.save();
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    postProducto,
    getProductos,
    getProducto,
    getProductosCategorias,
    updateProducto,
    deleteProducto
}