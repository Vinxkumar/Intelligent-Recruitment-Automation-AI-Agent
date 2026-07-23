import apiClient from "@/api/AxiosApi";
import type { Job } from "@/types/Job";


const newJobs = async(job: Job) => {
    const res = await apiClient.post (
        "/job", job, {timeout: 30000}
    )
    return res.data
}

export default newJobs