'use client';

import Landing from "./(client)/(landing)/page";
import './globals.css';
// import { useSession } from "next-auth/react";


export default function Home() {

  // const } = useSession();

  return (
    <div>
      <Landing/>
    </div>
  );
}
