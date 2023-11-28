import Post from "../models/post.js";
import { response } from "../Utils/responses";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(response(true, "Posts fetched successfully", posts));
  } catch (error) {
    res.status(500).json(response(false, error.message, null));
  }
};
