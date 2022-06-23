import Api from "./AxiosService";

const ReportService = {
  create: async (report) => {
    const api = new Api(true);
    const apiResponse = await api.post("reports/create", report);
    return apiResponse;
  },
  getAll: async () => {
    const api = new Api();
    const apiResponse = await api.get("reports/");
    return apiResponse;
  },
  getCategories: async () => {
    const api = new Api();
    const apiResponse = await api.get("reports/categories");
    return apiResponse;
  },
};

export default ReportService;
