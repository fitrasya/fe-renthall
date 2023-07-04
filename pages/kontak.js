import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";

export default function Tentang() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <div className="flex justify-between bg-white shadow-lg shadow-gray-400 mx-28">
        <div className="w-1/2 flex justify-center items-center">
          <div className="mx-20">
            <div className="font-semibold text-5xl text-sky-500 mb-4">
              Hubungi Kami
              <br />
              Untuk Pemesanan.
            </div>
            <div className="text-justify text-gray-500 font-normal">
              Pembayaran bisa dikirimkan melalui transfer ke rekening berikut :{" "}
              <span className="font-semibold text-sky-400">Bank BCA</span>, No.
              Rek <span className="font-semibold text-sky-400">8692456652</span>{" "}
              a.n{" "}
              <span className="font-semibold text-sky-400">
                Luri Agung Satya Budi
              </span>
            </div>
            <div className="mt-4 flex gap-4">
              <a
                href="https://wa.me/6282113041343?text=Selamat pagi, saya ingin konfirmasi terkait pemesanan gedung"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="flex gap-1 btn bg-emerald-500 hover:bg-emerald-600 border-emerald-600">
                  Chat Whatsapp
                </button>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=-6.377497260327903,106.81417800000001`}
              >
                <button className="flex gap-1 btn bg-sky-500 hover:bg-sky-600 border-sky-600">
                  Kunjungi Kantor Kami
                </button>
              </a>
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
