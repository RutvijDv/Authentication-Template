//Importing Packages
import mongoose, { Schema } from "mongoose";
import { IFile } from "../util/interface.util"

//Mongoose model for file's data
const File = mongoose.model<IFile>(
  "file",
  new Schema<IFile>({
    url: { type:String, required: true},
    key: { type:String, required: true},
  })
);

export default File;