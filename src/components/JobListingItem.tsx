import { JobWithCompany } from "@/lib/db/job";
import { Job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type JobListingItemProps = {
  job: JobWithCompany;
};

export default function JobListingItem({ job }: JobListingItemProps) {


  return (
    <div className="card bg-base-100 w-96 shadow-xl border-2 rounded-lg hover:border-cyan-950">
      <Link scroll={false} href={"/listings?jobId=" + job.id}>
        <figure>
          <Image
            src={job.company.companyImage}
            className="rounded-t-md"
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
