

// import { createUserSchema } from '../schema/user.schema';
// import {
//   createUser,
//   getUsers,
//   getUserById,
//   loginUser,
//   changePassword,
//   deleteUserById,
//   deleteAllUsers
// } from '../services/user.service';
// import { LoginInput, ChangePasswordInput } from '../schema/user.schema';

// export const userResolvers = {
//   Query: {
//     users: async () => await getUsers(),
//     user: async (_: any, args: { id: string }) => await getUserById(args.id),
//   },
//   Mutation: {
//     createUser: async (_: any, args: { input: any }) => {
//       const validated = createUserSchema.parse(args.input);
//       return await createUser(validated);
//     },

//     login: async (_: any, args: { input: LoginInput }) => {
//       return await loginUser(args.input); // pass whole object
//     },

//     changePassword: async (_: any, args: { input: ChangePasswordInput }) => {
//       return await changePassword(args.input); // pass whole object
//     },

//     deleteUser: async (_: any, args: { id: string }) => {
//       return await deleteUserById(args.id);
//     },

//     deleteAllUsers: async () => {
//       return await deleteAllUsers(); // already returns string
//     },
//   },
// };








import { createUserSchema, loginSchema, changePasswordSchema } from '../schema/user.schema';
import {
  createUser,
  getUsers,
  getUserById,
  loginUser,
  changePassword,
  deleteUserById,
  deleteAllUsers
} from '../services/user.service';
import { LoginInput, ChangePasswordInput } from '../schema/user.schema';

export const userResolvers = {
  Query: {
    users: async () => await getUsers(),
    user: async (_: any, args: { id: string }) => await getUserById(args.id),
  },
  Mutation: {
    createUser: async (_: any, args: { input: any }) => {
      const validated = createUserSchema.parse(args.input);
      return await createUser(validated);
    },

    login: async (_: any, args: { input: LoginInput }) => {
      const validated = loginSchema.parse(args.input);
      return await loginUser(validated);
    },

    changePassword: async (_: any, args: { input: ChangePasswordInput }) => {
      const validated = changePasswordSchema.parse(args.input);
      return await changePassword(validated);
    },

    deleteUser: async (_: any, args: { id: string }) => {
      return await deleteUserById(args.id);
    },

    deleteAllUsers: async () => {
      return await deleteAllUsers();
    },
  },
};
