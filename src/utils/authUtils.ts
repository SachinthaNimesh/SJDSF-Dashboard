// Remove this
// Utility for authentication actions and user info management
import Cookies from "js-cookie";

export function login() {
  window.location.href = "/auth/login";
}

export function logout() {
  const sessionHint = Cookies.get("session_hint");
  window.location.href = `/auth/logout?session_hint=${sessionHint}`;
}

export function getUserInfoFromCookie() {
  const encodedUserInfo = Cookies.get("userinfo");
  if (encodedUserInfo) {
    try {
      const userInfo = JSON.parse(atob(encodedUserInfo));
      Cookies.remove("userinfo", { path: "/" });
      return userInfo;
    } catch (e) {
      Cookies.remove("userinfo", { path: "/" });
      return null;
    }
  }
  return null;
}

export async function getUserInfoFromEndpoint() {
  try {
    const response = await fetch("/auth/userinfo");
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch {
    return null;
  }
}

export async function performGet(url) {
  try {
    const response = await fetch(url);
    if (response.status === 401) {
      window.location.href = "/auth/login";
    }
    return response;
  } catch (error) {
    throw error;
  }
}
