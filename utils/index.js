import { deleteCookie, setCookie } from "cookies-next";
import { getCookie } from "cookies-next";

export const isBrowser = () => {
  return typeof window !== "undefined";
};

export const nextLocalStorage = () => {
  if (isBrowser()) {
    return window.localStorage;
  }
};

export function setCookies(name, value, days = 1) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  setCookie(name, value, {
    path: "/",
    secure: true,
  });
}

export function getCookies(name) {
  const cookie = getCookie(name);
  return name ? cookie : null;
}

export function deleteCookies(name) {
  deleteCookie(name);
  return;
}
