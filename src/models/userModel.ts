import mongoose, { Schema, Document } from "mongoose";

// Define user roles
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

// Define the User schema interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  addresses: mongoose.Types.ObjectId[]; // Ref. to addresses
  createdAt: Date;
}

// Mongoose schema for User
const UserSchema: Schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }], // Address ref
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

// Create and export the model
const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
