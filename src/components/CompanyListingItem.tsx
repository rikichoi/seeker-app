
import { Company } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type CompanyListingItemProps = {
  company: Company;
};

export default function CompanyListingItem({
  company,
}: CompanyListingItemProps) {
  return (
    <div className="card bg-base-100 w-full max-w-2xl shadow-xl border-2 rounded-lg hover:border-cyan-950">
      <Link href={"/company/" + company.id}>
        <figure>
          <Image
            src={company.companyImage}
            className="rounded-t-md object-cover max-h-[384px]"
            alt="Company Image"
            width={1000}
            height={1000}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{company.companyName}</h2>
          <div className="badge badge-secondary">{company.location}</div>
          <h2 className="card-title">{company.industry}</h2>
          <p>{company.description}</p>
          <p>{company.website}</p>
        </div>
      </Link>
    </div>
  );
}
