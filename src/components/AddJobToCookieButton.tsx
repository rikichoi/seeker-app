"use client"
import React from "react";
import { create } from "./actions";

type AddJobToCookieButtonProps = {
  data: string;
};

export default function AddJobToCookieButton({
  data,
}: AddJobToCookieButtonProps) {
  return (
    <button onClick={() => create(data)} className="btn btn-warning ">
      Save job
    </button>
  );
}
