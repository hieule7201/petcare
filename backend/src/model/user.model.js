const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
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
      values: ["Male", "female"],
      message: "{VALUE} is not supported",
      default: "Male",
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    dateAt: {
      type: Date,
      default: Date.now,
    },
    id_code: {
      type: String,
    },
  },
});

module.exports = mongoose.model("User", userSchema);
