"use client";
import React from "react";
import { removeJob } from "./[id]/actions";

type DeleteJobButtonProps = {
  id: string;
};

export default function DeleteJobButton({ id }: DeleteJobButtonProps) {
  return (
    <button className="btn btn-warning" onClick={() => removeJob(id)}>
      Delete Job
    </button>
  );
}
