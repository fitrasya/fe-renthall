import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { logOut } from "@/pages/helper";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState([]);
  const router = useRouter();

  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000);
  const expirationDateString = expirationDate.toUTCString();

  useEffect(() => {
    logOut();
  }, [])
  

  const getProfile = async (id) => {
    const res = await fetch(`http://localhost:1323/pemesan/${id}`);
    const json = await res.json();
    setProfile(json.data);
    return true;
  };

  const logIn = async () => {
    if (username === "admin") {
      if (password === "admin") {
        document.cookie = `login=admin; expires=${expirationDateString}; path=/`;
        router.push(`/admin`);
      } else {
        alert("Login gagal.");
      }
    } else {
      try {
        if (password === profile.kontak) {
          document.cookie = `login=${profile.id}; expires=${expirationDateString}; path=/`;
          router.push(`/`);
        }
      } catch (error) {
        alert("Login gagal");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      <div className="max-w-md p-2 shadow-lg shadow-gray-400 w-80 bg-white">
        <div className="border-sky-400 border p-8">
          <div className="text-xl text-center text-sky-400">
            <span className="border-b border-b-sky-400 pb-2">Login Form</span>
          </div>
          <div className="my-10">
            <div className="mb-4">
              <label className="block mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={(e) => getProfile(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-sky-500 focus:ring-1"
              />
            </div>
            <div className="">
              <label className="block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 focus:outline-none focus:ring-sky-500 focus:ring-1"
              />
            </div>
          </div>
          <button
            onClick={(e) => logIn()}
            className="w-full btn bg-sky-400 border-b-sky-500"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}
