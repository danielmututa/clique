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
//     login(input: LoginInput!): String!
//     changePassword(input: ChangePasswordInput!): User!
//     deleteUser(id: ID!): User!
//     deleteAllUsers: String!
//   }
// `;

// // Export resolvers together
// export const userResolversExport = userResolvers;






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
//     isVerified: Boolean
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
//     verifyCode(email: String!, code: String!): String!
//     login(input: LoginInput!): String!
//     changePassword(input: ChangePasswordInput!): User!
//     deleteUser(id: ID!): User!
//     deleteAllUsers: String!
//   }
// `;

// export const userResolversExport = userResolvers;








import { gql } from 'apollo-server';
import { userResolvers } from '../controllers/user.controller';

export const userTypeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String
    password: String
    phone: String
    role: String!
    createdAt: String
    isVerified: Boolean
  }

  type AuthResponse {
    message: String!
    token: String
    user: User
  }

  input CreateUserInput {
    name: String!
    email: String
    password: String
    phone: String
    role: String
    googleId: String
  }

  input LoginInput {
    email: String
    phone: String
    password: String
    googleId: String
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
    createUser(input: CreateUserInput!): AuthResponse!
    verifyCode(identifier: String!, code: String!): AuthResponse!
    login(input: LoginInput!): AuthResponse!
    changePassword(input: ChangePasswordInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: String!
  }
`;

export const userResolversExport = userResolvers;
