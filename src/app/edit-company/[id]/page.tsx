"use client";
import React, { useEffect, useState } from "react";
import { editCompany, getCompany, getSession } from "./actions";
import DeleteCompanyButton from "./DeleteCompanyButton";
import { Company, Session } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

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
    <div className="flex flex-col max-w-3xl p-3 mx-auto gap-3">
      <h1 className="text-3xl font-bold text-center">Edit Company</h1>
      {sessionState ? <DeleteCompanyButton id={id} /> : ""}
      <form
        className="flex flex-col gap-3"
        action={(FormData) => editCompany(FormData, id)}
      >
        <input
          name="companyName"
          placeholder="Company Name"
          defaultValue={defaultValues?.companyName}
          className="input input-bordered w-full "
        />
        <input
          name="industry"
          placeholder="Industry"
          defaultValue={defaultValues?.industry}
          className="input input-bordered w-full "
        />
        <input
          name="size"
          placeholder="Size"
          defaultValue={defaultValues?.size}
          className="input input-bordered w-full "
        />
        <input
          name="location"
          placeholder="Location"
          defaultValue={defaultValues?.location}
          className="input input-bordered w-full "
        />
        <input
          name="website"
          placeholder="Website"
          defaultValue={defaultValues?.website}
          className="input input-bordered w-full "
        />
        <textarea
          name="description"
          placeholder="Description"
          defaultValue={defaultValues?.description}
          className="input h-52 input-bordered w-full "
        />
        <input
          name="type"
          placeholder="Type"
          defaultValue={defaultValues?.type}
          className="input input-bordered w-full "
        />
        <Link
          className="underline text-blue-700 hover:text-blue-400"
          href={"https://unsplash.com/"}
          target="_blank"
        >
          Pick an image from Unsplash - https://unsplash.com/
        </Link>
        <p className="text-sm text-red-500">
          Image must be a valid image URL from Unsplash - With the format
          https://images.unsplash.com/
        </p>
        <p>
          Click Unsplash hyperlink » Open an image » Right click image » Copy
          Image Link
        </p>

        <input
          name="companyImage"
          defaultValue={defaultValues?.companyImage}
          placeholder="Company Image"
          className="input input-bordered w-full "
        />
        <button className="btn btn-primary">Edit Company</button>
      </form>
    </div>
  );
}
