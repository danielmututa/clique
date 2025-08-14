
// import { userResolvers } from '../controllers/user.controller';
// import { gql } from 'apollo-server';

// export const userTypeDefs = gql`
//   type User {
//     _id: ID!
//     name: String!
//     email: String!
//     password: String!
//     phone: String
//     role: String!
//     createdAt: String
//   }

//   input CreateUserInput {
//     name: String!
//     email: String!
//     password: String!
//     phone: String
//     role: String
//   }

//   input LoginInput {
//     email: String!
//     password: String!
//   }

//   input ChangePasswordInput {
//     id: ID!
//     oldPassword: String!
//     newPassword: String!
//   }

//   type Query {
//     users: [User!]!
//     user(id: ID!): User
//   }

//   type Mutation {
//     createUser(input: CreateUserInput!): User!
//     login(input: LoginInput!): String!       # return token or message
//     changePassword(input: ChangePasswordInput!): User!
//     deleteUser(id: ID!): User!
//     deleteAllUsers: String!
//   }
// `;







// import { gql } from 'apollo-server';
// import { userResolvers } from '../controllers/user.controller';

// export const userTypeDefs = gql`
//   type User {
//     _id: ID!
//     name: String!
//     email: String!
//     password: String!
//     phone: String
//     role: String!
//     createdAt: String
//   }

//   input CreateUserInput {
//     name: String!
//     email: String!
//     password: String!
//     phone: String
//     role: String
//   }

//   input LoginInput {
//     email: String!
//     password: String!
//   }

//   input ChangePasswordInput {
//     id: ID!
//     oldPassword: String!
//     newPassword: String!
//   }

//   type Query {
//     users: [User!]!
//     user(id: ID!): User
//   }

//   type Mutation {
//     createUser(input: CreateUserInput!): User!
//     login(input: LoginInput!): String!
//     changePassword(input: ChangePasswordInput!): User!
//     deleteUser(id: ID!): User!
//     deleteAllUsers: String!
//   }
// `;


// export const userResolversExport = userResolvers;






import { userResolvers } from '../controllers/user.controller';
import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    phone: String
    role: String!
    createdAt: String
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    phone: String
    role: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ChangePasswordInput {
    id: ID!
    oldPassword: String!
    newPassword: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    login(input: LoginInput!): String!
    changePassword(input: ChangePasswordInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: String!
  }
`;

// Export resolvers together
export const userResolversExport = userResolvers;
