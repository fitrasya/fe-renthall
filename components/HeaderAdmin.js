import Link from 'next/link';
import React from 'react'
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HeaderAdmin() {
    const { asPath } = useRouter();
  useEffect(() => {
    console.log(asPath);
  }, [])
  
  return (
    <div className="w-full items-center bg-sky-600 text-white px-28 py-6 shadow-lg shadow-gray-400">
      <div className="justify-between flex">
        <Link href={`/admin`}>
          <div className="font-medium text-2xl">Graha Harmas Brataseni</div>
        </Link>
      </div>
    </div>
  );
}
