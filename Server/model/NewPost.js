const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    category: { type: String },
    authorname: { type: String },
    authorpic: { type: String },
    image: { type: String },
    usersliked: { type: Array },
  },
  {
    timestamps: true,
  }
);

const postModel = new model("Post", PostSchema);
module.exports = postModel;
