"use client";
import React, { useEffect, useState } from "react";
import EditJobDetails, {
  getJob,
  getSession,
  getUserCompanies,
} from "./actions";

import { Session, Job, Company } from "@prisma/client";
import DeleteJobButton from "../DeleteJobButton";

type EditJobPageProps = {
  params: {
    id: string;
  };
};

export default function EditJobPage({ params: { id } }: EditJobPageProps) {
  const [sessionState, setSessionState] = useState<Session | null>(null);
  const [defaultValues, setDefaultValues] = useState<Job | null>(null);
  const [defaultCompanies, setDefaultCompanies] = useState<Company[] | null>(
    []
  );
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
      const job = await getJob(id);
      if(!sessionState) {
        return;
      }
      const companies = await getUserCompanies(sessionState.id);
      setDefaultValues(job);
      setDefaultCompanies(companies);
    };
    getDefaultValues();
  }, [sessionState]);
  return (
    <div className="flex flex-col max-w-3xl p-3 mx-auto gap-3">
      <h1 className="text-3xl font-bold text-center">Edit Job</h1>
      {sessionState ? <DeleteJobButton id={id} /> : ""}
      <form
        action={(formData) => EditJobDetails(id, formData)}
        className="flex flex-col gap-4"
      >

        <input
          required
          name="title"
          placeholder="Title"
          defaultValue={defaultValues?.title}
          className="input input-bordered w-full "
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          defaultValue={defaultValues?.description}
          className="input h-52 input-bordered w-full "
        />
        <select
          required
          name="companyId"
          defaultValue={defaultValues?.companyId}
          className="select select-bordered w-full max-w-xs"
        >
          {defaultCompanies && defaultCompanies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.companyName}
            </option>
          ))}
        </select>
        <input
          required
          name="location"
          placeholder="Location"
          defaultValue={defaultValues?.location}
          className="input input-bordered w-full "
        />
        <input
          required
          name="applyLink"
          placeholder="Apply Link"
          defaultValue={defaultValues?.applyLink}
          className="input input-bordered w-full "
        />
        <input
          required
          type="number"
          name="minSalary"
          placeholder="Min Salary"
          defaultValue={defaultValues?.minSalary}
          className="input input-bordered w-full "
        />
        <input
          required
          type="number"
          name="maxSalary"
          placeholder="Max Salary"
          defaultValue={defaultValues?.maxSalary}
          className="input input-bordered w-full "
        />
        <input
          required
          name="applicationMethod"
          placeholder="Application Method"
          defaultValue={defaultValues?.applicationMethod}
          className="input input-bordered w-full "
        />
        <input
          required
          name="employmentType"
          placeholder="Employment Type"
          defaultValue={defaultValues?.employmentType}
          className="input input-bordered w-full "
        />
        <input
          required
          type="datetime-local"
          name="expiryDate"
          placeholder="Expiry Date"
          defaultValue={defaultValues?.expiryDate.toISOString().slice(0, 16)}
          className="input input-bordered w-full "
        />
        <input
          required
          name="industry"
          placeholder="Industry"
          defaultValue={defaultValues?.industry}
          className="input input-bordered w-full "
        />

        <input
          name="highlights1"
          placeholder="Highlights"
          defaultValue={defaultValues?.highlights[0]}
          className="input input-bordered w-full "
        />
        <input
          name="highlights2"
          placeholder="Highlights"
          defaultValue={defaultValues?.highlights[1]}
          className="input input-bordered w-full "
        />
        <input
          name="highlights3"
          placeholder="Highlights"
          defaultValue={defaultValues?.highlights[2]}
          className="input input-bordered w-full "
        />
        <button className="btn btn-primary">Edit Job</button>
      </form>
    </div>
  );
}
