import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../@/components/ui/card"
import {formatRelativeTime }from "../../@/components/TimeFormat"
import {formatEnumLabel} from "../../@/components/EnumFormat"
import type { Job } from "@/types/Job"

import { FaBookmark } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { ImClock } from "react-icons/im";
import { GrEmptyCircle } from "react-icons/gr";
import { SiAgentskills } from "react-icons/si";

const JobCard = ({
    id,
    title,
    companyName,
    location,
    compensation,
    empType,
    workType,
    vacancies,
    createdAt,
    expRange,
    deadLine
} : Job ) => {

    const date = createdAt? new Date(createdAt).toISOString().split("T")[0]: createdAt;
    const ddate = deadLine? new Date(deadLine).toISOString().split("T")[0]: deadLine;

    return (
        <div className="w-full h-full hover:-translate-y-2 transition-all ease-in-out hover:z-10 ">
            <Card key={id} className="groupcursor-pointer  font-poppins w-full h-full bg-[#161b22] ">
                <CardHeader>
                    <CardTitle className="text-xl text-[#e6edf3]  flex items-start font-poppins ">{title}</CardTitle>
                    <CardDescription className="gap-2 text-[#8b949e]  flex items-start flex-col">
                         <p>{companyName}</p>
                                                 {createdAt && (
                            <span className="flex items-center gap-1"><ImClock className="text-green-600"/> <p>{formatRelativeTime(date)}</p></span>
                        )}
                    </CardDescription>
                    <CardAction>
                        <button className="rounded-full hover:-translate-y-1  text-white cursor-pointer hover:text-yellow-500"><FaBookmark /></button>
                    </CardAction>
                </CardHeader>
                <CardContent className="flex flex-col">
                    <span className="flex  gap-1 text-xl text-[#e6edf3] items-center">
                        <FaRupeeSign /> {compensation}/yr 
                        
                    </span>
                    <div className=" flex  gap-3 mt-[4%] text-md">
                        <span className="flex items-center hover:-translate-y-1 transition-all ease-in-out gap-1 bg-[#e6edf3]/30 rounded-md border-[#e6edf3]/50 border p-1"><MdLocationPin className="text-amber-500" /> <p>{location}</p></span>
                        <span className="flex items-center hover:-translate-y-1 transition-all ease-in-out gap-1 bg-[#e6edf3]/30 rounded-md border-[#e6edf3]/50 border p-1"><MdWorkHistory className="text-green-600"/> <p>{formatEnumLabel(workType)}</p></span>
                        <span className="flex items-center hover:-translate-y-1 transition-all ease-in-out gap-1 bg-[#e6edf3]/30 rounded-md border-[#e6edf3]/50 border p-1"><BsFillSuitcaseLgFill className="text-blue-700"/> <p>{formatEnumLabel(empType)}</p></span>

                        {vacancies && (
                            <span className="flex items-center hover:-translate-y-1 transition-all ease-in-out gap-1 bg-[#e6edf3]/30 rounded-md border-[#e6edf3]/50 border p-1"><GrEmptyCircle className="text-red-400"/> <p>{vacancies}</p></span>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="gap-2 flex justify-between">
                         <p className="flex gap-1 items-center text-md text-white"><SiAgentskills /> {formatEnumLabel(expRange)}</p>
                        <span className="text-white items-center flex gap-1"> 
                            <ImClock className="text-red-500"/>
                            <p>Apply</p>
                            {formatRelativeTime(ddate)}
                        </span>
                </CardFooter>
            </Card>
        </div>
    )

}

export default JobCard