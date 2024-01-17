import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "services",
      require: true,
    },
    hair: {
      type: String,
    },
    weight: { type: String },
    time_come: { type: String },
    date_come: { type: Date },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

// idService: "",
//     hair: "",
//     weight: "",
//     time_come: "",
//     date_come: "",
//     date_end: "",
//     deliver: "",
//     price: "",
