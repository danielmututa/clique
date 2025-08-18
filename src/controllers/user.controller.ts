




import {
  createUser,
  verifyCode,
  loginUser,
  getUsers,
  getUserById,
  changePassword,
  deleteUserById,
  deleteAllUsers,
} from '../services/user.service';
import { createUserSchema, loginSchema, changePasswordSchema } from '../schema/user.schema';

export const userResolvers = {
  Query: {
    users: async () => await getUsers(),
    user: async (_: any, { id }: { id: string }) => await getUserById(id),
  },
  // Mutation: {
  //   createUser: async (_: any, { input }: any) => {
  //     const validated = createUserSchema.parse(input);
  //     return await createUser(validated);
  //   },
  //   verifyCode: async (_: any, { email, code }: any) => {
  //     return await verifyCode(email, code);
  //   },
  //   login: async (_: any, { input }: any) => {
  //     const validated = loginSchema.parse(input);
  //     return await loginUser(validated);
  //   },
  //   changePassword: async (_: any, { input }: any) => {
  //     const validated = changePasswordSchema.parse(input);
  //     return await changePassword(validated);
  //   },
  //   deleteUser: async (_: any, { id }: any) => {
  //     return await deleteUserById(id);
  //   },
  //   deleteAllUsers: async () => {
  //     return await deleteAllUsers();
  //   },
  // },
  Mutation: {
  createUser: async (_: any, { input }: any) => {
    const validated = createUserSchema.parse(input);
    return await createUser(validated);
  },
 verifyCode: async (_: any, { identifier, code }: any) => {
  return await verifyCode(identifier, code);
},

  login: async (_: any, { input }: any) => {
    const validated = loginSchema.parse(input);
    return await loginUser(validated);
  },
  changePassword: async (_: any, { input }: any) => {
    const validated = changePasswordSchema.parse(input);
    return await changePassword(validated);
  },
  deleteUser: async (_: any, { id }: any) => {
    return await deleteUserById(id);
  },
  deleteAllUsers: async () => {
    return await deleteAllUsers();
  },
},

};


