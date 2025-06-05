import axios from "axios";
import { API_URL } from "../../config/configs";
import { Card } from "../types/card";

export function useCardService() {
    const getCards = async (): Promise<Card[]> => {
        try {
            const response = await axios.get<Card[]>(`${API_URL}/dashboard`);
            return response.data;
        } catch (error) {
            console.error("Error fetching cards:", error);
            throw error;
        }
    };

    return { getCards };
}