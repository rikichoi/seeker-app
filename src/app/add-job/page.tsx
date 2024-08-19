import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

async function createJob(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const location = formData.get("location")?.toString();
  const applyLink = formData.get("applyLink")?.toString();
  const minSalary = Number(formData.get("minSalary"));
  const maxSalary = Number(formData.get("maxSalary"));
  const applicationMethod = formData.get("applicationMethod")?.toString();
  const employmentType = formData.get("employmentType")?.toString();
  const expiryDate = formData.get("expiryDate")
    ? new Date(formData.get("expiryDate") as string).toISOString()
    : undefined;

  if (
    !title ||
    !description ||
    !location ||
    !applyLink ||
    !minSalary ||
    !maxSalary ||
    !applicationMethod ||
    !employmentType ||
    !expiryDate
  ) {
    throw new Error("All fields are required");
  }
  
  await prisma.job.create({
    data: {
      title: title,
      description: description,
      location: location,
      applyLink: applyLink,
      minSalary: minSalary,
      maxSalary: maxSalary,
      applicationMethod: applicationMethod,
      employmentType: employmentType,
      expiryDate: expiryDate,
    },
  });
  redirect("/");
}

export default function AddJobPage() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold text-center">Add Job</h1>
      <form action={createJob} className="flex flex-col gap-4">
        <input
          required
          name="title"
          placeholder="Title"
          className="input input-bordered w-full "
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="input input-bordered w-full "
        />
        <input
          required
          name="company"
          placeholder="Company"
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
          name="applyLink"
          placeholder="Apply Link"
          className="input input-bordered w-full "
        />
        <input
          required
          type="number"
          name="minSalary"
          placeholder="Min Salary"
          className="input input-bordered w-full "
        />
        <input
          required
          type="number"
          name="maxSalary"
          placeholder="Max Salary"
          className="input input-bordered w-full "
        />
        <input
          required
          name="applicationMethod"
          placeholder="Application Method"
          className="input input-bordered w-full "
        />
        <input
          required
          name="employmentType"
          placeholder="Employment Type"
          className="input input-bordered w-full "
        />
        <input
          required
          type="datetime-local"
          name="expiryDate"
          placeholder="Expiry Date"
          className="input input-bordered w-full "
        />

        <button className="btn btn-primary">Add Job</button>
      </form>
    </div>
  );
}
