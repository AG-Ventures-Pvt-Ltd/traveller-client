import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/db';
import { OTP, OTPPurpose, IOTP } from './model/OTP';
import { User } from '../[...nextauth]/model/User';
import bcrypt from 'bcrypt';

interface VerifyOTPRequest {
  email: string;
  otp: string;
  purpose: OTPPurpose;
  newPassword?: string; 
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body: VerifyOTPRequest = await request.json();
    const { email, otp, purpose, newPassword } = body;

    if (!email || !otp || !purpose) {
      return NextResponse.json(
        { success: false, message: 'Email, OTP, and purpose are required' },
        { status: 400 }
      );
    }

    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP format. Must be 6 digits' },
        { status: 400 }
      );
    }

    if (!Object.values(OTPPurpose).includes(purpose)) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP purpose' },
        { status: 400 }
      );
    }

    const otpRecord: IOTP | null = await OTP.findOne({
      email,
      purpose,
      isVerified: false,
    }).sort({ createdAt: -1 }); 

    
    if (otpRecord && otpRecord.isExpired()) {
        await OTP.findByIdAndDelete(otpRecord._id);
        return NextResponse.json(
            { success: false, message: 'OTP has expired.' },
            { status: 400 }
        );
    }
    
    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: 'OTP not found or already verified' },
        { status: 404 }
      );
    }

    if (otpRecord.attempts >= 5) {
      await OTP.findByIdAndDelete(otpRecord._id);
      return NextResponse.json(
        { success: false, message: 'Maximum attempts exceeded. Please request a new OTP' },
        { status: 400 }
      );
    }

    if (otpRecord.otp !== otp) {
      await otpRecord.incrementAttempts();
      const remainingAttempts = 5 - otpRecord.attempts;
      return NextResponse.json(
        {
          success: false,
          message: `Invalid OTP. ${remainingAttempts} attempts remaining`,
        },
        { status: 400 }
      );
    }

    otpRecord.isVerified = true;
    await otpRecord.save();

    let responseData: Record<string, unknown> = { email, purpose };

    switch (purpose) {
      case OTPPurpose.FORGOT_PASSWORD:
        if (!newPassword) {
          return NextResponse.json(
            { success: false, message: 'New password is required for password reset' },
            { status: 400 }
          );
        }

        if (newPassword.length < 8) {
          return NextResponse.json(
            { success: false, message: 'Password must be at least 8 characters long' },
            { status: 400 }
          );
        }

        const user = await User.findOne({ email });
        if (!user) {
          return NextResponse.json(
            { success: false, message: 'User not found' },
            { status: 404 }
          );
        }

        const saltRounds = 12;
        user.password = await bcrypt.hash(newPassword, saltRounds);
        await user.save();

        responseData = { ...responseData, message: 'Password reset successfully' };
        break;

      case OTPPurpose.EMAIL_VERIFICATION:

      const userToVerify = await User.findOne({ email });
        if (userToVerify) {
          userToVerify.isVerified = true;
          await userToVerify.save();
        }
        responseData = { ...responseData, message: 'Email verified successfully' };
        break;

    //   case OTPPurpose.LOGIN_VERIFICATION:
    //   case OTPPurpose.TWO_FACTOR_AUTH:
    //   case OTPPurpose.PHONE_VERIFICATION:
      case OTPPurpose.ACCOUNT_DELETION:
        responseData = { ...responseData, message: 'OTP verified successfully' };
        break;

      default:
        responseData = { ...responseData, message: 'OTP verified successfully' };
    }

    await OTP.findByIdAndDelete(otpRecord._id);

    return NextResponse.json(
      {
        success: true,
        message: responseData.message,
        data: responseData,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: errorMessage },
      { status: 500 }
    );
  }
}
