import apiClient from "@/api/AxiosApi";
import type { Job } from "@/types/Job";


const getJobs = async(): Promise<Job[]> => {
    const res = await apiClient.get<Job[]> (
        "/job"
    )
    return res.data
}

export default getJobs


