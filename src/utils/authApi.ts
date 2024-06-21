import { AUTH_URL } from "./consts";

export const register = (email: string, password: string) => {
  return fetch(`${AUTH_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};
export const authorize = (email: string, password: string) => {
  return fetch(`${AUTH_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    });
};
export const checkToken = (token: string) => {
  return fetch(`${AUTH_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};

