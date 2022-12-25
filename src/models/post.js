const { model, Schema } = require("mongoose");

const PostSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    desc: { type: String },
    img: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

let Post = new model("Post", PostSchema);
module.exports = Post;
