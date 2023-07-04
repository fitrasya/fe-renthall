import Link from 'next/link';
import React from 'react'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProfile, logOut } from "@/pages/helper";

export default function Header() {
  const { asPath } = useRouter();
  const router = useRouter();
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    getProf();
  }, []);

  const getProf = async () => {
    try {
      const prof = await getProfile();
      setProfile(prof);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const logIn = () => {
    router.push(`/login`)
  };

  return (
    <>
      <a
        href="https://wa.me/6282113041343?text=Selamat pagi, saya ingin konfirmasi terkait pemesanan gedung"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 flex items-center justify-center w-12 h-12 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 border-white border-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0l-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
          />
        </svg>
      </a>
      <div className="w-full items-center">
        <div className="justify-between flex bg-sky-600 text-white px-28 py-6 shadow-lg shadow-gray-400">
          <Link href={`/`}>
            <div className="font-medium text-2xl">Graha Harmas Brataseni</div>
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
                asPath === `/tentang`
                  ? `border-b-2 font-bold`
                  : `hover:border-b`
              }
            >
              <Link href={`/tentang`}>
                <div>Tentang</div>
              </Link>
            </li>
            <li
              className={
                asPath === `/kontak` ? `border-b-2 font-bold` : `hover:border-b`
              }
            >
              <Link href={`/kontak`}>
                <div>Kontak</div>
              </Link>
            </li>
            <li className="hover:border-b">
              {profile ? (
                <button
                  onClick={(e) => {
                    logOut();
                    router.reload();
                  }}
                >
                  Logout
                </button>
              ) : (
                <button onClick={(e) => logIn()}>Login</button>
              )}
            </li>
          </ul>
        </div>
        {profile ? (
          <div className="px-32 flex justify-between gap-1 mt-8">
            <div>Hi, {profile?.nama}</div>
            <Link href={`riwayat`}>
              <button className="flex gap-1 btn bg-emerald-500 hover:bg-emerald-600 border-emerald-600">
                Lihat Riwayat Booking
              </button>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
