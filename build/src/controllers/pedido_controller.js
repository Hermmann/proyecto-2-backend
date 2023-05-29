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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pedido = require("../models/pedido_model");
const jwt = require('jsonwebtoken');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const postPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, category, quantity, total, comment, rating, user_id, date } = req.body;
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
        const resultado = yield pedido.save();
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const getPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, a_date, b_date } = req.query;
        let filter = {};
        if (a_date && b_date) {
            filter = { user_id: user_id, date: { $gte: a_date, $lte: b_date }, active: true };
        }
        else if (a_date && !b_date) {
            filter = { user_id: user_id, date: { $gte: a_date }, active: true };
        }
        else if (!a_date && b_date) {
            filter = { user_id: user_id, date: { $lte: b_date }, active: true };
        }
        else {
            filter = { user_id: user_id, active: true };
        }
        const resultado = yield Pedido.find(filter);
        res.status(200).json(resultado);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const getPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resultado = yield Pedido.findById({ _id: req.params.id, active: true });
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
const updatePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment, rating } = req.body;
        let filter = {};
        if (comment && rating) {
            filter = { comment: comment, rating: rating };
        }
        else if (comment && !rating) {
            filter = { comment: comment };
        }
        else if (!comment && rating) {
            filter = { rating: rating };
        }
        const pedido = yield Pedido.findOneAndUpdate({ _id: req.params.id, active: true }, filter, { new: true });
        const resultado = yield pedido.save();
        res.status(200).json(resultado);
    }
    catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
});
module.exports = {
    postPedido,
    getPedido,
    getPedidos,
    updatePedido
};
