import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { User } from '../model/User';
import { UserDetails } from '../model/UserDetails';
import { connectToDatabase } from '@/lib/db/db';

export async function POST(req: NextRequest): Promise<NextResponse> {
  let session;
  
  try {
    await connectToDatabase();
    session = await mongoose.startSession();

    session.startTransaction();

    const { email, password, fullName, username, mobileNumber } = await req.json();

    if (!email || !password || !fullName || !username) {
      return NextResponse.json({ 
        message: 'All fields are required' ,
        success : false,
        status: 400
      }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ 
        message: 'Password must be at least 8 characters long' ,
        success : false,
        status: 400
      }, { status: 400 });
    }

    const [createdUser] = await User.create([{
      email,
      password,
      fullName,
      username,
    }], { session });

    await UserDetails.create([{
      userId: createdUser._id,
      mobileNumber,
      provider: {
        type: 'credentials'
      },
    }], { session });

    await session.commitTransaction();
    
    return NextResponse.json({ 
      message: "Registration Successful!", 
      data: {
        id: createdUser._id,
        email: createdUser.email,
        username: createdUser.username,
        fullName: createdUser.fullName
      } 
    }, { status: 201 });

  } 
  catch (error: unknown) {

    if (session?.inTransaction()) {
      await session.abortTransaction();
    }

    const mongoError = error as { 
      name?: string;
      code?: number;
      message?: string;
      errors?: Record<string, { message: string }>;
      cause?: { code?: number };
    };

    if (mongoError.name === 'ValidationError' && mongoError.errors) {
      const errorMessages = Object.values(mongoError.errors).map(err => err.message);
      return NextResponse.json({ 
        message: errorMessages.join(', ') ,
        status: 400
      }, { status: 400 });
    }

    if (mongoError.code === 11000 || mongoError.cause?.code === 11000) {
      return NextResponse.json({ 
        message: mongoError.message || 'A user with this information already exists' ,
        success : false,
        status: 400
      }, { status: 400 });
    }

    return NextResponse.json({ 
      message: 'Registration failed. Please try again.',
      success : false,
      status: 500 
    }, { status: 500 });

  } finally {
    await session?.endSession();
  }
}
