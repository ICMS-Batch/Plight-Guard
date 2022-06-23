import axios from "axios";

class Api {
  constructor(setToken = false) {
    this.axiosFunction = axios.create({
      baseURL: "http://localhost:8000",
    });

    if (setToken) {
      this.setLocalStorageToken();
    }
  }

  setLocalStorageToken() {
    this.axiosFunction.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] =
          "Bearer " + localStorage.getItem("accessToken");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get = async (url, data) => {
    const res = await this.axiosFunction.get(url, { params: data });
    return res.data;
  };

  post = async (url, data, headers) => {
    const res = await this.axiosFunction.post(url, data, { headers });
    return res.data;
  };
}

export default Api;
