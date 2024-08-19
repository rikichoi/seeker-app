import prisma from "@/lib/db/prisma";
import Image from "next/image";


export default async function Home() {
  const jobs = await prisma.job.findMany();
  return (
    <main className="flex flex-col items-center justify-between p-24">
      {jobs.map((job)=>(
        <div key={job.id} className="flex flex-col items-center justify-between p-24">
          <h1>{job.title}</h1>
          <p>{job.description}</p>
          <p>{job.location}</p>
          <p>{job.applyLink}</p>
          <p>{job.minSalary}</p>
          <p>{job.maxSalary}</p>
          <p>{job.applicationMethod}</p>
          <p>{job.employmentType}</p>
          <p>{job.expiryDate.toISOString()}</p>
        </div>
      ))}
      <h1>hello</h1>
    </main>
  );
}
