import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: 8,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "{VALUE} is not supported",
      },
    },
    _isActive: {
      type: Boolean,
      default: 1,
    },
    _isDestroy: {
      type: Boolean,
      default: 1,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    key_role: {
      type: String,
      require: true,
      default: "R2",
    },
  },
  {
    timestamps: true,
    collection: "User",
  }
);

export default mongoose.model("User", userSchema);
