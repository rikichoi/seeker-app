"use client";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import { editCompany } from "./actions";

type EditCompanyPageProps = {
  params: { id: string };
};

export default function EditCompanyPage({
  params: { id },
}: EditCompanyPageProps) {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl">Edit Company</h1>
      <form
        className="flex flex-col gap-3"
        action={(FormData) => editCompany(FormData, id)}
      >
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
        <input
          name="companyImage"
          placeholder="Company Image"
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary">Edit Company</button>
      </form>
    </div>
  );
}
