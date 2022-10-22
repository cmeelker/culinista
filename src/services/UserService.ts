import axios from "@/services/ApiClient";

export async function getUserName(userId: string) {
  let userName = "Joop";

  try {
    const { data } = await axios.get(`/User?userId=${userId}`);
    userName = data;
  } catch (error) {
    console.log(error);
  }

  return userName;
}
