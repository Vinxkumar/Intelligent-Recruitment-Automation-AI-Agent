import type { Job } from "@/types/Job";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../../@/components/ui/dialog";
import { Button } from "../../../@/components/ui/button";
import { formatEnumLabel } from "../../../@/components/EnumFormat"; // adjust path
import { formatRelativeTime } from "../../../@/components/TimeFormat"; // adjust path

interface JobViewModalProps extends Job {
  trigger: ReactNode; // whatever element should open this modal, e.g. <JobCard {...job} />
  onApply?: () => void;
}

const JobViewModal = ({
  title,
  companyName,
  companyEmail,
  pQualification,
  mQualification,
  jd,
  expRange,
  techStack,
  location,
  compensation,
  empType,
  workType,
  vacancies,
  deadLine,
  createdAt,
  trigger,
  onApply,
}: JobViewModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>
            {companyName}
            {companyEmail ? ` · ${companyEmail}` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex gap-4 flex-wrap">
            <span>
              <strong>Compensation:</strong> ₹{compensation}/yr
            </span>
            {vacancies && (
              <span>
                <strong>Vacancies:</strong> {vacancies}
              </span>
            )}
          </div>

          <div className="flex gap-4 flex-wrap">
            {location && (
              <span>
                <strong>Location:</strong> {location}
              </span>
            )}
            <span>
              <strong>Work Type:</strong> {formatEnumLabel(workType)}
            </span>
            <span>
              <strong>Employment:</strong> {formatEnumLabel(empType)}
            </span>
            <span>
              <strong>Experience: {formatEnumLabel(expRange)}</strong> 
            </span>
          </div>

          {deadLine && (
            <span>
              <strong>Apply by:</strong>{" "}
              {new Date(deadLine).toLocaleDateString()} (
              {formatRelativeTime(deadLine)})
            </span>
          )}

          {createdAt && (
            <span className="text-gray-500">
              Posted {formatRelativeTime(createdAt)}
            </span>
          )}

          <div>
            <strong>Preferred Qualification</strong>
            <p className="text-gray-600">{pQualification}</p>
          </div>

          {mQualification && (
            <div>
              <strong>Minimum Qualification</strong>
              <p className="text-gray-600">{mQualification}</p>
            </div>
          )}

          {jd && (
            <div>
              <strong>Job Description</strong>
              <p className="text-gray-600 whitespace-pre-line">{jd}</p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={onApply}
            className="bg-black text-white cursor-pointer hover:bg-gray-900/90"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobViewModal;