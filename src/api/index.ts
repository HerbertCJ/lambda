import axios from "axios";
import { User } from "oidc-client";

const BASE_URL = import.meta.env.VITE_API_URL;
const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_AUTHORITY;
const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;

const api = axios.create({
  baseURL: BASE_URL,
});

function getOidcUser() {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${COGNITO_DOMAIN}:${CLIENT_ID}`
  );
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}

api.interceptors.request.use((config) => {
  const user = getOidcUser();
  const token = user?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default api;
