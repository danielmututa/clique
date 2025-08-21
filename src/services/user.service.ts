




// import { User } from '../models/user.model';
// import { CreateUserInput, LoginInput, ChangePasswordInput } from '../schema/user.schema';
// import { sendVerificationEmail } from '../utils/email';
// import { sendVerificationSMS } from '../utils/sms';
// import jwt from 'jsonwebtoken';
// import argon2 from 'argon2';

// const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// // ------------------- CREATE USER -------------------
// export const createUser = async (input: CreateUserInput) => {
//   if (!input.password && !input.googleId) throw new Error('Password required');

//   const hashedPassword = input.password ? await argon2.hash(input.password) : undefined;
//   const code = generateCode();
//   const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//   const user = await User.create({
//     ...input,
//     password: hashedPassword,
//     verificationCode: code,
//     verificationCodeExpires: expires,
//     isVerified: false,
//     verificationMethod: input.phone ? 'phone' : 'email',
//   });

//   if (user.verificationMethod === 'phone' && user.phone) {
//     await sendVerificationSMS(user.phone, code);
//   } else if (user.email) {
//     await sendVerificationEmail(user.email, code);
//   }

//   return {
//     message: 'User created. Verification code sent',
//     token: null,
//     user: {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isVerified: user.isVerified,
//     },
//   };
// };

// // ------------------- VERIFY CODE -------------------
// export const verifyCode = async (emailOrPhone: string, code: string) => {
//   const user = await User.findOne({
//     $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
//   });
//   if (!user) throw new Error('User not found');
//   if (user.isVerified) throw new Error('Already verified');
//   if (user.verificationCode !== code) throw new Error('Invalid code');
//   if (user.verificationCodeExpires! < new Date()) throw new Error('Code expired');

//   user.isVerified = true;
//   user.verificationCode = undefined;
//   user.verificationCodeExpires = undefined;
//   await user.save();

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15d' });

//   return {
//     message: 'Verification successful',
//     token,
//     user: {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isVerified: user.isVerified,
//     },
//   };
// };

// // ------------------- LOGIN -------------------
// export const loginUser = async (input: LoginInput) => {
//   const user = await User.findOne({ email: input.email });
//   if (!user) throw new Error('User not found');
//   if (!user.isVerified) throw new Error('Account not verified');

//   let token: string;

//   if (input.googleId) {
//     token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15d' });
//   } else {
//     if (!input.password) throw new Error('Password required');
//     const valid = await argon2.verify(user.password!, input.password);
//     if (!valid) throw new Error('Invalid password');

//     token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15d' });
//   }

//   return {
//     message: 'Login successful',
//     token,
//     user: {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isVerified: user.isVerified,
//     },
//   };
// };

// // ------------------- GET USERS -------------------
// export const getUsers = async () => User.find();
// export const getUserById = async (id: string) => User.findById(id);

// // ------------------- CHANGE PASSWORD -------------------
// export const changePassword = async (input: ChangePasswordInput) => {
//   const user = await User.findById(input.id);
//   if (!user) throw new Error('User not found');

//   const valid = await argon2.verify(user.password!, input.oldPassword);
//   if (!valid) throw new Error('Old password incorrect');

//   user.password = await argon2.hash(input.newPassword);
//   await user.save();
//   return user;
// };

// // ------------------- DELETE USER -------------------
// export const deleteUserById = async (id: string) => User.findByIdAndDelete(id);
// export const deleteAllUsers = async () => {
//   await User.deleteMany();
//   return 'All users deleted';
// };







// import { User } from '../models/user.model';
// import { CreateUserInput, LoginInput, ChangePasswordInput } from '../schema/user.schema';
// import jwt from 'jsonwebtoken';
// import argon2 from 'argon2';
// import { sendVerificationSMS } from '../utils/sms';
// import validator from 'validator';

// const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// // ------------------- CREATE USER -------------------
// // export const createUser = async (input: CreateUserInput) => {
// //   if (!input.password && !input.googleId) throw new Error('Password or Google login required');

// //   if (!input.phone || !validator.isMobilePhone(input.phone, 'any')) {
// //     throw new Error('Invalid phone number');
// //   }

