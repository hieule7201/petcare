import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter your name"] },
    img: { type: String },
    des: { type: String },
    times: [
      {
        value: { type: String },
        total: { type: Number },
      },
    ],
    weights: [
      {
        value: { type: String },
        price: { type: Number },
      },
    ],
    hairs: [
      {
        name: { type: String },
        weight: { type: Array, default: [] },
      },
    ],
  },
  {
    timestamps: true,
    collection: "Service",
  }
);
export default mongoose.model("Service", serviceSchema);
