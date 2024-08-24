import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { JobWithCompany } from "@/lib/db/job";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type GetJobInfoProps = {
  params: {
    id: string;
  };
};

async function getJobInfo(id: string) {
  "use server";
  await prisma.job.findUnique({
    where: { id: id },
    include: { company: true },
  });
}

export default async function JobInfoPage({ params: { id } }: GetJobInfoProps) {
  const session = await getServerSession(authOptions);
  const job = await prisma.job.findUnique({
    where: { id: id },
    include: { company: true },
  });
  if (!job) {
    notFound();
  }
  return (
    <div>
      {session?.user.id === job.company.userId && (
        <Link href={"/edit-job/" + job.id} className="btn btn-primary">
          Edit Job
        </Link>
      )}

      <p>{job.title}</p>
      <p>{job.description}</p>
      <p>{job.location}</p>
      <p>{job.applyLink}</p>
      <p>{job.minSalary}</p>
      <p>{job.maxSalary}</p>
      <p>{job.applicationMethod}</p>
      <p>{job.employmentType}</p>
      <p>{job.expiryDate.toLocaleDateString()}</p>
      <p>{job.industry}</p>
      <p>{job.highlights}</p>
      <p>{job.company.companyName}</p>
      <p>{job.company.industry}</p>
      <p>{job.company.size}</p>
      <p>{job.company.location}</p>
      <p>{job.company.website}</p>
      <p>{job.company.description}</p>
    </div>
  );
}
