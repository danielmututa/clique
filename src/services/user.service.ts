// import { User, IUser } from '../models/user.model';
// import { CreateUserInput, LoginInput, ChangePasswordInput } from '../schema/user.schema';

// // Create user
// export const createUser = async (input: CreateUserInput) => {
//   const user = await User.create(input);
//   return user;
// };

// // Get all users
// export const getUsers = async () => {
//   return await User.find();
// };

// // Get user by ID
// export const getUserById = async (id: string) => {
//   return await User.findById(id);
// };

// // Login user
// export const loginUser = async (input: LoginInput) => {
//   const user = await User.findOne({ email: input.email });
//   if (!user) throw new Error('User not found');
//   if (user.password !== input.password) throw new Error('Invalid password');
//   return `Login successful for user: ${user.name}`; // You can add JWT token here later
// };

// // Change password
// export const changePassword = async (input: ChangePasswordInput) => {
//   const user = await User.findById(input.id);
//   if (!user) throw new Error('User not found');
//   if (user.password !== input.oldPassword) throw new Error('Old password is incorrect');
//   user.password = input.newPassword;
//   await user.save();
//   return user;
// };

// // Delete user by ID
// export const deleteUserById = async (id: string) => {
//   const user = await User.findByIdAndDelete(id);
//   if (!user) throw new Error('User not found');
//   return user;
// };

// // Delete all users
// export const deleteAllUsers = async () => {
//   await User.deleteMany({});
//   return 'All users deleted';
// };






import { User, IUser } from '../models/user.model';
import { CreateUserInput, LoginInput, ChangePasswordInput } from '../schema/user.schema';
import argon2 from 'argon2';

// Create user
export const createUser = async (input: CreateUserInput) => {
  const user = await User.create(input);
  return user;
};

// Get all users
export const getUsers = async () => {
  return await User.find();
};

// Get user by ID
export const getUserById = async (id: string) => {
  return await User.findById(id);
};

// Login user
export const loginUser = async (input: LoginInput) => {
  const user = await User.findOne({ email: input.email });
  if (!user) throw new Error('User not found');

  // If Google login
  if (input.googleId) {
    if (user.googleId !== input.googleId) throw new Error('Google ID mismatch');
    return `Login successful for user: ${user.name} via Google`;
  }

  // If password login
  if (!input.password) throw new Error('Password is required');
  const isValid = await user.verifyPassword(input.password);
  if (!isValid) throw new Error('Invalid password');
  
  return `Login successful for user: ${user.name}`;
};

// Change password
export const changePassword = async (input: ChangePasswordInput) => {
  const user = await User.findById(input.id);
  if (!user) throw new Error('User not found');

  const isValid = await user.verifyPassword(input.oldPassword);
  if (!isValid) throw new Error('Old password is incorrect');

  user.password = input.newPassword; // will be hashed in pre-save hook
  await user.save();
  return user;
};

// Delete user by ID
export const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error('User not found');
  return user;
};

// Delete all users
export const deleteAllUsers = async () => {
  await User.deleteMany({});
  return 'All users deleted';
};
