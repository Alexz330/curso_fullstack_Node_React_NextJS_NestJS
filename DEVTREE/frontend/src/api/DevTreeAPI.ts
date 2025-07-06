import axios from "axios";
import api from "../config/axios";

export async function getUser() {
  try {
    const { data } = await api.get(`/api/user`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
       throw new Error(error.response?.data.error);
    }
  }
}
