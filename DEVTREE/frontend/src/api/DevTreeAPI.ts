import axios from "axios";
import api from "../config/axios";
import type { ProfileForm, User } from "../types";

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

export async function updateProfile(user: ProfileForm) {
  try {
    const { data } = await api.patch<{ message: string }>(`/api/user`, user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
}
