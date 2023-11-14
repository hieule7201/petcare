import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
  },
  {
    collection: "Role",
  }
);

export default mongoose.model("Role", roleSchema);
