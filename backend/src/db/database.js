import mongoose from "mongoose";

const connectMongo = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongo connected: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default connectMongo;
