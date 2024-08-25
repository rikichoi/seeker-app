"use server";
import { authOptions } from "@/lib/authOptions"; import prisma from '@/lib/db/prisma';
import { Session } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function EditJobDetails(id: string, formData: FormData) {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const location = formData.get("location")?.toString();
  const applyLink = formData.get("applyLink")?.toString();
  const minSalary = Number(formData.get("minSalary"));
  const maxSalary = Number(formData.get("maxSalary"));
  const applicationMethod = formData.get("applicationMethod")?.toString();
  const employmentType = formData.get("employmentType")?.toString();
  const expiryDate = formData.get("expiryDate")
    ? new Date(formData.get("expiryDate") as string).toISOString()
    : undefined;
  const industry = formData.get("industry")?.toString();
  const highlights1 = formData.get("highlights1")?.toString() ?? "";
  const highlights2 = formData.get("highlights2")?.toString() ?? "";
  const highlights3 = formData.get("highlights3")?.toString() ?? "";
  const companyId = formData.get("companyId")?.toString();
  await prisma.job.update({
    where: { id: id },
    data: {
      title: title,
      description: description,
      location: location,
      applyLink: applyLink,
      minSalary: minSalary,
      maxSalary: maxSalary,
      applicationMethod: applicationMethod,
      employmentType: employmentType,
      expiryDate: expiryDate,
      industry: industry,
      highlights: [highlights1, highlights2, highlights3],
      companyId: companyId,
    },
  });
  redirect("/");

}

export async function removeJob(id: string) {
  await prisma.job.delete({
    where: { id: id },
  });
  redirect("/");
}

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function getJob(id: string) {
  const job = await prisma.job.findUnique({ where: { id: id } });
  return job;
}

export async function getUserCompanies(id: string) {
  const session = await getServerSession(authOptions);
  const companies = await prisma.company.findMany({
    where: { userId: session?.user.id },
  });
  return companies;
}