"use client";
import React from "react";
import { removeCompany } from "./actions";

type DeleteCompanyButtonProps = {
  id: string;
};

export default function DeleteCompanyButton({ id }: DeleteCompanyButtonProps) {
  return (
    <button className="btn btn-error" onClick={() => removeCompany(id)}>
      Delete Company
    </button>
  );
}
