import React from "react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState();
  const [schedule, setSchedule] = useState([]);
  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:1323/dashboard");
      const json = await res.json();
      setDashboard(json.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const res = await fetch("http://localhost:1323/schedule");
      const json = await res.json();
      setSchedule(json.data);
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

  useEffect(() => {
    fetchDashboard();
    fetchSchedule();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 text-white">
      <div className="bg-white p-3 col-span-2 h-fit shadow-lg shadow-gray-400">
        <div className="flex justify-between mb-1 pb-1 border-b border-sky-300">
          <div className="text-sky-400 font-medium">JADWAL SEWA</div>
        </div>
        <table className="table-fixed w-full">
          <tbody>
            {schedule?.map((item) => (
              <tr className="text-gray-600" key={item.id}>
                <td className="py-1">
                  {formatTanggal(item.mulai)} - {formatTanggal(item.mulai)}
                </td>
                <td className="text-center">{item.gedung}</td>
                <td className="text-right">
                  {item.pemesan} ({item.kontak})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-rows-6 gap-y-2 h-fit">
        <div className="bg-sky-500 p-3 flex justify-between shadow-lg shadow-gray-400">
          Jumlah Pesanan Diajukan
          <div className="px-2 bg-white text-sky-500 rounded-lg">
            {dashboard?.diajukan}
          </div>
        </div>
        <div className="bg-emerald-500 p-3 flex justify-between shadow-lg shadow-gray-400">
          Jumlah Pesanan Disetujui
          <div className="px-2 bg-white text-emerald-500 rounded-lg">
            {dashboard?.disetujui}
          </div>
        </div>
        <div className="bg-red-500 p-3 flex justify-between shadow-lg shadow-gray-400">
          Jumlah Pesanan Ditolak
          <div className="px-2 bg-white text-red-500 rounded-lg">
            {dashboard?.ditolak}
          </div>
        </div>
        <div className="bg-violet-500 p-3 flex justify-between shadow-lg shadow-gray-400">
          Total Data Pesanan
          <div className="px-2 bg-white text-violet-500 rounded-lg">
            {dashboard?.pesanan}
          </div>
        </div>
        <div className="bg-orange-500 p-3 flex justify-between shadow-lg shadow-gray-400">
          Total Data Pemesan
          <div className="px-2 bg-white text-orange-500 rounded-lg">
            {dashboard?.pemesan}
          </div>
        </div>
        <div className="bg-pink-500 p-3 flex justify-between shadow-lg shadow-gray-400">
          Total Data Gedung
          <div className="px-2 bg-white text-pink-500 rounded-lg">
            {dashboard?.gedung}
          </div>
        </div>
      </div>
    </div>
  );
}
