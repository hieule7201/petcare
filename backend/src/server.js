import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/user.route.js";
import connectMongo from "./db/database.js";
import errorHandle from "./middleware/errorHandle.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoute);
app.use(errorHandle);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  connectMongo();
  console.log(`${PORT} is running...`);
});
