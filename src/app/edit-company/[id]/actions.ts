"use server";
import prisma from "@/lib/db/prisma";
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
    await prisma.company.update({
      where:{ id: id },
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