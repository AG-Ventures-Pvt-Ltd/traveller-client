import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUserDetails extends Document {
  userId: Types.ObjectId;
  avatar?: string;
  birthDate?: Date;
  bio?: string;
  address?: string;
  mobileNumber: number;
  countryCode: string;
  joinedTrips: Types.ObjectId[];
  socialMedias?: {
    platform: string;
    url: string
  }[];
  provider?: {
    type: string;
    id?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userDetailsSchema = new Schema<IUserDetails>(
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
    birthDate: {
      type: Date
    },
    bio: {
      type: String
    },
    address: {
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
    joinedTrips: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
      }
    ],
    provider: {
      type: {
        type: String,
        enum: ['credentials', 'google', 'facebook'],
        default: 'credentials',
      },
      id: {
        type: String
      }
    },
  },
  {
    timestamps: true,
  }
);

export const UserDetails =
  mongoose.models.UserDetails || mongoose.model<IUserDetails>('userprofile', userDetailsSchema);