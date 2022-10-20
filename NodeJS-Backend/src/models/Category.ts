import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
  //id: String,
  categoryName: {
    type: String
  },
  categoryDescription: {
    type: String
  },
  categoryImgUrl: {
    type: String,
  },
  categoryContent: {
    type: String
  },
  updated: {
    type: Date, default: Date.now
  },
},
  {
  timestamps:true
});

export default model ("Category",categorySchema);