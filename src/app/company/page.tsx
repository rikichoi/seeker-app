import CompanyListingItem from "@/components/CompanyListingItem";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function getCompanies() {
  "use server";
  const companies = await prisma.company.findMany();
  return companies;
}

export default async function CompaniesPage() {

  const companies = await getCompanies();
  return (
    <main className="flex flex-col gap-12 lg:flex-row  min-h-screen justify-between px-24">
      <div className="flex flex-col gap-8 flex-1">
        {companies.map((company, index) => (
          <CompanyListingItem key={index} company={company} />
        ))}
      </div>

      
    </main>
  );
}
