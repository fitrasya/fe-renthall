import React from 'react'
import { useEffect, useState } from "react";

export default function Gedung() {
  const [dataGedung, setDataGedung] = useState([]);
  const [aksi, setAksi] = useState("tambah");
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [kapasitas, setKapasitas] = useState("");
  const [gedungId, setGedungId] = useState("");
  const fetchGedung = async () => {
    try {
      const resGedung = await fetch("http://localhost:1323/gedung");
      const jsonGedung = await resGedung.json();
      setDataGedung(jsonGedung.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchGedung();
  }, []);

  const delGedung = async (id, nama) => {
    const confirmResult = confirm(`Yakin untuk menghapus data ${nama}`);
    if (confirmResult) {
      var formdata = new FormData();
      formdata.append("id", id);

      var requestOptions = {
        method: "DELETE",
        body: formdata,
        redirect: "follow",
      };

      try {
        await fetch("http://localhost:1323/gedung", requestOptions);
        fetchGedung()
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const addGedung = async () => {
    var formdata = new FormData();
    formdata.append("nama", nama);
    formdata.append("kapasitas", kapasitas);
    formdata.append("harga", harga);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      await fetch("http://localhost:1323/gedung", requestOptions);
      fetchGedung();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const tambahGedung = async () => {
    setAksi("tambah");
    setNama("");
    setKapasitas("");
    setHarga("");
  };

  const ubahGedung = async (id, nama, kapasitas, harga) => {
    setAksi("ubah");
    setGedungId(id)
    setNama(nama);
    setKapasitas(kapasitas);
    setHarga(harga);
  };

  const editGedung = async () => {
    var formdata = new FormData();
    formdata.append("id", gedungId);
    formdata.append("nama", nama);
    formdata.append("kapasitas", kapasitas);
    formdata.append("harga", harga);

    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };

    try {
      await fetch("http://localhost:1323/gedung", requestOptions);
      fetchGedung();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border border-white bg-white p-3 col-span-2 h-fit shadow-lg shadow-gray-400">
        <div className="flex justify-between mb-1 pb-1 border-b border-sky-300">
          <div className="text-sky-400 font-medium">MANAJEMEN GEDUNG</div>
          <button
            onClick={(e) => tambahGedung()}
            className="btn bg-sky-500 border-sky-600 hover:bg-sky-600 px-2"
          >
            Tambah
          </button>
        </div>
        <table className="table-fixed w-full">
          <tbody>
            {dataGedung?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td>{item.nama}</td>
                <td className="text-right">{item.kapasitas} orang</td>
                <td className="text-right">
                  Rp {new Intl.NumberFormat("id-ID").format(item.harga)}
                </td>
                <td className="flex justify-end gap-2 py-1">
                  <button
                    onClick={(e) =>
                      ubahGedung(item.id, item.nama, item.kapasitas, item.harga)
                    }
                    className="btn bg-orange-500 hover:bg-orange-600 border-orange-600"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={(e) => delGedung(item.id, item.nama)}
                    className="btn bg-red-500 hover:bg-red-600 border-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {aksi == "tambah" ? (
        <div className="border border-white bg-white p-3 h-fit shadow-lg shadow-gray-400">
          <div className="mb-1 pb-1 border-b border-sky-300 text-sky-400 font-medium">
            Tambah Data Gedung
          </div>
          <div className="mb-2">
            <div className="mb-1 text-gray-500">Nama Gedung</div>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1"
            />
          </div>
          <div className="mb-2">
            <div className="mb-1 text-gray-500">Kapasitas Gedung</div>
            <input
              value={kapasitas}
              onChange={(e) => setKapasitas(e.target.value)}
              className="px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1 w-full"
            />
          </div>
          <div className="mb-2">
            <div className="mb-1 text-gray-500">Harga Sewa Gedung</div>
            <input
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1"
            />
          </div>
          <button
            onClick={addGedung}
            type="submit"
            className="btn bg-sky-500 hover:bg-sky-600 border-sky-600 w-full mt-2"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="border border-white bg-white p-3 h-fit shadow-lg shadow-gray-400">
          <div className="mb-1 pb-1 border-b border-sky-300 text-sky-400 font-medium">
            Ubah Data Gedung
          </div>
          <div className="mb-2">
            <div className="mb-1 text-gray-500">Nama Gedung</div>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1"
            />
          </div>
          <div className="mb-2">
            <div className="mb-1 text-gray-500">Kapasitas Gedung</div>
            <input
              value={kapasitas}
              onChange={(e) => setKapasitas(e.target.value)}
              className="px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1 w-full"
            />
          </div>
          <div className="mb-2">
            <div className="mb-1 text-gray-500">Harga Sewa Gedung</div>
            <input
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1"
            />
          </div>
          <button
            onClick={editGedung}
            type="submit"
            className="btn bg-sky-500 hover:bg-sky-600 border-sky-600 w-full mt-2"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
