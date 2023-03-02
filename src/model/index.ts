//Importing Packages
import mongoose from "mongoose";
import User from "./user.model";
import File from "./file.model";


//Database Class
class DB {
  mongoose = mongoose;
  user = User;
  file = File;
}

export default DB;
