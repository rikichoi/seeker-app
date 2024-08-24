import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import React from "react";

async function filterJobs(formData: FormData) {
  "use server";
  const keywords = formData.get("keywords") as string;
  const classification = formData.get("classification") as string;
  const location = formData.get("location") as string;

//   const jobs = await prisma.job.findMany({
//     where: {
//       OR: [
//         {
//           title: {
//             contains: keywords,
//             mode: "insensitive",
//           },
//         },
//         {
//           employmentType: {
//             contains: keywords,
//             mode: "insensitive",
//           },
//         },
//         {
//           industry: {
//             contains: classification,
//             mode: "insensitive",
//           },
//         },
//         {
//           location: {
//             contains: location,
//             mode: "insensitive",
//           },
//         },
//       ],
//     },
//   });
redirect(`/listings?${keywords && "&keywords=" + keywords}${classification && "&classification=" + classification}${location && "&location=" + location}`);
}

export default function FilterSection() {
  return (
    <div className="flex justify-center mx-auto min-w-full  object-contain h-72 lg:h-52  bg-[url('../assets/home-background.jpg')]">
      <form
        action={filterJobs}
        className="flex flex-col lg:flex-row gap-3 justify-center items-center"
      >
        <input
          name="keywords"
          placeholder="Enter Keywords"
          className="input input-bordered flex-shrink focus:outline-blue-800 focus:outline-4"
        ></input>
        <input
          name="classification"
          placeholder="Any Classification"
          className="input input-bordered  focus:outline-blue-800 focus:outline-4"
        ></input>
        <input
          name="location"
          placeholder="Enter location"
          className="input input-bordered focus:outline-blue-800 focus:outline-4 "
        ></input>
        <button className="btn btn-primary w-full lg:w-fit">SEEK</button>
      </form>
    </div>
  );
}
