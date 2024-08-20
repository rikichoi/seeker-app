"use client";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import EditJobDetails from "./actions";

type EditJobPageProps = {
  params: {
    id: string;
  };
};

export default function EditJobPage({
  params: { id },
}: EditJobPageProps) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold text-center">Edit Job</h1>
      <form
        action={(formData) => EditJobDetails(id, formData)}
        className="flex flex-col gap-4"
      >
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
        <button className="btn btn-primary">Edit Job</button>
      </form>
    </div>
  );
}
