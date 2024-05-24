import axios from "axios";

const baseURL = "http://localhost:2000"; //base url is case sensitive don't change it
// const baseURL = "https://g2c-grower-to-consumer.onrender.com"; //base url is case sensitive don't change it

const publicAxios = axios.create({ baseURL });

const privateAxios = axios.create({ baseURL });

privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log(err);
  }
);

export {publicAxios, baseURL, privateAxios};
