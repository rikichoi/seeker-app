import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { create } from "@/components/actions";
import AddJobToCookieButton from "@/components/AddJobToCookieButton";
import RemoveJobFromCookieButton from "@/components/RemoveJobFromCookieButton";
import { JobWithCompany } from "@/lib/db/job";
import prisma from "@/lib/db/prisma";
import { formatPrice, getDaysUntilExpiry, getTimeAgo } from "@/lib/utils";
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
    <div className="max-w-3xl mx-auto py-5">
      {session?.user.id === job.company.userId && (
        <Link href={"/edit-job/" + job.id} className="btn btn-success mb-5">
          Edit job
        </Link>
      )}
      <h1 className="text-3xl font-semibold">{job.title}</h1>
      <div className="flex flex-row gap-3 items-center mb-3">
        <h2 className="text-lg">{job.company.companyName}</h2>
        <Link
          href={"/company/" + job.companyId}
          className="underline hover:text-blue-500"
        >
          View company
        </Link>
      </div>

      <p>{job.location}</p>
      <p>{job.industry}</p>
      <p>{job.employmentType}</p>
      <p>
        {formatPrice(job.minSalary)} - {formatPrice(job.maxSalary)} per year
      </p>
      <p>Posted {getTimeAgo(job.createdAt)}</p>
      <p>Expires in {getDaysUntilExpiry(job.expiryDate)} days</p>
      <div className="flex flex-row gap-3 my-6">
        <Link
          href={`https://${job.applyLink}`}
          target="_blank"
          className="btn btn-primary"
        >
          Apply for job
        </Link>

        <AddJobToCookieButton data={job.id} />
        <RemoveJobFromCookieButton data={job.id} />
      </div>
      <h3 className="text-lg font-medium mb-3">Overview:</h3>
      <p>{job.description}</p>

      
      <ul className="list-disc pl-5">
        {job.highlights
          .filter((highlight) => highlight !== "")
          .map((highlight, index) => (
            <li className="" key={index}>
              {highlight}
            </li>
          ))}
      </ul>
    </div>
  );
}
