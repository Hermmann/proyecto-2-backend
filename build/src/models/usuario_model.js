"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usuarioSchema = new mongoose_1.default.Schema({
    name: { type: String, requere: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
    role: { type: String, required: true, enum: ['cliente', 'dueño'], default: 'cliente' },
    active: { type: Boolean, default: true },
}, {
    versionKey: false,
});
module.exports = mongoose_1.default.model("usuario", usuarioSchema);
