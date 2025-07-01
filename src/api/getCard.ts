import axios from "axios";
import { API_URL } from "../config/configs";
import { Card } from "../types/card";

export function useCardService() {
  // Retrieves the access token from localStorage
  const getAccessToken = () => {
    return localStorage.getItem("choreo_access_token");
  };

  const getCards = async (): Promise<Card[]> => {
    try {
      const token = getAccessToken();
      const response = await axios.get<Card[]>(`${API_URL}/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cards:", error);
      throw error;
    }
  };

  return { getCards };
}
