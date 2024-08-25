"use client";
import React from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-[70vh]">
      <h1 className="text-5xl">Oops, there was an error!</h1>
      <p className="text-2xl">Please try again</p>
      <button onClick={reset} className="btn btn-primary">
        Try again
      </button>
    </div>
  );
}
