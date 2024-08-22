import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
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
    <div>
      {session?.user.id == company.userId ? (
        <Link href={"/edit-company/" + company.id} className="btn btn-primary">
          Edit Company
        </Link>
      ) : (
        ""
      )}

      <h1>{company.companyName}</h1>
    </div>
  );
}
