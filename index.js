//Importing Packages
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const morgan = require("morgan");
const { User } = require("./model");
const { URL } = require("./config/db.config");
const router = require("./route");
const helmet = require("helmet");
const mongoose = require("mongoose");

//Creating Express App
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

mongoose.set("strictQuery", false);
//MongoDB Connection
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

//API Routes
app.use("/api", router);

//App listening on {Port}
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
