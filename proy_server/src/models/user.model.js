const mongosse = require("mongoose");
const userSchame = mongosse.Schema({

    name:{
        type: String,
        requiere: true,
        min: 3,
    },
    lastname: {
        type: String,
        require: true,
        min: 3,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
});

module.exports = mongosse.model("user", userSchame);
