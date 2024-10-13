import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: "https://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${process.env.BASIC}`,
  },
};

const pagarmeApi = axios.create(config);

export default pagarmeApi;
