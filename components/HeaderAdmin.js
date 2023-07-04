import React from 'react'
import { useRouter } from "next/router";

export default function HeaderAdmin() {
  const router = useRouter();
  const logOut = () => {
    document.cookie = `login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    router.push(`/login`)
  };
  return (
    <div className="w-full items-center bg-sky-600 text-white px-28 py-6 shadow-lg shadow-gray-400">
      <div className="flex justify-between uppercase">
        <div className="font-medium">Graha Harmas Brataseni | Admin</div>
        <button onClick={(e) => logOut()}>Logout</button>
      </div>
    </div>
  );
}