import CompanyListingItem from "@/components/CompanyListingItem";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CompanyFilterSection from "./CompanyFilterSection";

type CompaniesPageProps = {
  searchParams: {
    keywords: string;
  };
};

async function getCompanies(keywords: string) {
  "use server";
  const companies = await prisma.company.findMany({
    where: { companyName: { contains: keywords || "", mode: "insensitive" } },
  });
  return companies;
}

export default async function CompaniesPage({
  searchParams: { keywords },
}: CompaniesPageProps) {
  const companies = await getCompanies(keywords);
  return (
    <main className="">
      <CompanyFilterSection keywords={keywords} />
      <div className="p-4 max-w-7xl mx-auto flex flex-col border gap-12 lg:flex-row min-h-screen lg:px-24">
        <div className="flex flex-col gap-8 items-center flex-1">
          {companies.map((company, index) => (
            <CompanyListingItem key={index} company={company} />
          ))}
        </div>
      </div>
    </main>
  );
}
