import { createPostSchema } from "../schema/post.schema";
import { createPost, getPosts } from "../services/post.service";

export const postResolvers = {
  Query: {
    posts: async () => {
      return await getPosts();
    }
  },
  Mutation: {
    createPost: async (_: any, args: any) => {
      const validated = createPostSchema.parse(args.input);
      return await createPost(validated);
    }
  }
};
