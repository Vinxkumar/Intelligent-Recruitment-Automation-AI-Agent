import getJobs from "@/services/getJobs";
import { useEffect, useState } from "react";
import type { Job } from "@/types/Job";
import JobCard from "@/components/JobCard";
import Loader from "../assets/ui/Loader";
import JobViewModal from "@/components/Modal/JobViewModal";

const Opportunities = () => {
  const [job, setJob] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean | null>();
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const data = await getJobs();
        setJob(data);
      } catch (error) {
        setError("Failed to load Jobs " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full bg-[#0d1117] flex items-center justify-center">
        <div className="text-lg font-medium text-gray-500">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full min-h-[50vh] flex items-center justify-center">
        <div className="text-red-600 text-lg font-medium">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full p-[3%] h-full bg-[#0d1117]">
      <div className="grid grid-cols-3 gap-4">
        {job &&
          job.map((jb) => (
            <JobViewModal
              key={jb.id}
              {...jb}
              trigger={
                <div className="cursor-pointer">
                  <JobCard {...jb} />
                </div>
              }
            />
          ))}
      </div>
    </div>
  );
};

export default Opportunities;