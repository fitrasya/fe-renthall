import React from "react";
import { useEffect, useState } from "react";

export default function Pesanan() {
  const [dataPesanan, setDataPesanan] = useState([]);
  const [data, setData] = useState();
  const fetchPesanan = async () => {
    try {
      const resPesanan = await fetch("http://localhost:1323/pesanan");
      const jsonPesanan = await resPesanan.json();
      setDataPesanan(jsonPesanan.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchPesanan();
  }, []);

  const detailPesanan = async (id) => {
    try {
      const response = await fetch(`http://localhost:1323/pesanan/${id}`);
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateStatusPesanan = async (id, status) => {
    var formdata = new FormData();
    formdata.append("id", id);
    formdata.append("status_id", status);

    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:1323/status-pesanan`, requestOptions);
      const jsonData = await response.json();
      fetchPesanan()
      detailPesanan(id)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function formatTanggal(timestamp) {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agst", "Sep", "Okt", "Nov", "Des",
    ];
    const dateObj = new Date(timestamp);
    const monthIndex = dateObj.getMonth();
    const formattedDate = `${dateObj.getDate()} ${
      monthIndex === 0 ? monthNames[11] : monthNames[monthIndex - 1]
    } ${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
    return formattedDate;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border border-white bg-white p-3 col-span-2 h-fit shadow-lg shadow-gray-400">
        <div className="flex justify-between mb-1 pb-1 border-b border-sky-300">
          <div className="text-sky-400 font-medium">MANAJEMEN PESANAN</div>
        </div>
        <table className="table-fixed w-full">
          <tbody>
            {dataPesanan?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td>
                  {item.pemesan_nama} ({item.pemesan_kontak})
                </td>
                <td className="text-center">{item.gedung_nama}</td>
                <td className="text-center">
                  <span
                    className={`text-white px-2 py-1 rounded-full text-xs ${
                      item.status_id === "1"
                        ? "bg-gray-500"
                        : item.status_id === "2"
                        ? "bg-emerald-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status_nama}
                  </span>
                </td>
                <td className="flex justify-end gap-2 py-1">
                  <button
                    onClick={(e) => detailPesanan(item.id)}
                    className="btn bg-sky-500 hover:bg-sky-600 border-sky-600"
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border border-white bg-white p-3 h-fit shadow-lg shadow-gray-400">
        <div className="mb-1 pb-1 border-b border-sky-300 text-sky-400 font-medium">
          Detail Pesanan
        </div>
        <div className="mb-2">
          <div className="text-gray-600">Pemesan Nama</div>
          <div>{data?.pemesan_nama ? data?.pemesan_nama : "-"}</div>
        </div>
        <div className="mb-2">
          <div className="text-gray-600">Pemesan Kontak</div>
          <div>{data?.pemesan_kontak ? data?.pemesan_kontak : "-"}</div>
        </div>
        <div className="mb-2">
          <div className="text-gray-600">Gedung</div>
          <div>{data?.gedung_nama ? data?.gedung_nama : "-"}</div>
        </div>
        <div className="mb-2">
          <div className="text-gray-600">Tanggal Sewa</div>
          <div>
            {data?.tanggal_mulai ? formatTanggal(data?.tanggal_mulai) : "-"} -{" "}
            {data?.tanggal_selesai ? formatTanggal(data?.tanggal_selesai) : "-"}
          </div>
        </div>
        <div className="mb-2">
          <div className="text-gray-600">Harga Sewa</div>
          <div>
            {data?.harga_deal
              ? "Rp " + new Intl.NumberFormat("id-ID").format(data.harga_deal)
              : "-"}
          </div>
        </div>
        <div className="mb-2">
          <div className="mb-1 text-gray-600">Status</div>
          <div>
            <span
              className={`text-white px-2 py-1 rounded-full text-xs ${
                data?.status_id === "1"
                  ? "bg-gray-500"
                  : data?.status_id === "2"
                  ? "bg-emerald-500"
                  : data?.status_id === "3"
                  ? "bg-red-500"
                  : "bg-gray-300"
              }`}
            >
              {data?.status_nama ? data?.status_nama : "-"}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={(e) => updateStatusPesanan(data?.id, 3)}
            className="btn bg-red-500 hover:bg-red-600 border-red-600 w-1/2"
          >
            Decline
          </button>
          <button
            onClick={(e) => updateStatusPesanan(data?.id, 2)}
            className="btn bg-emerald-500 hover:bg-emerald-600 border-emerald-600 w-1/2"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
