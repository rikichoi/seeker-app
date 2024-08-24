import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";

type FilterSectionProps = {
  
    keywords: string;
    classification: string;
    location: string;

};

async function filterJobs(formData: FormData) {
  "use server";
  const keywords = formData.get("keywords")?.toString();
  const classification = formData.get("classification")?.toString();
  const location = formData.get("location")?.toString();

  const cookieStore = cookies();
  const hasCookie = cookieStore.has("pastSearches");
  const pastSearchesCookies = hasCookie && cookieStore.get("pastSearches");

  if (!hasCookie || !pastSearchesCookies) {
    cookieStore.set("pastSearches", JSON.stringify([keywords]));
    redirect(
      `/listings?${keywords && "&keywords=" + keywords}${
        classification && "&classification=" + classification
      }${location && "&location=" + location}`
    );
  } else {
    let pastSearchesArray = JSON.parse(pastSearchesCookies.value);

    if (pastSearchesArray.includes(keywords)) {
      redirect(
        `/listings?${keywords && "&keywords=" + keywords}${
          classification && "&classification=" + classification
        }${location && "&location=" + location}`
      );
    } else {
      pastSearchesArray.push(keywords);
      cookieStore.set("pastSearches", JSON.stringify(pastSearchesArray));
      redirect(
        `/listings?${keywords && "&keywords=" + keywords}${
          classification && "&classification=" + classification
        }${location && "&location=" + location}`
      );
    }
  }
}

export default function FilterSection({classification,keywords,location}: FilterSectionProps) {
  return (
    <div className="flex justify-center mx-auto min-w-full  object-contain h-72 lg:h-52  bg-[url('../assets/home-background.jpg')]">
      <form
        action={filterJobs}
        className="flex flex-col lg:flex-row gap-3 justify-center items-center"
      >
        <input
          name="keywords"
          placeholder="Enter Keywords"
          defaultValue={keywords}
          className="input input-bordered flex-shrink focus:outline-blue-800 focus:outline-4"
        ></input>
        <input
          name="classification"
          placeholder="Any Classification"
          defaultValue={classification}
          className="input input-bordered  focus:outline-blue-800 focus:outline-4"
        ></input>
        <input
          name="location"
          placeholder="Enter location"
          defaultValue={location}
          className="input input-bordered focus:outline-blue-800 focus:outline-4 "
        ></input>
        <button className="btn btn-primary w-full lg:w-fit">SEEK</button>
      </form>
    </div>
  );
}
