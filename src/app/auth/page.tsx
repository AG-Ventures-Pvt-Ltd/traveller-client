'use client'

import Image from "next/image";
import Button from "../../common/components/atoms/Button";
import { Register } from "./components/Register";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();

  return (
    <div className="flex items-center shadow-[0_0_40px_10px_rgba(0,0,0,0.3)]">
      <Image src={'/collab.png'} alt="" height={0} width={0} className="w-[60%] " unoptimized />
      <div className="flex flex-col gap-2 p-8 w-full">
        <h1 className="font-extrabold text-5xl">Wondrr</h1>
        <h3 className="text-xl font-bold">Welcome !</h3>
        <Register />
        <h1 className="text-center">OR</h1>
        <Button className="bg-black text-white rounded-lg">
          Sign up with Google
        </Button>
        <div className='flex justify-end'>
          Already have an account?&nbsp;
          <span onClick={() => router.push('')}>Login</span>
        </div>
      </div>
    </div>
  );
}