// //   const hashedPassword = input.password ? await argon2.hash(input.password) : undefined;
// //   const code = generateCode();
// //   const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

// //   const user = await User.create({
// //     ...input,
// //     password: hashedPassword,
// //     verificationCode: code,
// //     verificationCodeExpires: expires,
// //     isVerified: false,
// //     verificationMethod: 'phone', // always phone
// //   });

// //   // Send OTP via SMS
// //   await sendVerificationSMS(user.phone!, code);

// //   return {
// //     message: 'User created. Verification code sent via SMS',
// //     token: null,
// //     user: {
// //       _id: user._id,
// //       name: user.name,
// //       phone: user.phone,
// //       role: user.role,
// //       isVerified: user.isVerified,
// //     },
// //   };
// // };

// export const createUser = async (input: CreateUserInput) => {
//   // Validate role
//   if (!input.role) {
//     throw new Error('Role is required. Please select renter, owner, or admin.');
//   }

//  // Validate phone
// if (!input.phone) throw new Error('Phone number is required');
// if (!/^\+?\d{10,15}$/.test(input.phone)) {
//   throw new Error('Invalid phone number format');
// }

//   // Hash password if provided
//   const hashedPassword = input.password ? await argon2.hash(input.password) : undefined;

//   // Generate OTP
//   const code = generateCode();
//   const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//   // Create user
//   const user = await User.create({
//     ...input,
//     password: hashedPassword,
//     verificationCode: code,
//     verificationCodeExpires: expires,
//     isVerified: false,
//     verificationMethod: 'phone', // always SMS
//   });

//   // Send OTP via EasySendSMS
//   await sendVerificationSMS(user.phone!, code);

//   return {
//     message: 'User created. Verification code sent to phone number',
//     token: null,
//     user: {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       role: user.role,
//       isVerified: user.isVerified,
//     },
//   };
// };



// // ------------------- VERIFY CODE -------------------
// // export const verifyCode = async (identifier: string, code: string) => {
// //   const user = await User.findOne({ phone: identifier });
// //   if (!user) throw new Error('User not found');
// //   if (user.isVerified) throw new Error('Already verified');
// //   if (user.verificationCode !== code) throw new Error('Invalid code');
// //   if (user.verificationCodeExpires! < new Date()) throw new Error('Code expired');

// //   user.isVerified = true;
// //   user.verificationCode = undefined;
// //   user.verificationCodeExpires = undefined;
// //   await user.save();

// //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15d' });

// //   return {
// //     message: 'Verification successful',
// //     token,
// //     user: {
// //       _id: user._id,
// //       name: user.name,
// //       phone: user.phone,
// //       role: user.role,
// //       isVerified: user.isVerified,
// //     },
// //   };
// // };

// // src/services/user.service.ts
// // export const verifyCode = async (identifier: string, code: string) => {
// //   if (!identifier) throw new Error("Identifier (phone) is required");
// //   if (!code) throw new Error("Verification code is required");

// //   // Remove "+" if it exists
// //   const formattedIdentifier = identifier.startsWith("+") ? identifier.slice(1) : identifier;

// //   // Find user by phone
// //   const user = await User.findOne({ phone: formattedIdentifier });
// //   if (!user) throw new Error("User not found");
// //   if (user.isVerified) throw new Error("User already verified");
// //   if (user.verificationCode !== code) throw new Error("Invalid verification code");
// //   if (user.verificationCodeExpires! < new Date()) throw new Error("Code expired");

// //   // Mark as verified
// //   user.isVerified = true;
// //   user.verificationCode = undefined;
// //   user.verificationCodeExpires = undefined;
// //   await user.save();

// //   // Generate JWT
// //   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "15d" });

// //   return {
// //     message: "Verification successful",
// //     token,
// //     user: {
// //       _id: user._id,
// //       name: user.name,
// //       phone: user.phone,
// //       role: user.role,
// //       isVerified: user.isVerified,
// //     },
// //   };
// // };

// export const verifyCode = async (identifier: string, code: string) => {
//   if (!identifier) throw new Error("Identifier (phone) is required");
//   if (!code) throw new Error("Verification code is required");

