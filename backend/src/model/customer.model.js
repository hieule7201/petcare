import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone"],
      minLength: [10, "no should have minimum 10 digits"],
      maxLength: [11, "no should have maximum 10 digits"],
      match: [/\d{10}/, "no should only have digits"],
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "customers",
  }
);

export default mongoose.model("customers", customerSchema);
