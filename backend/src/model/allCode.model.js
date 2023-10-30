const mongoose = require("mongoose");

const allCodeSchema = new mongoose.Schema({
  style: {
    type: String,
  },
  atr_code: [
    {
      key: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("AllCode", allCodeSchema);
