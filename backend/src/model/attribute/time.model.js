import mongoose from "mongoose";

const timeSchema = new mongoose.Schema(
  {
    value: { type: String, require: true },
    total: { type: Number },
  },
  {
    collection: "times",
  }
);

export default mongoose.model("times", timeSchema);
