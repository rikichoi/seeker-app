import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "@/lib/authOptions";
import CompanyListingItem from "@/components/CompanyListingItem";

async function createJob(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-job");
  }
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
  const industry = formData.get("industry")?.toString();
  const highlights1 = formData.get("highlights1")?.toString() ?? "";
  const highlights2 = formData.get("highlights2")?.toString() ?? "";
  const highlights3 = formData.get("highlights3")?.toString() ?? "";
  const userId = session.user.id;
  const companyId = formData.get("companyId")?.toString();

  if (
    !title ||
    !description ||
    !location ||
    !applyLink ||
    !minSalary ||
    !maxSalary ||
    !applicationMethod ||
    !employmentType ||
    !expiryDate ||
    !industry ||
    !companyId
  ) {
    throw new Error("All fields are required");
  }
  //create a for loop that will loop 50 times and insert the prisma function from below inside of it
  for (let i = 0; i < 20; i++) {
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
        industry: industry,
        highlights: [highlights1, highlights2, highlights3],
        companyId: companyId,
        userId: userId,
      },
    });
  }

  redirect("/");
}

export default async function AddJobPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-job");
  }

  const companies = await prisma.company.findMany({
    where: { userId: session?.user.id },
  });

  if (companies.length <= 0) {
    redirect("/add-company?callbackUrl=/add-job");
  }

  return (
    <div className="flex flex-col max-w-3xl p-3 mx-auto gap-3">
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
          className="input h-52 input-bordered w-full "
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
        <input
          required
          name="industry"
          placeholder="Industry"
          className="input input-bordered w-full "
        />
        <input
          required
          type="datetime-local"
          name="expiryDate"
          placeholder="Expiry Date"
          className="input input-bordered w-full "
        />
        <input
          name="highlights1"
          placeholder="Highlights"
          className="input input-bordered w-full "
        />
        <input
          name="highlights2"
          placeholder="Highlights"
          className="input input-bordered w-full "
        />
        <input
          name="highlights3"
          placeholder="Highlights"
          className="input input-bordered w-full "
        />

        <select
          required
          name="companyId"
          className="select select-bordered w-full max-w-xs"
        >
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.companyName}
            </option>
          ))}
        </select>

        <button className="btn btn-primary">Add Job</button>
      </form>
    </div>
  );
}
