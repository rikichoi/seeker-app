import React from "react";
import JobInfoViewContent from "./JobInfoViewContent";
import { getJobById } from "@/lib/db/job";

export default function JobInfoViewContainer() {
  return (
    <div className="w-full h-fit top-5 sticky rounded-xl border-2 border-cyan-950">
      <JobInfoViewContent />
    </div>
  );
}
