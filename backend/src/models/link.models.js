import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    copyCount: {
      type: Number,
    },
    publicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Link = mongoose.model("Link", linkSchema);
