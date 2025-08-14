import { Post } from "../models/post.model";
import { CreatePostInput } from "../schema/post.schema";

export const createPost = async (input: CreatePostInput) => {
  const post = await Post.create(input);
  return post;
};

export const getPosts = async () => {
  return await Post.find();
};
