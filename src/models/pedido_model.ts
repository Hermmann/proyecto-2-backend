import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        quantity: { type: Number, required: true },
        total: { type: Number, required: true, min: 0 },
        comment: { type: String, required: true},
        rating: { type: Number, required: true, min: 0 },
        user_id: { type: String, required: true },
        date: { type: String, required: true },
        active: { type: Boolean, default: true },
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model("pedido", pedidoSchema);