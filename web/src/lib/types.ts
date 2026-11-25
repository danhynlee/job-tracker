export type JobStatus = "applied" | "interviewing" | "offer" | "rejected";

export interface Job {
  id: number;
  company: string;
  role: string;
  status: JobStatus;
  applied_date: string;
}