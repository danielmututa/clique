import { gql } from "apollo-server";

export const typeDefs = gql`
  type Post {
    _id: ID!
    title: String!
    content: String!
    createdAt: String
    updatedAt: String
  }

  input CreatePostInput {
    title: String!
    content: String!
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }
`;
