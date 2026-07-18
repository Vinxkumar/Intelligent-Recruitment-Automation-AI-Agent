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
} from "../../@/components/ui/select"


import { Input } from "../../@/components/ui/input";
import { Label } from "../../@/components/ui/label";
import { Textarea } from "../../@/components/ui/textarea";


const NewJobForm = () => {



  return (
    <div className="w-full flex items-center justify-center h-full border-0">
      <Card className="w-[80%] flex border-0  justify-center h-full">
        <CardHeader>
          <CardTitle>New Job POST</CardTitle>
          <CardDescription>
            Enter your job details without complications
          </CardDescription>
          <CardAction>
            <Button variant="link" className={"text-black cursor-pointer "}>
              Create Company Account
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex w-full flex-col gap-6">
              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="companyName">Company Name  <span className="text-red-600">*</span></Label>
                  <Input id="companyName" placeholder="Google LLC" required />
                </div>

                <div className="w-[50%]">
                  <Label htmlFor="email">Company Email  <span className="text-red-600">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
              </div>
              {/* <Separator/> */}
              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="title">Role  <span className="text-red-600">*</span></Label>
                  <Input id="title" placeholder="Software Engineer" required />
                </div>

                <div className="w-[50%]">
                  <Label htmlFor="location">location </Label>
                  <Input id="location" placeholder="Banglore, Noida" required />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="pQualification">Prefered Qualification  <span className="text-red-600">*</span></Label>
                  <Textarea
                    id="job-description"
                    placeholder="A Master's degree (M.Tech, MCA, or M.Sc) in Computer Science, or equivalent advanced certifications."
                    rows={6}
                    required
                  />
                </div>

                <div className="w-[50%]">
                  <Label htmlFor="mQualification">Minimum Qualification</Label>
                  <Textarea
                    id="mQualification"
                    placeholder="4-year Bachelor of Technology (B.Tech) or Bachelor of Science (B.Sc) in Computer Science"
                    rows={6}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-full">
                  <Label htmlFor="jd">job description</Label>
                  <Textarea
                    id="jd"
                    placeholder="We are seeking a versatile and proactive Software Engineer to design, develop, test, and deploy high-quality software solutions."
                    rows={6}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="compensation">compensation </Label>
                  <Input
                    id="compensation"
                    placeholder="800000 LPA"
                    required={true}
                  />
                </div>

                <div className="w-[50%]">
                  <Label htmlFor="Experience">Experience  <span className="text-red-600">*</span></Label>
                  <Select required>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Experience</SelectLabel>
                        <SelectItem value="FRESHER">Freshor</SelectItem>
                        <SelectItem value="JUNIOR">Junior</SelectItem>
                        <SelectItem value="INTERMEDIATE">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="SENIOR">Senior</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="tech stack">tech stack  <span className="text-red-600">*</span></Label>
                  <Textarea
                    id="techStack"
                    placeholder="React, SpringBoot, Java, TypeScript, TailwindCSS PostgreSQL"
                    rows={6}
                  />
                </div>

                <div className="w-[50%]">
                  <Label htmlFor="empType">Employment Type  <span className="text-red-600">*</span></Label>
                  <Select>
                    <SelectTrigger className="w-full ">
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
                </div>
              </div>

                <div className="flex gap-2">
                <div className="w-[50%]">
                  <Label htmlFor="Vacancies">Vacancies</Label>
                  <Input
                    id="Vacancies"
                    placeholder="2"
                  />
                </div>

                <div className="w-[50%]">
                  <Label className="flex gap-0.5" htmlFor="work type">work Type <span className="text-red-600">*</span> </Label>
                  <Select required>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>work type</SelectLabel>
                        <SelectItem value="ON_SITE">On-Site</SelectItem>
                        <SelectItem value="REMOTE">Remote</SelectItem>
                        <SelectItem value="HYBRID">
                          Hybrid
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="bg-black cursor-pointer  hover:-translate-y-1 hover:rounded-xl hover:bg-gray-900/90 text-white w-[50%]">
            post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewJobForm;
