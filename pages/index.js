import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Index() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:1323/gedung");
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <div className="flex justify-between bg-white shadow-lg shadow-gray-400 mx-28">
        <div className="w-1/2 flex justify-center items-center">
          <div className="mx-20">
            <div className="font-semibold text-5xl text-sky-500 mb-4">
              Kami Hadir
              <br />
              Untuk Anda.
            </div>
            <div className="text-justify text-gray-500 font-normal">
              Graha Harmas Brataseni menjawab semua keinginan anda yang akan
              melaksanakan resepsi, seminar/meeting, khitanan, pesta ulang tahun
              dan lain sebagainya. Dengan fasilitas yang lengkap, lokasi
              strategis dan harga terjangkau (dimulai dari Rp 2.500.000).
            </div>
            <div className="mt-4 flex gap-4">
              <Link href={`/tentang`}>
                <button className="flex gap-1 btn bg-emerald-500 hover:bg-emerald-600 border-emerald-600">
                  Kenal kami lebih dalam
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </Link>
              <Link href={`/galeri`}>
                <button className="flex gap-1 btn bg-sky-500 hover:bg-sky-600 border-sky-600">
                  Lihat koleksi galeri kami
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="shadow-lg w-1/2">
          <img
            className="w-full"
            src="https://www.grahaharmasbrataseni.com/images/slider-img.jpg"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
