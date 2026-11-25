import type { Job } from "@/lib/types";
import AddJobForm from "./AddJobForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${API_URL}/jobs`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load jobs: ${res.status}`);
  return res.json();
}

export default async function Home() {
  const jobs = await getJobs();

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Job Tracker</h1>
      <AddJobForm />
      <ul className="mt-8 space-y-2">
        {jobs.map((job) => (
          <li key={job.id} className="rounded border p-3">
            <span className="font-semibold">{job.company}</span> — {job.role}
            <span className="ml-2 text-sm text-gray-500">
              {job.status} · {job.applied_date}
            </span>
          </li>
        ))}
      </ul>
      {jobs.length === 0 && <p className="mt-8 text-gray-500">No applications yet.</p>}
    </main>
  );
}