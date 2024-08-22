import JobInfoViewContainer from "@/components/JobInfoViewContainer";
import JobListingItem from "@/components/JobListingItem";
import { getJobs } from "@/lib/db/job";
import prisma from "@/lib/db/prisma";
import Image from "next/image";

async function removeJob(id: string) {
  await prisma.job.delete({
    where: {
      id: id,
    },
    include: { company: true },
  });
}

export default async function Home() {
  const jobs = await getJobs();

  return (
    <main className="flex flex-col gap-12 lg:flex-row min-h-screen justify-between px-24">
      <div className="flex flex-col gap-8 flex-1">
        {jobs.map((job) => (
          <JobListingItem key={job.id} job={job} />
        ))}
      </div>

      <JobInfoViewContainer />
    </main>
  );
}
