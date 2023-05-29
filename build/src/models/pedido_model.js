"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pedidoSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true, min: 0 },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 0 },
    user_id: { type: String, required: true },
    date: { type: String, required: true },
    active: { type: Boolean, default: true },
}, {
    versionKey: false
});
module.exports = mongoose_1.default.model("pedido", pedidoSchema);
