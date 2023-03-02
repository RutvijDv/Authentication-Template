//Importing Packages
import mongoose, { Schema } from "mongoose";
import { IUserWithPassword } from "../util/interface.util"

//Mongoose model for user's data
const User = mongoose.model<IUserWithPassword>(
  "user",
  new Schema<IUserWithPassword>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true , index: true},
    phone: { type: Number, required: true },
    password: { type: String, required: true},
    userRole: { type: String, required: true, default: "customer"},
  })
);

export default User;