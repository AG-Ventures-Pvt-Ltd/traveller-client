import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUserBase {
  email: string;
  password?: string;
  fullName?: string;
  username?: string;
  refreshToken?: string;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IUserBase, Document {
  _id: Types.ObjectId;
  email: string;
  fullName?: string;
  isPasswordCorrect(candidatePassword: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 }, { 
  unique: true, 
  name: 'unique_email',
  collation: { locale: 'en', strength: 2 } 
});

userSchema.index({ username: 1 }, { 
  unique: true, 
  sparse: true,
  name: 'unique_username',
  collation: { locale: 'en', strength: 2 } 
});

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
  mongoose.models.user || mongoose.model<IUser>('user', userSchema);
