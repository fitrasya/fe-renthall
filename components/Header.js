import Link from 'next/link';
import React from 'react'
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Header() {
    const { asPath } = useRouter();
  useEffect(() => {
    console.log(asPath); // '/blog/xyz'
  }, [])
  
  return (
    <div className="w-full items-center bg-sky-600 text-white px-28 py-6 shadow-lg shadow-gray-400">
      <div className="justify-between flex">
        <Link href={`/`}>
          <div className="font-medium text-2xl">
            Graha Harmas Brataseni
          </div>
        </Link>
        <ul className="flex justify-between gap-20">
          <li
            className={
              asPath === `/` ? `border-b-2 font-medium` : `hover:border-b`
            }
          >
            <Link href={`/`}>
              <div>Beranda</div>
            </Link>
          </li>
          <li
            className={
              asPath === `/galeri` ? `border-b-2 font-bold` : `hover:border-b`
            }
          >
            <Link href={`/galeri`}>
              <div>Galeri</div>
            </Link>
          </li>
          <li
            className={
              asPath === `/tentang` ? `border-b-2 font-bold` : `hover:border-b`
            }
          >
            <Link href={`/tentang`}>
              <div>Tentang</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
