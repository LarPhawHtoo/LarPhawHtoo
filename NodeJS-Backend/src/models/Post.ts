import mongoose, { Schema, model, Types } from "mongoose";

const postSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  reference: {
    type: String,
  },
  postImage: {
    type: String,
  },
  created: { type: Date },
  updated: { type: Date, default: Date.now },
},
  {
    timestamps: true
  });
  export default model ("Post",postSchema);