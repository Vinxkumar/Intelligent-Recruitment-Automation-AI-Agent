import getJobs from "@/services/getJobs";
import { useEffect, useState } from "react";
import type { Job } from "@/types/Job";


import Loader from "../assets/ui/Loader"

const Home = () => {

  const [job, setJob] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean | null>();
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const data = await getJobs();
        setJob(data);
        // setLoading(false);
      } catch (error) {
        setError("Failed to load Jobs" + error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, []);


  if (loading) {
    return (
      <div className="w-full h-full min-h-[50vh] flex items-center justify-center">
        <div className=" text-lg font-medium text-gray-500">
          <Loader/>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full min-h-[50vh] flex items-center justify-center">
        <div className="text-red-600 text-lg font-medium ">
          {error}
        </div>
      </div>
    );
  }


  return (
    <div className="w-full  h-full">

      {loading && (
              <div className="w-full h-full min-h-[50vh] flex items-center justify-center">
        <div className=" text-lg font-medium text-gray-500">
          <Loader />
        </div>
      </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {job &&
          job.map((jb, idx) => (
            <div key={idx} className="border p-4 rounded-lg">
              <h2>{jb.title}</h2>
              <p>{jb.companyName}</p>
              <p>{jb.companyEmail}</p>
              <p>{jb.pQualification}</p>
              <p>{jb.techStack}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
