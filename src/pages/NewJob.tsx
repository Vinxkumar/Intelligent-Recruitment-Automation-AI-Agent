import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../../@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";

import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { Textarea } from "../../@/components/ui/textarea";

import type { Job } from "../types/Job";
import newJobs from "@/services/newJob";
import AlertMsg from "@/context/Alert";

// ---- Schema --------------------------------------------------------------
// Field names/enum values here are deliberately identical to the Job
// interface, including the "JOUINUER" typo in experience — fix that at the
// source (the enum, likely shared with your Spring Boot backend) rather
// than patching around it here, since it'll otherwise cause a mismatch
// between what the UI shows and what the DB/API actually stores.

const jobFormSchema = z.object({
  title: z.string().min(2, "Role is required"),
  companyName: z.string().min(2, "Company name is required"),
  companyEmail: z.string().email("Enter a valid email"),
  pQualification: z.string().min(1, "Preferred qualification is required"),
mQualification: z.string().min(1, "Minimum qualification is required"),
jd: z.string().optional(),
  // Raw comma-separated input from the textarea; split into string[] in
  // onSubmit before being sent, to match the backend's List<String>.
  techStackInput: z.string().min(1, "Tech stack is required"),
  experience: z.enum(["FRESHER", "JOUINUER", "INTERMEDIATE", "SENIOR"], {
    error: "Select an experience level",
  }),
  location: z.string().optional(),
  compensation: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9,]+$/.test(val), {
      message: "Use numbers only, e.g. 800000",
    }),
  empType: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT"], {
    error: "Select an employment type",
  }),
  workType: z.enum(["ON_SITE", "REMOTE", "HYBRID"], {
    error: "Select a work type",
  }),
  vacancies: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]+$/.test(val), {
      message: "Vacancies must be a number",
    }),
  deadLine: z.string().optional(), // <input type="date"> gives "YYYY-MM-DD" — sent as-is, matches java.util.Date/LocalDate cleanly
});

type JobFormValues = z.infer<typeof jobFormSchema>;

// ---- Component -------------------------------------------------------

interface NewJobFormProps {
  onSubmitJob?: (job: Job) => Promise<void> | void;
}

