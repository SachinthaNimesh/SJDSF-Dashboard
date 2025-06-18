import axios from "axios";
import { API_URL } from "../config/configs";
import { Card } from "../types/card";
import  {appConfig}  from "../config/configs";

// Use import.meta.env for Vite or process.env for Node.js
const API_KEY =
  appConfig.VITE_API_KEY ||
  (typeof process !== "undefined" ? process.env.API_KEY : undefined);

export function useCardService() {
    const getCards = async (): Promise<Card[]> => {
        try {
            const response = await axios.get<Card[]>(`${API_URL}/dashboard`, {
                headers: {
                    "Content-Type": "application/json",
                    "api-key": API_KEY,
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