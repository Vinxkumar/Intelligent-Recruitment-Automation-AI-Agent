
interface TechStack {
    name: string
}

export interface Job {
    id?: number,
    title: string,
    companyName: string,
    companyEmail: string,
    pQualification: string,
    mQualification?: string,
    jd?:string,
    techStack: TechStack[],
    experience: "FRESHER" | "JOUINUER" | "INTERMEDIATE" | "SENIOR",
    location?: string,
    compensation?: string,
    empType: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "CONTRACT",
    workType: "ON_SITE" |"REMOTE" | "HYBRID"
    vacancies?: string
    deadLine?:Date
}
