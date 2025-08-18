// import mongoose, { Document, Schema } from 'mongoose';
// import validator from 'validator';
// import argon2 from 'argon2';

// // User interface
// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   role: 'renter' | 'owner' | 'admin';
//   googleId?: string;
//   createdAt: Date;
//   verifyPassword(password: string): Promise<boolean>;
// }

// // Mongoose schema
// const userSchema: Schema<IUser> = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: {
//     type: String,
//     required: function() {
//       return !this.googleId; // Password required only if Google login not used
//     },
//     validate: {
//       validator: function (value: string) {
//         if (!value) return true; // skip if not set (Google login)
//         const uppercase = (value.match(/[A-Z]/g) || []).length;
//         const lowercase = (value.match(/[a-z]/g) || []).length;
//         const numbers = (value.match(/[0-9]/g) || []).length;
//         const special = (value.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;
//         return (
//           value.length >= 8 &&
//           value.length <= 15 &&
//           uppercase >= 2 &&
//           lowercase >= 2 &&
//           numbers >= 2 &&
//           special >= 2
//         );
//       },
//       message:
//         'Password must be 8-15 chars, 2 uppercase, 2 lowercase, 2 numbers, 2 special chars',
//     },
//   },
//   phone: {
//     type: String,
//     validate: {
//       validator: (val: string) => validator.isMobilePhone(val, 'en-ZW'),
//       message: 'Phone number must be a valid Zimbabwean number',
//     },
//     required: false,
//   },
//   role: { type: String, enum: ['renter', 'owner', 'admin'], default: 'renter' },
//   googleId: { type: String, required: false },
//   createdAt: { type: Date, default: Date.now },
// });

// // Hash password before saving
// userSchema.pre<IUser>('save', async function (next) {
//   if (this.isModified('password') && this.password) {
//     this.password = await argon2.hash(this.password, { type: argon2.argon2id });
//   }
//   next();
// });

// // Verify password method
// userSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
//   if (!this.password) return false;
//   return await argon2.verify(this.password, password);
// };

// // Export model
// export const User = mongoose.model<IUser>('User', userSchema);








// // src/models/user.model.ts
// import mongoose, { Document, Schema } from 'mongoose';
// import validator from 'validator';
// import argon2 from 'argon2';

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   role: 'renter' | 'owner' | 'admin';
//   googleId?: string;
//   createdAt: Date;
//   isVerified: boolean;
//   verificationCode?: string;
//   verificationCodeExpires?: Date;
//   verifyPassword(password: string): Promise<boolean>;
// }

// const userSchema: Schema<IUser> = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: {
//     type: String,
//     required: function () {
//       return !this.googleId;
//     },
//   },
//   phone: {
//     type: String,
//     validate: { validator: (val: string) => validator.isMobilePhone(val, 'en-ZW') },
//   },
//   role: { type: String, enum: ['renter', 'owner', 'admin'], default: 'renter' },
//   googleId: { type: String, required: false },
//   createdAt: { type: Date, default: Date.now },
//   isVerified: { type: Boolean, default: false },
//   verificationCode: String,
//   verificationCodeExpires: Date,
// });

// // Hash password before saving
// userSchema.pre<IUser>('save', async function (next) {
//   if (this.isModified('password') && this.password) {
//     this.password = await argon2.hash(this.password);
//   }
//   next();
// });

// // Verify password
// userSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
//   if (!this.password) return false;
//   return await argon2.verify(this.password, password);
// };

// export const User = mongoose.model<IUser>('User', userSchema);





import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import argon2 from 'argon2';

export interface IUser extends Document {
  name: string;
  email?: string;
  phone?: string;
  password?: string;
  role: 'renter' | 'owner' | 'admin';
  googleId?: string;
  createdAt: Date;
  isVerified: boolean;
  verificationCode?: string;
  verificationCodeExpires?: Date;
  verificationMethod?: 'email' | 'phone';
  verifyPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    validate: { validator: (val: string) => !val || validator.isMobilePhone(val, 'en-ZW') },
  },
  password: { type: String },
  role: { type: String, enum: ['renter', 'owner', 'admin'], default: 'renter' },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationCodeExpires: Date,
  verificationMethod: { type: String, enum: ['email', 'phone'] },
});

userSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await argon2.hash(this.password);
  }
  next();
});

userSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
  if (!this.password) return false;
  return argon2.verify(this.password, password);
};

export const User = mongoose.model<IUser>('User', userSchema);
