import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { formatDate, getProfile, logOut, getPesananByIdUser } from "@/pages/helper";
import { useRouter } from "next/router";

export default function Riwayat() {
  const router = useRouter();
  const [profile, setProfile] = useState([]);
  const [dataPesanan, setDataPesanan] = useState([]);
  
  useEffect(() => {
    const getProf = async () => {
      try {
        const prof = await getProfile();
        if (prof) {
          setProfile(prof);
        } else {
          logOut();
          router.push(`/`);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const getPesanan = async () => {
      try {
        const listPesanan = await getPesananByIdUser();
        setDataPesanan(listPesanan);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getProf();
    getPesanan();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-8">
      <Header />
      <div className="grid grid-cols-5 text-center gap-8 text-sm">
        {dataPesanan?.map((item) => (
          <div key={item.id} className="hover:bg-gray-100">
            <div className="border border-white bg-white p-5 h-fit shadow-lg shadow-gray-400">
              <div className="mb-1 pb-1 border-b border-sky-300 text-sky-400 font-medium">
                Detail Pesanan
              </div>
              <div className="mb-2">
                <div className="text-gray-600">Gedung</div>
                <div>{item?.gedung_nama ? item?.gedung_nama : "-"}</div>
              </div>
              <div className="mb-2">
                <div className="text-gray-600">Tanggal Sewa</div>
                <div>
                  {item?.tanggal_mulai ? formatDate(item?.tanggal_mulai) : "-"}{" "}
                  -{" "}
                  {item?.tanggal_selesai
                    ? formatDate(item?.tanggal_selesai)
                    : "-"}
                </div>
              </div>
              <div className="mb-2">
                <div className="text-gray-600">Harga Sewa</div>
                <div>
                  {item?.harga_deal
                    ? "Rp " +
                      new Intl.NumberFormat("id-ID").format(item.harga_deal)
                    : "-"}
                </div>
              </div>
              <div className="mb-2">
                <div className="mb-1 text-gray-600">Status</div>
                <div>
                  <span
                    className={`text-white px-2 py-1 rounded-full text-xs ${
                      item?.status_id === "1"
                        ? "bg-gray-500"
                        : item?.status_id === "2"
                        ? "bg-emerald-500"
                        : item?.status_id === "3"
                        ? "bg-red-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {item?.status_nama ? item?.status_nama : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
