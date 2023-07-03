"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Order() {
  const [data, setData] = useState();
  const [nohp, setNohp] = useState("");
  const [nama, setNama] = useState("");
  const [mulai, setMulai] = useState("");
  const [selesai, setSelesai] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1323/gedung/${id}`);
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  const submitPesanan = async () => {
    var formdata = new FormData();
    formdata.append("nama", nama);
    formdata.append("kontak", nohp);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `http://localhost:1323/pemesan`,
        requestOptions
      );
      const jsonData = await response.json();

      var formdata = new FormData();
      formdata.append("gedung_id", id);
      formdata.append("pemesan_id", jsonData.data.id);
      formdata.append("tanggal_mulai", mulai);
      formdata.append("tanggal_selesai", selesai);
      formdata.append("harga_deal", data.harga);
      formdata.append("status_id", 1);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `http://localhost:1323/pesanan`,
          requestOptions
        );
        const jsonData = await response.json();
        if (jsonData.status == 200) {
          alert(
            "Pesanan berhasil dikirim, silakan tunggu konfirmasi oleh admin melalui pesan whatsapp"
          );
          router.push(`/`);
        } else {
          alert(`Pesanan gagal dikirim, ${jsonData.message}`);
        }
      } catch (error) {
        allert("Error:", error);
      }
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-200 gap-8">
      <Header />
      <div className="flex justify-between gap-4">
        <div className="border border-white bg-white shadow-lg shadow-gray-400">
          <div className="max-w-2xl">
            <img
              className="w-full"
              src="https://www.grahaharmasbrataseni.com/images/slider-img.jpg"
            />
          </div>
          <div className="p-2">
            <div className="text-sky-400 font-medium text-lg">{data?.nama}</div>
            <div className="flex">
              <div className="w-1/2 text-gray-500">Harga Sewa</div>
              <div className="w-1/2 text-right text-gray-700">
                Rp {data?.harga.toLocaleString("ind")}
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2 text-gray-500">Kapasitas</div>
              <div className="w-1/2 text-right text-gray-700">
                {data?.kapasitas.toLocaleString("ind")} orang
              </div>
            </div>
          </div>
        </div>
        <div className="border border-white bg-white shadow-lg shadow-gray-400 h-fit">
          <div className="p-3 w-80">
            <div className="mb-3 pb-1 text-sky-400 font-medium border-b border-sky-300">
              ORDER FORM
            </div>
            <div className="mb-2">
              <div className="mb-1 text-gray-500">Nomor Handphone</div>
              <input
                value={nohp}
                onChange={(e) => setNohp(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1"
              />
            </div>
            <div className="mb-2">
              <div className="mb-1 text-gray-500">Nama Lengkap</div>
              <input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1"
              />
            </div>
            <div className="mb-2">
              <div className="mb-1 text-gray-500">Tanggal dan Jam Mulai</div>
              <input
                type="datetime-local"
                value={mulai}
                onChange={(e) => setMulai(e.target.value)}
                className="px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1 w-full"
              />
            </div>
            <div className="mb-5">
              <div className="mb-1 text-gray-500">Tanggal dan Jam Selesai</div>
              <input
                type="datetime-local"
                value={selesai}
                onChange={(e) => setSelesai(e.target.value)}
                className="px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1 w-full"
              />
            </div>
            <div className="flex gap-2">
              <Link href={`/galeri`} className="w-1/2 text-center">
                <div className="btn bg-gray-500 hover:bg-gray-600 border-gray-600">
                  Cancel
                </div>
              </Link>
              <button
                onClick={submitPesanan}
                type="submit"
                className="btn bg-sky-500 hover:bg-sky-600 border-sky-600 w-1/2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
