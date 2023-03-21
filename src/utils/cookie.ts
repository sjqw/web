export function getCookie(cookieName: string) {
  const strCookie = document.cookie;
  const cookieList = strCookie.split(";");

  for (let i = 0; i < cookieList.length; i++) {
    const arr = cookieList[i].split("=");
    if (cookieName === arr[0].trim()) {
      return arr[1];
    }
  }
  return "";
}

export function delCookie(name: string) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp["toGMTString"]();
  }
}
