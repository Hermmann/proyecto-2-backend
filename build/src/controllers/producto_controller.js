"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product = require("../models/producto_model");
const postProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, category, price, user_id, rating } = req.body;
        const producto = new Product({
            name,
            description,
            category,
            price,
            user_id,
            rating
        });
        const resultado = yield producto.save();
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, name, category } = req.query;
        const filter = { user_id: { $regex: user_id, $options: 'i' }, name: { $regex: name, $options: 'i' }, category: { $regex: category, $options: 'i' }, active: true };
        const resultado = yield Product.find(filter).sort({ rating: 'desc' });
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const getProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield Product.findById({ _id: req.params.id, active: true });
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const getProductosCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield Product.find({ user_id: req.params.user_id, active: true }).distinct('category');
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto = yield Product.findOneAndUpdate({ _id: req.params.id, active: true }, req.body, { new: true });
        const resultado = yield producto.save();
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto = yield Product.findOneAndUpdate({ _id: req.params.id, active: true }, { active: false }, { new: true });
        const resultado = yield producto.save();
        res.status(200).json(resultado);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
module.exports = {
    postProducto,
    getProductos,
    getProducto,
    getProductosCategorias,
    updateProducto,
    deleteProducto
};
