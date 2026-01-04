import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUserBase {
  email: string;
  password?: string;
  fullName?: string;
  username?: string;
  provider?: {
    type: string;
    id?: string;
  };
  type : "Traveler" | "Host";
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IUserBase, Document {
  _id: Types.ObjectId;
  email: string;
  fullName?: string;
  type: "Traveler" | "Host";
  isPasswordCorrect(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, "User with this email already exists"],
      validate: {
        validator: function(value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email format'
      }
    },
    password: {
      type: String,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required']
    },
    username: {
      type: String,
      unique: [true, "User with this username already exists"],
      sparse: true,
    },
    type: {
      type: String,
      enum: ['Traveler', 'Host'],
      default: 'Traveler',
      required: true,
    },
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
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password!, saltRounds);
    next();
  } catch (err) {
    next(err as Error);
  }
});

userSchema.methods.isPasswordCorrect = async function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

export const User =
  mongoose.models.user || mongoose.model<IUser>('User', userSchema);
