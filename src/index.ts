//Importing Packages
import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";
import DB from "./model";
import { URL } from "./config/db.config";
import { authRouter, profileRouter } from "./route";
import helmet from "helmet";

//Creating Express App
const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

const db = new DB();

//MongoDB Connection
db.mongoose
  .connect(<string>URL)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err: any) =>{
    console.error("Connection error", err);
    process.exit();
  });

//API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", profileRouter);

//App listening on {Port}
app.listen(PORT, () => {
console.log(`Server Running on port ${PORT}`);
});
