import axios from 'axios';
import { API_URL } from "../../config/configs";
export interface StudentEmployerSupervisor {
    student_id: number;
    student_first_name: string;
    student_last_name: string;
    employer_name: string | null;
    employer_contact_number: string | null;
    supervisor_first_name: string | null;
    supervisor_last_name: string | null;
    supervisor_contact_number: string | null;
}

export async function getManagementTable(): Promise<StudentEmployerSupervisor[]> {

    const response = await axios.get<StudentEmployerSupervisor[]>(
        `${API_URL}/management`,
        {
            headers: {
                "accept": "application/json",
                "api-key": import.meta.env.VITE_API_KEY,
            }
        }
    );
    return response.data;
}