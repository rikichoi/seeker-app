import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";

type CompanyFilterSectionProps = {
  keywords: string;

};

async function filterCompanies(formData: FormData) {
  "use server";
  const keywords = formData.get("keywords")?.toString();

  redirect(
    `/company?${keywords && "&keywords=" + keywords}`);
}

export default function CompanyFilterSection({

  keywords,

}: CompanyFilterSectionProps) {
  return (
    <div className="flex justify-center mx-auto min-w-full  object-contain h-72 lg:h-52  bg-[url('../assets/home-background.jpg')]">
      <form
        action={filterCompanies}
        className="flex flex-col lg:flex-row gap-3 justify-center items-center"
      >
        <input
          name="keywords"
          placeholder="Enter Keywords"
          defaultValue={keywords}
          className="input input-bordered flex-shrink focus:outline-blue-800 focus:outline-4"
        ></input>
        <button className="btn btn-primary w-full lg:w-fit">SEEK</button>
      </form>
    </div>
  );
}
