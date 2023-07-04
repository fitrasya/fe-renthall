import Link from 'next/link';
import React from 'react'

export default function HeaderAdmin() {
  return (
    <div className="w-full items-center bg-sky-600 text-white px-28 py-6 shadow-lg shadow-gray-400">
      <div className="flex justify-between">
        <Link href={`/admin`}>
          <div className="font-medium">Graha Harmas Brataseni | Admin</div>
        </Link>
        <div>Logout</div>
      </div>
    </div>
  );
}
