import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function createCompany(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);

  const companyName = formData.get("companyName")?.toString();
  const industry = formData.get("industry")?.toString();
  const size = formData.get("size")?.toString();
  const location = formData.get("location")?.toString();
  const website = formData.get("website")?.toString();
  const description = formData.get("description")?.toString();
  const type = formData.get("type")?.toString();
  const companyImage = formData.get("companyImage")?.toString();
  const userId = session?.user.id;

  if (
    !companyName ||
    !industry ||
    !size ||
    !location ||
    !website ||
    !description ||
    !type ||
    !companyImage
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
      companyImage: companyImage,
      userId: userId,
    },
  });
  redirect("/");
}

export default async function AddCompanyPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-company");
  }
  return (
    <div className="flex flex-col max-w-3xl p-3 mx-auto gap-3">
      <h1 className="text-3xl font-bold text-center">Add Company</h1>
      <form className="flex flex-col gap-3" action={createCompany}>
        <input
          required
          name="companyName"
          placeholder="Company Name"
          className="input input-bordered w-full "
        />
        <input
          required
          name="industry"
          placeholder="Industry"
          className="input input-bordered w-full "
        />
        <input
          required
          name="size"
          placeholder="Size"
          className="input input-bordered w-full "
        />
        <input
          required
          name="location"
          placeholder="Location"
          className="input input-bordered w-full "
        />
        <input
          required
          name="website"
          placeholder="Website"
          className="input input-bordered w-full "
        />
        <input
          required
          name="description"
          placeholder="Description"
          className="input h-52 input-bordered w-full "
        />
        <input
          required
          name="type"
          placeholder="Type"
          className="input input-bordered w-full "
        />
        <input
          name="companyImage"
          placeholder="Company Image"
          className="input input-bordered w-full "
        />
        <button className="btn btn-primary">Add Company</button>
      </form>
    </div>
  );
}
