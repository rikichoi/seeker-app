import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

async function createCompany(formData: FormData) {
  "use server";
  const companyName = formData.get("companyName")?.toString();
  const industry = formData.get("industry")?.toString();
  const size = formData.get("size")?.toString();
  const location = formData.get("location")?.toString();
  const website = formData.get("website")?.toString();
  const description = formData.get("description")?.toString();
  const type = formData.get("type")?.toString();

  if (
    !companyName ||
    !industry ||
    !size ||
    !location ||
    !website ||
    !description ||
    !type
  ) {
    throw new Error("All fields are required");
  }
  await prisma.company.create({
    data: {
      companyName: companyName,
      industry: industry,
      size: size,
      location: location,
      website: website,
      description: description,
      type: type,
    },
  });
  redirect("/");
}

export default function AddCompanyPage() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl">Add Company</h1>
      <form className="flex flex-col gap-3" action={createCompany}>
        <input
          name="companyName"
          placeholder="Company Name"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="industry"
          placeholder="Industry"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="size"
          placeholder="Size"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="location"
          placeholder="Location"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="website"
          placeholder="Website"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="description"
          placeholder="Description"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="type"
          placeholder="Type"
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary">Add Company</button>
      </form>
    </div>
  );
}
