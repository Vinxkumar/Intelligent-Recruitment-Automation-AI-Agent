import getJobs from "@/services/getJobs";
import { useEffect, useState } from "react";
import type { Job } from "@/types/Job";

const Home = () => {

    const [job, setJob] = useState<Job[]>([]);

    useEffect(() => {
        const fetchJob = async ()=> {
            const data = await getJobs();
            setJob(data)
        }
        fetchJob()
    }, [])

    return (
        <>
<div className="grid grid-cols-3 gap-4">
    {job.map((jb, idx) => (
        <div key={idx} className="border p-4 rounded-lg">
            <h2>{jb.title}</h2>
            <p>{jb.companyName}</p>
            <p>{jb.companyEmail}</p>
            <p>{jb.pQualification}</p>
            <p>{jb.techStack}</p>
        </div>
    ))}
</div>
        </>
    )
}

export default Home