import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    services: {
      type: String,
      ref: "services",
      require: true,
    },
    customer: {
      type: String,
      ref: "customers",
    },
    status: { type: String },
    hair: {
      type: String,
    },
    weight: { type: String },
    time_come: { type: String },
    date_come: { type: Date },
    date_end: { type: Date },
    deliver: { type: String },
    price: { type: Number },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

export default mongoose.model("orders", orderSchema);

// idService: "",
//     hair: "",
//     weight: "",
//     time_come: "",
//     date_come: "",
//     date_end: "",
//     deliver: "",
//     price: "",
