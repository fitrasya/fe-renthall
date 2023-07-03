
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Galeri() {
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
    <main className="flex min-h-screen flex-col items-center justify-between gap-8">
      <Header />
      <div className="grid grid-cols-5 gap-6 px-28">
        {data.map((item) => (
          <div
            className="border bg-white shadow-lg shadow-gray-400"
            key={item.id}
          >
            <div className="">
              <img
                className="w-80"
                src="https://www.grahaharmasbrataseni.com/images/slider-img.jpg"
              />
            </div>
            <div className="p-2">
              <div className="mb-1 text-sm font-light">{item.nama}</div>
              <div className="mb-2 font-medium">
                Rp {item.harga.toLocaleString("ind")}
              </div>
              <Link href={"/order/" + item.id}>
                <button className="btn bg-sky-500 hover:bg-sky-600 border-sky-600 w-full">
                  Booking Sekarang
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
