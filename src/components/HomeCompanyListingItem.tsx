import { Company } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type HomeCompanyListingItemProps = {
  company: Company;
};

export default function HomeCompanyListingItem({
  company,
}: HomeCompanyListingItemProps) {
  return (
    <div className="card bg-base-100 w-96 shadow-xl border-2 rounded-xl hover:border-cyan-950">
      <Link href={"/company/" + company.id}>
        <figure>
          <Image
            src={company.companyImage}
            className="rounded-t-lg max-h-44 object-cover"
            alt="Shoes"
            width={384}
            height={384}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{company.companyName}</h2>
        </div>
      </Link>
    </div>
  );
}
