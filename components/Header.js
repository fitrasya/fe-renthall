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
