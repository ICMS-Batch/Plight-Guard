import Api from "./AxiosService";

const UserService = {
  login: async (credentials) => {
    const api = new Api();
    const apiResponse = await api.post("users/login", credentials);
    localStorage.setItem("accessToken", apiResponse.details.access);
    return apiResponse;
  },
  register: async (credentials) => {
    const api = new Api();
    const apiResponse = await api.post("users/register", credentials);
    return apiResponse;
  },
};

export default UserService;
