import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    order: {
      type: String,
      ref: "orders",
    },
    status: {
      type: String,
      default: "Chưa thanh toán",
    },
    invoice_amount: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    time_charge: {
      type: Date,
    },
    amount_charge: {
      type: Number,
    },
    change: {
      type: Number,
    },
  },
  {
    timestamps: true,
    collection: "invoices",
  }
);
export default mongoose.model("invoices", invoiceSchema);
