export const getCookie = (name) => {
  if (typeof document === "undefined") return null;

  const cookieString = document.cookie;
  const cookieArray = cookieString.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

export const getProfile = async () => {
  try {
    const res = await fetch(`http://localhost:1323/pemesan/${getCookie("login")}`);
    const json = await res.json();
    return json.data
  } catch (error) {
    return error;
  }
};

export const formatTanggal = (timestamp) => {
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

export const formatDate = (timestamp) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agst", "Sep", "Okt", "Nov", "Des",
  ];
  const dateObj = new Date(timestamp);
  const monthIndex = dateObj.getMonth();
  const formattedDate = `${dateObj.getDate()} ${
    monthIndex === 0 ? monthNames[11] : monthNames[monthIndex - 1]
  } ${dateObj.getFullYear()}`;
  return formattedDate;
}

export const logOut = () => {
  document.cookie = `login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getPesananByIdUser = async () => {
  try {
    const resPesanan = await fetch(
      `http://localhost:1323/pesanan/user/${getCookie("login")}`
    );
    const jsonPesanan = await resPesanan.json();
    return jsonPesanan.data;
  } catch (error) {
    return false
  }
};