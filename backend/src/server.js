const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const userRoute = require("./routes/user.route.js");
const connectMongo = require("./db/database.js");

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use("/", userRoute);

app.listen(PORT, async () => {
  connectMongo();
  console.log(`${PORT} is running...`);
});