const NewJobForm = ({ onSubmitJob }: NewJobFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [Submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    // Seeding every field — especially the three Select-backed enums — with
    // a defined value on first render. Without this, field.value starts as
    // `undefined` (uncontrolled) and flips to a string once picked
    // (controlled), which is what triggers the Base UI warning.
    defaultValues: {
      title: "",
      companyName: "",
      companyEmail: "",
      pQualification: "",
      mQualification: "",
      jd: "",
      techStackInput: "",
      experience: "" as JobFormValues["experience"],
      location: "",
      compensation: "",
      empType: "" as JobFormValues["empType"],
      workType: "" as JobFormValues["workType"],
      vacancies: "",
      deadLine: "",
    },
  });

  const onSubmit = async (data: JobFormValues) => {
    setSubmitError(null);
    setIsSubmitting(true);

    const job: Job = {
      title: data.title,
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      pQualification: data.pQualification,
      mQualification: data.mQualification,
      jd: data.jd || undefined,
      techStack: data.techStackInput
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean),
      experience: data.experience,
      location: data.location || undefined,
      compensation: data.compensation || undefined,
      empType: data.empType,
      workType: data.workType,
      vacancies: data.vacancies || undefined,
      deadLine: data.deadLine || undefined,
    };

    try {
      if (onSubmitJob) {
        await onSubmitJob(job);
      } else {
        setIsSubmitting(true)
        const res = await newJobs(job);
        if(res!=null) {
          setSubmitted(true);
        }
      }
      reset();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
  setSubmitted(false);
}, 5000);
    }
  };

  // if(Submitted) {
  //   return(

  //   )
  // } 
 
  return (
    <div className="w-full flex items-center justify-center h-full border-0">
      {Submitted && (
        <div className="relative z-10 top-0 right-0">
          <AlertMsg msg="Job Post Successfull" />
        </div>
      )}
      <Card className="w-[80%] flex border-0 justify-center h-full">
        <CardHeader>
          <CardTitle>New Job POST</CardTitle>
          <CardDescription>
            Enter your job details without complications
          </CardDescription>
          <CardAction>
            <Button variant="link" className="text-black cursor-pointer">
              Create Company Account
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex w-full flex-col gap-6">
              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="companyName">
                    Company Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Google LLC"
                    {...register("companyName")}
                    required
                  />
                  {errors.companyName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>

                <div className="w-[50%]">
                  <Label htmlFor="companyEmail">
                    Company Email <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    placeholder="m@example.com"
                    {...register("companyEmail")}
                    required

                  />
                  {errors.companyEmail && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.companyEmail.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="title">
                    Role <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Software Engineer"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="w-[50%]">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Bangalore, Noida"
                    {...register("location")}
                  />
                  {errors.location && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="pQualification">
                    Preferred Qualification{" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="pQualification"
                    placeholder="A Master's degree (M.Tech, MCA, or M.Sc) in Computer Science, or equivalent advanced certifications."
                    rows={6}
                    {...register("pQualification")}
                  />
                  {errors.pQualification && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.pQualification.message}
                    </p>
                  )}
                </div>

                <div className="w-[50%]">
                  <Label htmlFor="mQualification">Minimum Qualification</Label>
                  <Textarea
                    id="mQualification"
                    placeholder="4-year Bachelor of Technology (B.Tech) or Bachelor of Science (B.Sc) in Computer Science"
                    rows={6}
                    {...register("mQualification")}
                    required

                  />
                    {errors.mQualification && (
    <p className="text-red-600 text-sm mt-1">
      {errors.mQualification.message}
    </p>
  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-full">
                  <Label htmlFor="jd">Job Description</Label>
                  <Textarea
                    id="jd"
                    placeholder="Kindly Provide additional information about the job"
                    rows={6}
                    {...register("jd")}
                  />

                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="compensation">Compensation (LPA)</Label>
                  <Input
                    id="compensation"
                    placeholder="800000"
                    inputMode="numeric"
                    {...register("compensation")}
                  />
                  {errors.compensation && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.compensation.message}
                    </p>
                  )}
                </div>

                <div className="w-[50%]">
                  <Label htmlFor="experience">
                    Experience <span className="text-red-600">*</span>
                  </Label>
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="experience" className="w-full">
                          <SelectValue placeholder="experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Experience</SelectLabel>
                            <SelectItem value="FRESHER">Fresher</SelectItem>
                            {/* value matches the Job interface's "JOUINUER" typo — fix in the shared enum, not here */}
                            <SelectItem value="JOUINUER">Junior</SelectItem>
                            <SelectItem value="INTERMEDIATE">
                              Intermediate
                            </SelectItem>
                            <SelectItem value="SENIOR">Senior</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.experience && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="techStackInput">
                    Tech Stack <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="techStackInput"
                    placeholder="React, SpringBoot, Java, TypeScript, TailwindCSS, PostgreSQL"
                    rows={6}
                    {...register("techStackInput")}
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Comma-separated list
                  </p>
                  {errors.techStackInput && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.techStackInput.message}
                    </p>
                  )}
                </div>

                <div className="w-[50%]">
                  <Label htmlFor="empType">
                    Employment Type <span className="text-red-600">*</span>
                  </Label>
                  <Controller
                    name="empType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="empType" className="w-full">
                          <SelectValue placeholder="Employment Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Employment Type</SelectLabel>
                            <SelectItem value="FULL_TIME">Full Time</SelectItem>
                            <SelectItem value="PART_TIME">Part Time</SelectItem>
                            <SelectItem value="INTERNSHIP">
                              Internship
                            </SelectItem>
                            <SelectItem value="CONTRACT">Contract</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.empType && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.empType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="vacancies">Vacancies</Label>
                  <Input
                    id="vacancies"
                    placeholder="2"
                    inputMode="numeric"
                    {...register("vacancies")}
                  />
                  {errors.vacancies && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.vacancies.message}
                    </p>
                  )}
                </div>

                <div className="w-[50%]">
                  <Label className="flex gap-0.5" htmlFor="workType">
                    Work Type <span className="text-red-600">*</span>
                  </Label>
                  <Controller
                    name="workType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="workType" className="w-full">
                          <SelectValue placeholder="work type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Work Type</SelectLabel>
                            <SelectItem value="ON_SITE">On-Site</SelectItem>
                            <SelectItem value="REMOTE">Remote</SelectItem>
                            <SelectItem value="HYBRID">Hybrid</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.workType && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.workType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="deadLine">Application Deadline</Label>
                  <Input id="deadLine" type="date" {...register("deadLine")} />
                  {errors.deadLine && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.deadLine.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <CardFooter className="flex-col gap-2 px-0 pt-6">
              {submitError && (
                <p className="text-red-600 text-sm w-[50%] text-center">
                  {submitError}
                </p>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black cursor-pointer hover:-translate-y-1 hover:rounded-xl hover:bg-gray-900/90 text-white w-[50%] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewJobForm;