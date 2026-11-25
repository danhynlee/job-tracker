"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export default function AddJobForm() {
  const router = useRouter();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const res = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, role }),
    });

    if (!res.ok) {
      setError(`Failed to add job (${res.status})`);
      return;
    }
    setCompany("");
    setRole("");
    router.refresh(); // re-runs the server component so the list updates
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 rounded border p-2"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <input
        className="flex-1 rounded border p-2"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <button type="submit" className="rounded bg-black px-4 py-2 text-white">
        Add
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}