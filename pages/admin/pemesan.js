import React from 'react'
import { useEffect, useState } from "react";

export default function Pemesan() {
  const [dataPemesan, setDataPemesan] = useState([]);
  const [aksi, setAksi] = useState("tambah");
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [pemesanId, setPemesanId] = useState("");
  const fetchPemesan = async () => {
    try {
      const resPemesan = await fetch("http://localhost:1323/pemesan");
      const jsonPemesan = await resPemesan.json();
      setDataPemesan(jsonPemesan.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchPemesan();
  }, []);

  const delPemesan = async (id, nama) => {
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
        await fetch("http://localhost:1323/pemesan", requestOptions);
        fetchPemesan()
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const addPemesan = async () => {
    var formdata = new FormData();
    formdata.append("nama", nama);
    formdata.append("kontak", kontak);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      await fetch("http://localhost:1323/pemesan", requestOptions);
      fetchPemesan();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const tambahPemesan = async () => {
    setAksi("tambah");
    setNama("");
    setKontak("");
  };

  const ubahPemesan = async (id, nama, kontak) => {
    setAksi("ubah");
    setPemesanId(id)
    setNama(nama);
    setKontak(kontak);
  };

  const editPemesan = async () => {
    var formdata = new FormData();
    formdata.append("id", pemesanId);
    formdata.append("nama", nama);
    formdata.append("kontak", kontak);

    var requestOptions = {
      method: "PUT",
      body: formdata,
      redirect: "follow",
    };

    try {
      await fetch("http://localhost:1323/pemesan", requestOptions);
      fetchPemesan();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border border-white bg-white p-3 col-span-2 h-fit shadow-lg shadow-gray-400">
        <div className="flex justify-between mb-1 pb-1 border-b border-sky-300">
          <div className="text-sky-400 font-medium">MANAJEMEN PEMESAN</div>
          <button
            onClick={(e) => tambahPemesan()}
            className="btn bg-sky-500 border-sky-600 hover:bg-sky-600 px-2"
          >
            Tambah
          </button>
        </div>
        <table className="table-fixed w-full">
          <tbody>
            {dataPemesan?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td>{item.nama}</td>
                <td className="text-center">{item.kontak}</td>
                <td className="flex justify-end gap-2 py-1">
                  <button
                    onClick={(e) =>
                      ubahPemesan(item.id, item.nama, item.kontak)
                    }
                    className="btn bg-orange-500 hover:bg-orange-600 border-orange-600"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={(e) => delPemesan(item.id, item.nama)}
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
            Tambah Data Pemesan
          </div>
          <div className="mb-2">
            <div className="mb-1 text-gray-500">Nama Pemesan</div>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1"
            />
          </div>
          <div className="mb-2">
            <div className="mb-1 text-gray-500">Kontak Pemesan</div>
            <input
              value={kontak}
              onChange={(e) => setKontak(e.target.value)}
              className="px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1 w-full"
            />
          </div>
          <button
            onClick={addPemesan}
            type="submit"
            className="btn bg-sky-500 hover:bg-sky-600 border-sky-600 w-full mt-2"
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="border border-white bg-white p-3 h-fit shadow-lg shadow-gray-400">
          <div className="mb-1 pb-1 border-b border-sky-300 text-sky-400 font-medium">
            Ubah Data Pemesan
          </div>
          <div className="mb-2">
            <div className="mb-1 text-gray-500">Nama Pemesan</div>
            <input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1"
            />
          </div>
          <div className="mb-2">
            <div className="mb-1 text-gray-500">Kontak Pemesan</div>
            <input
              value={kontak}
              onChange={(e) => setKontak(e.target.value)}
              className="px-2 py-1 border border-gray-300 focus:outline-none focus:ring-sky-400 focus:ring-1 w-full"
            />
          </div>
          <button
            onClick={editPemesan}
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
