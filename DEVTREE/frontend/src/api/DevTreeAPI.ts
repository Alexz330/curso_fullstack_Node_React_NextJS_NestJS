import axios from "axios";
import api from "../config/axios";
import type { ProfileForm, User, UserHandle } from "../types";

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

export async function updateProfile(user: User) {
  try {
    const { data } = await api.patch<{ message: string }>(`/api/user`, user);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
}


export async function uploadImage(image: File) {
  let formData =  new FormData();
  formData.append("file", image);

  try {
    const { data } = await api.post<{ image: string }>(`/api/user/image`, formData);
    console.log(data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function getUserByHandle(handle: string) {
  try {
    const { data } = await api.get<UserHandle>(`/api/${handle}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
}