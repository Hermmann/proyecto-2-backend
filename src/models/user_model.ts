import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {type: String, requere:true},
        email:{ type: String, require: true,unique:true },
        phone: { type: String, require: true,unique:true },
        password: {type: String, require: true },
        address: { type: String, require: true },
        active: { type: Boolean, default: true },
    },
    {
        versionKey: false,
      }
);

module.exports = mongoose.model("User", userSchema);

