'use client'

import { useSearchParams } from "next/navigation";


export default function PageContent() {

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

  return <div>{params.get('q')}</div>;
}