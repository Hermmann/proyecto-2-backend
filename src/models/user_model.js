const moongose = require("moongose");

const userSchema = new moongose.Scherma(
    {
        name: {type: String, requere:true},
        email:{ type: String, require: true,unique:true },
        phone: { type: String, require: true,unique:true },
        password: {type: String, require: true },
        adddress: { type: String, require: true },
    },
    {
        versionKey: false,
      }
);

module.exports = mongoose.model("User", userSchema);

