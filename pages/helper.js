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