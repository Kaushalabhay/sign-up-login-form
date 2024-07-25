const express = require("express");
const router = require("./userRoute");
const app = express();
const port = 5000;
const User = require("./userModel");
const mongoose = require("mongoose");
const cors = require("cors");

const mongoURI = "mongodb+srv://abhay:aXVuySLbSa6F94X@cluster0.vsr2u0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.json());
app.use(cors());
app.use("/" , router);

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

  
app.get("/", (req, res) => res.send("Hello!"));

app.listen(port, () => console.log(`App listening on port ${port}!`));

