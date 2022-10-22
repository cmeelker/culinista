import axios from "@/services/ApiClient";

export async function getUserName(userId: string) {
  const { data } = await axios.get(`/User?userId=${userId}`);

  return data;
}
