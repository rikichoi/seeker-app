"use server";
import prisma from "@/lib/db/prisma";
import { getJobById } from "@/lib/db/job";

export default async function getJobInfo(id: string) {
  const job = await getJobById(id);
  return job;
}