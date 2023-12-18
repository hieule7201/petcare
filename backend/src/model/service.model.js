import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter your name"] },
    img: { type: String },
    des: { type: String },
  },
  {
    timestamps: true,
    collection: "Service",
  }
);
export default mongoose.model("Service", serviceSchema);
