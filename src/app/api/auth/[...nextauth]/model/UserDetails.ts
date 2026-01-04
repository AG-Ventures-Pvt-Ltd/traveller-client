import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUserDetails extends Document {
  userId: Types.ObjectId;
  avatar?: string;
  mobileNumber: number;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const userProfileSchema = new Schema<IUserDetails>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    avatar: {
      type: String
    },
    mobileNumber: {
      type: Number,
    },
    countryCode: {
      type: String,
      required: true,
      default: '+91'
    },
  },
  {
    timestamps: true,
  }
);

export const UserDetails = mongoose.model<IUserDetails>('UserProfile', userProfileSchema);