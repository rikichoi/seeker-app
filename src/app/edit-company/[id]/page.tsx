"use client";
import React, { useEffect, useState } from "react";
import { editCompany, getCompany, getSession } from "./actions";
import DeleteCompanyButton from "./DeleteCompanyButton";
import { Company, Session } from "@prisma/client";
import { redirect } from "next/navigation";

type EditCompanyPageProps = {
  params: { id: string };
};

export default function EditCompanyPage({
  params: { id },
}: EditCompanyPageProps) {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const [defaultValues, setDefaultValues] = useState<Company | null>(null);

  useEffect(() => {
    const getSessionState = async () => {
      const session = await getSession();
      setSessionState(
        session as {
          id: string;
          sessionToken: string;
          userId: string;
          expires: Date;
          createdAt: Date;
          updatedAt: Date;
        } | null
      );
    };
    getSessionState();
  }, []);

  useEffect(() => {
    const getDefaultValues = async () => {
      const company = await getCompany(id);
      setDefaultValues(company);
    };
    getDefaultValues();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl">Edit Company</h1>
      {sessionState ? <DeleteCompanyButton id={id} /> : ""}
      <form
        className="flex flex-col gap-3"
        action={(FormData) => editCompany(FormData, id)}
      >
        <input
          name="companyName"
          placeholder="Company Name"
          defaultValue={defaultValues?.companyName}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="industry"
          placeholder="Industry"
          defaultValue={defaultValues?.industry}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="size"
          placeholder="Size"
          defaultValue={defaultValues?.size}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="location"
          placeholder="Location"
          defaultValue={defaultValues?.location}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="website"
          placeholder="Website"
          defaultValue={defaultValues?.website}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="description"
          placeholder="Description"
          defaultValue={defaultValues?.description}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="type"
          placeholder="Type"
          defaultValue={defaultValues?.type}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          name="companyImage"
          defaultValue={defaultValues?.companyImage}
          placeholder="Company Image"
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn btn-primary">Edit Company</button>
      </form>
    </div>
  );
}
