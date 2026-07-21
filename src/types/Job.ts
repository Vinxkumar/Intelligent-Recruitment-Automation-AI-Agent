export interface Job {
  id?: number;
  title: string;
  companyName: string;
  companyEmail: string;
  pQualification: string;
  mQualification?: string;
  jd?: string;
  techStack: string[];              // was TechStack[]
  expRange: "FRESHER" | "JUNIOR" | "INTERMEDIATE" | "SENIOR";
  location?: string;
  compensation?: string;
  empType: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT";
  workType: "ON_SITE" | "REMOTE" | "HYBRID";
  vacancies?: string;
  deadLine?: string | number; 
  createdAt? :string | number;               // was Date — send as "YYYY-MM-DD" to match java.util.Date cleanly
}