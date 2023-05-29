const Pedido = require("../models/pedido_model");
const jwt = require('jsonwebtoken')
import { Request,  Response} from 'express'
import dotenv from 'dotenv';
dotenv.config();


const postPedido = async (req: Request, res: Response) => {
    try {
        const { name, description, category, quantity, total, comment, rating, user_id , date} = req.body;
        const pedido = new Pedido({
            name,
            description,
            category,
            quantity,
            total,
            comment,
            rating,
            user_id,
            date
        });

        const resultado = await pedido.save();
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" })
    }

};

const getPedidos = async (req: Request,res: Response) => {
    try {
        const { user_id, a_date, b_date} = req.query;
        let filter: Object = {}
        if(a_date && b_date){
            filter = {user_id: user_id, date: {$gte: a_date, $lte: b_date}, active: true};
        }else if(a_date && !b_date){
            filter = {user_id: user_id, date: {$gte: a_date}, active: true};
        }else if(!a_date && b_date){
            filter = {user_id: user_id, date: {$lte: b_date}, active: true};
        }else{
            filter = {user_id: user_id, active: true};
        }
        const resultado = await Pedido.find(filter);
        res.status(200).json(resultado);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getPedido = async (req: Request,res: Response) => {
    try {
        const resultado = await Pedido.findById({ _id: req.params.id, active: true});
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};



const updatePedido = async (req: Request,res: Response) => {
    try {
        const {comment, rating} =  req.body
        let filter: Object = {}
        if (comment && rating) {
            filter = {comment: comment, rating: rating}
        }else if(comment && !rating){
            filter = {comment: comment}
        }else if(!comment && rating){
            filter = {rating: rating}
        }
        const pedido = await Pedido.findOneAndUpdate({ _id: req.params.id, active: true}, filter, {new: true});
        const resultado = await pedido.save();
        res.status(200).json(resultado);        
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
}

module.exports = {
    postPedido,
    getPedido,
    getPedidos,
    updatePedido
}