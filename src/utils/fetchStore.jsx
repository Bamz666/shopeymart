import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetchStores = async () => {
  try {
    const response = await api.get("/store/v1");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching store:", error);
    throw error;
  }
};

const deleteStore = async (id) => {
  try {
    const response = await api.delete(`/store/v1/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { fetchStores, deleteStore };