//   // Always store and search phone with "+"
//   const formattedIdentifier = identifier.startsWith("+") ? identifier : `+${identifier}`;

//   const user = await User.findOne({ phone: formattedIdentifier });
//   if (!user) throw new Error("User not found");
//   if (user.isVerified) throw new Error("User already verified");
//   if (user.verificationCode !== code) throw new Error("Invalid verification code");
//   if (user.verificationCodeExpires! < new Date()) throw new Error("Code expired");

//   user.isVerified = true;
//   user.verificationCode = undefined;
//   user.verificationCodeExpires = undefined;
//   await user.save();

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "15d" });

//   return {
//     message: "Verification successful",
//     token,
//     user: {
//       _id: user._id,
//       name: user.name,
//       phone: user.phone,
//       role: user.role,
//       isVerified: user.isVerified,
//     },
//   };
// };



// // ------------------- LOGIN -------------------
// export const loginUser = async (input: LoginInput) => {
//   const user = await User.findOne({ phone: input.phone });
//   if (!user) throw new Error('User not found');
//   if (!user.isVerified) throw new Error('Account not verified');

//   let token: string;

//   if (input.googleId) {
//     token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15d' });
//   } else {
//     if (!input.password) throw new Error('Password required');
//     const valid = await argon2.verify(user.password!, input.password);
//     if (!valid) throw new Error('Invalid password');

//     token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15d' });
//   }

//   return {
//     message: 'Login successful',
//     token,
//     user: {
//       _id: user._id,
//       name: user.name,
//       phone: user.phone,
//       role: user.role,
//       isVerified: user.isVerified,
//     },
//   };
// };

// // ------------------- GET USERS -------------------
// export const getUsers = async () => User.find();
// export const getUserById = async (id: string) => User.findById(id);

// // ------------------- CHANGE PASSWORD -------------------
// export const changePassword = async (input: ChangePasswordInput) => {
//   const user = await User.findById(input.id);
//   if (!user) throw new Error('User not found');

//   const valid = await argon2.verify(user.password!, input.oldPassword);
//   if (!valid) throw new Error('Old password incorrect');

//   user.password = await argon2.hash(input.newPassword);
//   await user.save();
//   return user;
// };

// // ------------------- DELETE USERS -------------------
// export const deleteUserById = async (id: string) => User.findByIdAndDelete(id);
// export const deleteAllUsers = async () => {
//   await User.deleteMany();
//   return 'All users deleted';
// };



























import { User } from '../models/user.model';
import { CreateUserInput, LoginInput, ChangePasswordInput } from '../schema/user.schema';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { sendVerificationSMS } from '../utils/sms';
import validator from 'validator';

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// ------------------- CREATE USER -------------------
export const createUser = async (input: CreateUserInput) => {
  // Validate role
  if (!input.role) {
    throw new Error('Role is required. Please select renter, owner, or admin.');
  }

  // Validate phone
  if (!input.phone) throw new Error('Phone number is required');
  if (!/^\+?\d{10,15}$/.test(input.phone)) {
    throw new Error('Invalid phone number format');
  }

  // Hash password if provided
  const hashedPassword = input.password ? await argon2.hash(input.password) : undefined;

  // Generate OTP
  const code = generateCode();
  const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Create user
  const user = await User.create({
    ...input,
    password: hashedPassword,
    verificationCode: code,
    verificationCodeExpires: expires,
    isVerified: false,
    verificationMethod: 'phone', // always SMS
  });

  // Send OTP via EasySendSMS
  await sendVerificationSMS(user.phone!, code);

  return {
    message: 'User created. Verification code sent to phone number',
    token: null,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
    },
  };
};

// ------------------- VERIFY CODE -------------------
export const verifyCode = async (identifier: string, code: string) => {
  if (!identifier) throw new Error("Identifier (phone) is required");
  if (!code) throw new Error("Verification code is required");

  // Always store and search phone with "+"
  const formattedIdentifier = identifier.startsWith("+") ? identifier : `+${identifier}`;

  const user = await User.findOne({ phone: formattedIdentifier });
  if (!user) throw new Error("User not found");
  if (user.isVerified) throw new Error("User already verified");
  if (user.verificationCode !== code) throw new Error("Invalid verification code");
  if (user.verificationCodeExpires! < new Date()) throw new Error("Code expired");

  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpires = undefined;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "15d" });

  return {
    message: "Verification successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
    },
  };
};

