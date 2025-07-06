import axios from "axios";
import api from "../config/axios";
import type { User } from "../types";

export async function getUser() {
  try {
    const { data } = await api.get<User>(`/api/user`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
       throw new Error(error.response?.data.error);
    }
  }
}
