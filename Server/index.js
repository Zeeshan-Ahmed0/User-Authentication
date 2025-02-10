const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserRouter = require("./Routes/userRouter")
const cors = require("cors");
const productRouter = require("./Routes/productRouter");
require("dotenv").config();
const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use("/auth", UserRouter) 
app.use("/products", productRouter)


mongoose
  .connect(process.env.DBURL)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is Running");
    });
  })
  .catch((error) => console.log("could not connect the database", error));
