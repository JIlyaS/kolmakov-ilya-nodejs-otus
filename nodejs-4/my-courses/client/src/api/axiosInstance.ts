import axios from "axios";

// import config from "@src/config";

const config = {
  // baseURL: `${config.apiBaseURL}`,
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token") ? localStorage.getItem("token") : ""}`
  }
};

if (Boolean(localStorage.getItem("token"))) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
}

const apiInstance = axios.create(config);

export { apiInstance };
