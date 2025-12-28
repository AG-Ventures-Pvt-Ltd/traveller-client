import mongoose, { Document, Schema, Types } from 'mongoose';

export enum OTPPurpose {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  LOGIN_VERIFICATION = 'LOGIN_VERIFICATION',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  PHONE_VERIFICATION = 'PHONE_VERIFICATION',
  TWO_FACTOR_AUTH = 'TWO_FACTOR_AUTH',
  ACCOUNT_DELETION = 'ACCOUNT_DELETION',
}

interface IOTPBase {
  email: string;
  otp: string;
  purpose: OTPPurpose;
  userId?: Types.ObjectId;
  isVerified: boolean;
  attempts: number;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOTP extends IOTPBase, Document {
  _id: Types.ObjectId;
  isExpired(): boolean;
  incrementAttempts(): Promise<void>;
}

const otpSchema = new Schema<IOTP>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: function(value: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email format'
      }
    },
    otp: {
      type: String,
      required: [true, 'OTP is required'],
      minlength: 6,
      maxlength: 6,
    },
    purpose: {
      type: String,
      enum: Object.values(OTPPurpose),
      required: [true, 'OTP purpose is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    attempts: {
      type: Number,
      default: 0,
      max: 5, // Maximum 5 attempts allowed
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), 
    },
  },
  {
    timestamps: true,
  }
);

otpSchema.index({ email: 1, purpose: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); 

otpSchema.methods.isExpired = function(this: IOTP): boolean {
  return new Date() > this.expiresAt;
};

otpSchema.methods.incrementAttempts = async function(this: IOTP): Promise<void> {
  this.attempts += 1;
  await this.save();
};

export const OTP =
  mongoose.models.OTP || mongoose.model<IOTP>('OTP', otpSchema);
