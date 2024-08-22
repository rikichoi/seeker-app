import JobInfoViewContainer from "@/components/JobInfoViewContainer";
import JobListingItem from "@/components/JobListingItem";
import { getJobs } from "@/lib/db/job";
import prisma from "@/lib/db/prisma";
import Image from "next/image";

export default async function Home() {
  const jobs = await getJobs();

  return (
    <main className="p-4 max-w-7xl mx-auto flex flex-col gap-12 lg:flex-row min-h-screen justify-between px-24">
      <div className="flex flex-col gap-8 flex-1">
        {jobs.map((job) => (
          <JobListingItem key={job.id} job={job} />
        ))}
      </div>

      <JobInfoViewContainer />
    </main>
  );
}
