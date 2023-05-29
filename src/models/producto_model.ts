import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        user_id: { type: String, required: true },
        rating: { type: Number, required: true, min: 0 },
        active: { type: Boolean, default: true },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("producto", productoSchema);