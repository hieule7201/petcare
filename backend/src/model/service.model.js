import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please enter your name"] },
    img: { type: String },
    des: { type: String },
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
    collection: "services",
  }
);
export default mongoose.model("services", serviceSchema);
