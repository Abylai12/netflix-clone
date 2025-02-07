import axios from "axios";
import { apiURL } from "./api-url";

const axiosInstance = axios.create({
  baseURL: `${apiURL}`,
  withCredentials: true, // Send cookies to the server
});
export default axiosInstance;
