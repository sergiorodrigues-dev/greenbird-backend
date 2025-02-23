import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
  user: mongoose.Types.ObjectId; // Relation with user
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: Date;
}

const AddressSchema: Schema = new Schema<IAddress>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relation with user
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  {
    timestamps: true, // Add createdAt e updatedAt automatically
  }
);

const AddressModel = mongoose.model<IAddress>("Address", AddressSchema);
export default AddressModel;
