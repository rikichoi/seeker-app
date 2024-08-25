import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type CompanyPageProps = {
  params: { id: string };
};

async function getCompany(id: string) {
  const company = await prisma.company.findUnique({ where: { id: id } });
  if (!company) notFound();
  return company;
}

export default async function CompanyPage({
  params: { id },
}: CompanyPageProps) {
  const session = await getServerSession(authOptions);
  const company = await getCompany(id);
  return (
    <div className="max-w-3xl p-3 mx-auto flex flex-col gap-3">
      {session?.user.id == company.userId ? (
        <Link href={"/edit-company/" + company.id} className="btn btn-primary">
          Edit Company
        </Link>
      ) : (
        ""
      )}
      <Image
        className="max-h-72 object-cover object-center"
        src={company.companyImage}
        alt={company.companyName}
        width={1000}
        height={1000}
      />
      <div className="flex flex-row gap-4 items-end">
        <h1 className="text-3xl font-semibold">{company.companyName}</h1>
        <Link href={`https://${company.website}`} target="_blank" className="underline hover:text-blue-500">
          View company website
        </Link>
      </div>
      <h2 className="text-xl font-semibold">Company Overview:</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row">
          <h3 className="font-medium min-w-40">Industry</h3>
          <p>{company.industry}</p>
        </div>
        <div className="flex flex-row">
          <h3 className="font-medium min-w-40">Location</h3>
          <p>{company.location}</p>
        </div>
        <div className="flex flex-row">
          <h3 className="font-medium min-w-40">Type</h3>
          <p>{company.type}</p>
        </div>
        <div className="flex flex-row">
          <h3 className="font-medium min-w-40">Size</h3>
          <p>{company.size}</p>
        </div>

        <p>{company.description}</p>
      </div>
    </div>
  );
}
