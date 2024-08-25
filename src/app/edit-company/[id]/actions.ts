"use server";
import { authOptions } from "@/lib/authOptions"; import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export async function editCompany(formData: FormData, id: string) {
  const companyName = formData.get("companyName")?.toString();
  const industry = formData.get("industry")?.toString();
  const size = formData.get("size")?.toString();
  const location = formData.get("location")?.toString();
  const website = formData.get("website")?.toString();
  const description = formData.get("description")?.toString();
  const type = formData.get("type")?.toString();
  const companyImage = formData.get("companyImage")?.toString();
  const companyImageRegex = /^https:\/\/images\.unsplash\.com\//;

  if (
    !companyName ||
    !industry ||
    !size ||
    !location ||
    !website ||
    !description ||
    !type ||
    !companyImage
  ) {
    throw new Error("All fields are required");
  }
  if (!companyImageRegex.test(companyImage)) {
    throw new Error("Company Image must be a valid image URL from Unsplash - https://images.unsplash.com/");
  }
  await prisma.company.update({
    where: { id: id },
    data: {
      companyName: companyName,
      industry: industry,
      size: size,
      location: location,
      website: website,
      description: description,
      type: type,
      companyImage: companyImage,
    },
  });
  redirect("/");
}

export async function removeCompany(id: string) {
  await prisma.company.delete({
    where: { id: id },
  });
  redirect("/");
}

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export async function getCompany(id: string) {
  const company = await prisma.company.findUnique({ where: { id: id } });
  return company;
}