// ------------------- LOGIN -------------------
// export const loginUser = async (input: LoginInput) => {
//   const user = await User.findOne({ phone: input.phone });
//   if (!user) throw new Error('User not found');
//   if (!user.isVerified) throw new Error('Account not verified');

//   let token: string;

//   if (input.googleId) {
//     token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15d' });
//   } else {
//     if (!input.password) throw new Error('Password required');

//     let valid = false;

//     try {
//       // Try argon2 verification first (for hashed passwords)
//       valid = await argon2.verify(user.password!, input.password);
//     } catch (err) {
//       valid = false;
//     }

//     // If not valid and DB contains plain text (old users), check directly
//     if (!valid && user.password === input.password) {
//       // Upgrade user to hashed password
//       user.password = await argon2.hash(input.password);
//       await user.save();
//       valid = true;
//     }

//     if (!valid) throw new Error('Invalid password');

//     token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15d' });
//   }

//   return {
//     message: 'Login successful',
//     token,
//     user: {
//       _id: user._id,
//       name: user.name,
//       phone: user.phone,
//       role: user.role,
//       isVerified: user.isVerified,
//     },
//   };
// };


export const loginUser = async (input: LoginInput) => {
  // Format phone number consistently
  const formattedPhone = input.phone?.startsWith('+') ? input.phone : `+${input.phone}`;
  
  const user = await User.findOne({ phone: formattedPhone });
  if (!user) throw new Error('User not found');
  if (!user.isVerified) throw new Error('Account not verified');

  let token: string;

  if (input.googleId) {
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15d' });
  } else {
    if (!input.password) throw new Error('Password required');
    if (!user.password) throw new Error('No password set for this account');

    // ADD DEBUGGING HERE
    console.log('Input password:', input.password);
    console.log('Stored password starts with $argon2:', user.password.startsWith('$argon2'));
    console.log('Stored password (first 50 chars):', user.password.substring(0, 50));

    let valid = false;

    // Check if password is hashed (argon2 hashes start with $argon2)
    if (user.password.startsWith('$argon2')) {
      try {
        console.log('Attempting argon2 verification...');
        valid = await argon2.verify(user.password, input.password);
        console.log('Argon2 verification result:', valid);
      } catch (err) {
        console.error('Argon2 verification error:', err);
        valid = false;
      }
    } else {
      console.log('Checking plain text password...');
      // Handle legacy plain text passwords
      if (user.password === input.password) {
        console.log('Plain text match found, upgrading...');
        // Upgrade to hashed password
        user.password = await argon2.hash(input.password);
        await user.save();
        valid = true;
      } else {
        console.log('Plain text passwords do not match');
      }
    }

    console.log('Final valid result:', valid);

    if (!valid) {
      throw new Error('Invalid password');
    }

    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '15d' });
  }

  return {
    message: 'Login successful',
    token,
    user: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
    },
  };
};

// ------------------- GET USERS -------------------
export const getUsers = async () => User.find();
export const getUserById = async (id: string) => User.findById(id);

// ------------------- CHANGE PASSWORD -------------------
export const changePassword = async (input: ChangePasswordInput) => {
  const user = await User.findById(input.id);
  if (!user) throw new Error('User not found');

  const valid = await argon2.verify(user.password!, input.oldPassword);
  if (!valid) throw new Error('Old password incorrect');

  user.password = await argon2.hash(input.newPassword);
  await user.save();
  return user;
};

// ------------------- DELETE USERS -------------------
export const deleteUserById = async (id: string) => User.findByIdAndDelete(id);
export const deleteAllUsers = async () => {
  await User.deleteMany();
  return 'All users deleted';
};




// src/utils/email.ts
// export const sendVerificationEmail = async (to: string, code: string) => {
//   console.log(`📧 Sending verification code to ${to}: ${code}`);
//   return true; // pretend success
// };
