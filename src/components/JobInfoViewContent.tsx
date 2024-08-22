"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { getJobById, JobWithCompany } from "@/lib/db/job";
import getJobInfo from "./actions";
import { Job } from "@prisma/client";
import Image from "next/image";

export default function JobInfoViewContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [jobInfo, setJobInfo] = useState<JobWithCompany | null>(null);

  useEffect(() => {
    if (!jobId) return;
    getJobInfo(jobId).then((job) => {
      setJobInfo(job);
    });
  }, [jobId]);

  if (!jobId) {
    return (
      <div className="p-12 w-fit flex flex-col gap-5">
        <div className="flex flex-row items-center gap-3">
          <FaArrowLeft className="text-3xl" />
          <h1 className="text-3xl">Select a job</h1>
        </div>
        <h2 className="text-gray-600">Job details display here</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-wrap gap-5">
      <div className="flex flex-col items-center gap-3 ">
        <div className="object-cover">
          <Image
            className="object-cover max-h-52 items-center object-center rounded-t-lg"
            alt="Company Image"
            width={800}
            height={400}
            src={jobInfo?.company.companyImage || ""}
          ></Image>
        </div>
        <div className="p-12 ">
          <h1 className="text-3xl">{jobInfo?.title}</h1>
          <p>{jobInfo?.applicationMethod}</p>
          <p>{jobInfo?.employmentType}</p>
          <p>{jobInfo?.location}</p>
          <p>{jobInfo?.minSalary}</p>
          <p>{jobInfo?.maxSalary}</p>
          <p>{jobInfo?.expiryDate.toLocaleDateString()}</p>
          <p>{jobInfo?.industry}</p>
          <p>{jobInfo?.highlights}</p>
        </div>
      </div>
    </div>
  );
}
