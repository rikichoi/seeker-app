import { JobWithCompany } from "@/lib/db/job";
import { Job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type JobListingItemProps = {
  job: JobWithCompany;
};

export default function JobListingItem({ job }: JobListingItemProps) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl border-2 rounded-xl hover:border-cyan-950">
      <Link href={"/job/" + job.id}>
        <figure>
          <Image
            src={
              "https://images.unsplash.com/photo-1549813069-f95e44d7f498?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="rounded-t-lg"
            alt="Shoes"
            width={384}
            height={384}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{job.title}</h2>
          <div className="badge badge-secondary">{job.location}</div>
          <h2 className="card-title">{job.company.companyName}</h2>
          <p>{job.location}</p>
          <p>{job.employmentType}</p>
          <ul className="list-disc">
            {job.highlights
              .filter((highlight) => highlight != "")
              .map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
          </ul>
        </div>
      </Link>
    </div>
  );
}
