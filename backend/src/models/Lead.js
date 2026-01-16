import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    status: {
      type: String,
      enum: ["new", "contacted", "converted"],
      default: "new",
    },
    source: {
      type: String,
      enum: ["facebook", "google", "referral"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
