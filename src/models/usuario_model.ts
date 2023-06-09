import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
    {
        name: {type: String, requere:true},
        email:{ type: String, require: true, unique:true },
        password: {type: String, require: true },
        phone: { type: String, require: true},
        address: { type: String, require: true },
        role: { type: String, required: true, enum: ['cliente', 'dueño'], default: 'cliente' },
        active: { type: Boolean, default: true },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("usuario", usuarioSchema);

