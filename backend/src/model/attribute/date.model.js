import mongoose, { Schema } from "mongoose";

const dateSchema = new mongoose.Schema(
  {
    services: { type: String, ref: "services", require: true },
    date: { type: Date, require: true },
    times: [
      {
        type: Schema.Types.ObjectId,
        ref: "times",
        required: true,
      },
    ],
  },
  {
    collection: "Date",
  }
);

export default mongoose.model("Date", dateSchema);
