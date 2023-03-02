//Importing Packages
const { default: mongoose } = require("mongoose");

//Mongoose model for user's data
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  userRole: { type: String, required: true, default: "customer" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
