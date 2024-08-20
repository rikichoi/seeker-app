import prisma from "@/lib/db/prisma";
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
  const company = await getCompany(id);
  return (
    <div>
      <Link href={"/edit-company/" + company.id} className="btn btn-primary">Edit Company</Link>
      <h1>{company.companyName}</h1>
    </div>
  );
}
