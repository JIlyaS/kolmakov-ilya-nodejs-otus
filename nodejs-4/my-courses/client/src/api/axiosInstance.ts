import axios from "axios";

// import config from "@src/config";

const apiInstance = axios.create({
  // baseURL: `${config.apiBaseURL}`,
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export { apiInstance };
