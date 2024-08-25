"use server";
import prisma from "@/lib/db/prisma";
import { getJobById } from "@/lib/db/job";
import { cookies } from "next/headers";

export async function getJobInfo(id: string) {
  const job = await getJobById(id);
  return job;
}

export async function create(data: string) {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("savedJobs");
  const savedJobsCookies = hasCookie && cookieStore.get("savedJobs");

  if (!hasCookie || !savedJobsCookies) {
    cookieStore.set('savedJobs', JSON.stringify([data]));
  } else {
    let savedJobsArray = JSON.parse(savedJobsCookies.value);

    if (savedJobsArray.includes(data)) {
      return; // Return if data already exists in savedJobs cookie
    } else {
      savedJobsArray.push(data);
      cookieStore.set('savedJobs', JSON.stringify(savedJobsArray));
    }
  }
}

export async function remove() {
  cookies().delete('savedJobs');
}

export async function removeJobFromCookie(data: string) {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("savedJobs");
  const savedJobsCookies = hasCookie && cookieStore.get("savedJobs");
  if (!hasCookie || !savedJobsCookies) {
    return;
  } else {
    let savedJobsArray = JSON.parse(savedJobsCookies.value);

    if (savedJobsArray.includes(data)) {
      if (savedJobsArray.length === 0) {
        cookieStore.delete('savedJobs');
      }
      else {
        console.log(savedJobsArray.length)
        savedJobsArray = await savedJobsArray.filter((job: string) => job !== data);
        if (savedJobsArray.length === 0) {
          cookieStore.delete('savedJobs');
        }
        else {
          cookieStore.set('savedJobs', JSON.stringify(savedJobsArray));

        }
      }
    } else {
      return;
    }
  }
}

export async function removeSearchHistory() {
  cookies().delete('pastSearches');
}