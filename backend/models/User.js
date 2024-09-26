const mongoose = require("mongoose")


// sample user schema for auth test
const userSchema = new mongoose.Schema ({
    uid: { type: String, required:true, unique: true },
    name: String,
    email: { type, String, required: true, unique: true},
    picture: String,
})

const User = mongoose.model("User", userSchema);
module.exports = User;