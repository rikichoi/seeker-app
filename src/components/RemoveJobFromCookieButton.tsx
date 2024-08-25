"use client";
import React from "react";
import { removeJobFromCookie } from "./actions";

type RemoveJobFromCookieButtonProps = {
  data: string;
};

export default function RemoveJobFromCookieButton({
  data,
}: RemoveJobFromCookieButtonProps) {
  return (
    <button
      onClick={() => removeJobFromCookie(data)}
      className="btn btn-error "
    >
      Unsave job
    </button>
  );
}
