import JobInfoViewContainer from "@/components/JobInfoViewContainer";
import JobListingItem from "@/components/JobListingItem";
import { getJobs } from "@/lib/db/job";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Background from "../assets/home-background.jpg";
import HomeJobListingItem from "@/components/HomeJobListingItem";
import HomeCompanyListingItem from "@/components/HomeCompanyListingItem";

export default async function Home() {
  const jobs = await getJobs();
  const companies = await prisma.company.findMany();

  return (
    <main className="flex flex-col gap-12 min-h-screen ">
      <div className="flex justify-center mx-auto min-w-full  object-contain h-52 brightness-90  bg-[url('../assets/home-background.jpg')]">
        <div className="flex flex-row gap-3 items-center">
          <input
            name="keywords"
            placeholder="Enter Keywords"
            className="input input-bordered focus:outline-blue-800 focus:outline-4"
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
          <button className="btn btn-primary ">SEEK</button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full min-w-[300px]">
        <div className="flex flex-row justify-between ">
          <div>
            <h1 className="text-3xl pb-3">Latest Jobs</h1>
            <div className="flex flex-col gap-8 flex-1">
              {jobs.map((job) => (
                <HomeJobListingItem key={job.id} job={job} />
              ))}
              <button className="btn btn-primary w-1/2">View All</button>
            </div>
          </div>
          <div>
            <h1 className="text-3xl pb-3">Saved jobs</h1>
            <div className="flex flex-col gap-8 flex-1">
              {jobs.map((job) => (
                <HomeJobListingItem key={job.id} job={job} />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl pb-3">Saved searches</h1>
            <div className="flex flex-col gap-8 flex-1">
              {jobs.map((job) => (
                <HomeJobListingItem key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" max-w-7xl mx-auto  w-full min-w-[300px]">
        <div className="flex flex-row gap-3">
          <div>
            <h1 className="text-3xl  pb-3">Find your next employer</h1>
            <h2 className="text-lg pb-3">
              Explore company profiles to find the right workplace for you.
              Learn about jobs, reviews, company culture, perks and benefits.
            </h2>
            <div className="flex flex-row pb-5 gap-8 flex-1">
              {companies.map((company) => (
                <HomeCompanyListingItem key={company.id} company={company} />
              ))}
            </div>
            <button className="btn btn-primary w-fit px-6">See more</button>
          </div>
        </div>
      </div>
      <div className="text-white mb-10 rounded-xl px-8 pt-8 border-black max-w-7xl mx-auto bg-[#2a0116] w-full min-w-[300px]">
        <div className="flex min-h-72  flex-row gap-3">
          <div className="p-4">
            <h1 className="text-7xl font-medium text-white pb-3 max-w-[600px]">
              Better job matches.
            </h1>
            <h1 className="text-3xl font-light text-white pb-3 max-w-[600px]">
              <span className="font-bold">seek</span> and you shall find.
            </h1>
          </div>
          <div className=" w-full  bg-right-top  bg-no-repeat bg-[url('../assets/Home-Ad-Image.png')]"></div>
        </div>
      </div>
    </main>
  );
}
