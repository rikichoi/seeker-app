import { JobWithCompany } from "@/lib/db/job";
import { Job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type HomeJobListingItemProps = {
  job: JobWithCompany;
};

export default function HomeJobListingItem({ job }: HomeJobListingItemProps) {
  return (
    <div className="card bg-base-100 min-w-80  shadow-xl border-2 rounded-lg hover:border-cyan-950">
      <Link href={"/job/" + job.id}>
        <div className="card-body">
          <h2 className="card-title">{job.title}</h2>
          <div className="badge badge-secondary">{job.location}</div>
          <h2 className="card-title">{job.company.companyName}</h2>
        </div>
      </Link>
    </div>
  );
}
