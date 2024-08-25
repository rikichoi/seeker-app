import JobInfoViewContainer from "@/components/JobInfoViewContainer";
import JobListingItem from "@/components/JobListingItem";
import { getJobs } from "@/lib/db/job";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Background from "../assets/home-background.jpg";
import HomeJobListingItem from "@/components/HomeJobListingItem";
import HomeCompanyListingItem from "@/components/HomeCompanyListingItem";
import { cookies } from "next/headers";
import Link from "next/link";
import FilterSection from "@/components/FilterSection";
import { remove, removeSearchHistory } from "@/components/actions";

type HomeProps = {
  searchParams: {
    keywords: string;
    classification: string;
    location: string;
  };
};

export default async function Home({
  searchParams: { classification, keywords, location },
}: HomeProps) {
  const jobs = await getJobs();
  const companies = await prisma.company.findMany();
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("savedJobs");
  const hasSearchesCookie = cookieStore.has("pastSearches") || false;
  const pastSearchesCookies =
    hasSearchesCookie && cookieStore.get("pastSearches");
  const pastSearchesArray =
    pastSearchesCookies &&
    pastSearchesCookies.value.replace(/\[|\]/g, "").split(",");
  const savedJobsCookies = hasCookie && cookieStore.get("savedJobs");
  const savedJobsArray = savedJobsCookies
    ? savedJobsCookies.value.replace(/\[|\]/g, "").split(",")
    : [];
  const newQuery = [];
  for (let i = 0; i < savedJobsArray.length; i++) {
    newQuery.push({ id: savedJobsArray[i].replace(/"/g, "") });
  }
  const savedJobs =
    savedJobsCookies &&
    savedJobsCookies.value &&
    (await prisma.job.findMany({
      where: {
        OR: newQuery,
      },
      include: { company: true },
    }));

  return (
    <main className="flex flex-col gap-12 min-h-screen ">
      <FilterSection
        classification={classification}
        keywords={keywords}
        location={location}
      />
      <div className="max-w-7xl mx-auto w-full min-w-[300px]">
        <div className="flex flex-col mx-4 gap-8 lg:gap-0 lg:mx-0 lg:flex-row justify-between ">
          <div className="min-w-80">
            <h1 className="text-3xl pb-3">Latest jobs</h1>
            <div className="flex flex-col gap-3">
              {jobs.slice(0, 3).map((job) => (
                <HomeJobListingItem key={job.id} job={job} />
              ))}
              <Link href={"/listings"} className="btn btn-primary w-1/2">
                View All Jobs
              </Link>
            </div>
          </div>
          <div className="min-w-80">
            <h1 className="text-3xl pb-3">Saved jobs</h1>
            <div className="flex flex-col gap-3">
              {savedJobs &&
                savedJobs.map((job) => (
                  <HomeJobListingItem key={job.id} job={job} />
                ))}
            </div>
          </div>
          <div className="min-w-80 max-w-80">
            <form
              action={removeSearchHistory}
              className="flex justify-between flex-row"
            >
              <h1 className="text-3xl pb-3 ">Past searches</h1>
              <button className="btn btn-error text-sm">Clear</button>
            </form>

            <div className="flex flex-wrap gap-1">
              {hasSearchesCookie == false ||
              (pastSearchesArray &&
                pastSearchesArray.filter((search) => search != "").length < 1)
                ? "No past searches"
                : ""}
              {hasSearchesCookie == true &&
                pastSearchesArray &&
                pastSearchesArray.length > 0 &&
                pastSearchesArray
                  .filter((search) => search != "")
                  .map((search, index) => (
                    <Link
                      href={"/listings?&keywords=" + search.replace(/"/g, "")}
                      key={index}
                      className="badge badge-neutral p-5 hover:badge-secondary"
                    >
                      {search.replace(/"/g, "")}
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full min-w-[300px]">
        <div className="flex flex-row mx-4 lg:mx-0 gap-3">
          <div className="w-full">
            <h1 className="text-3xl  pb-3">Find your next employer</h1>
            <h2 className="text-lg pb-3">
              Explore company profiles to find the right workplace for you.
              Learn about jobs, reviews, company culture, perks and benefits.
            </h2>
            <div className="carousel mb-8 gap-3 rounded-box max-w-[97vw] lg:max-w-7xl w-fit pb-8 ">
              {companies.slice(0, 8).map((company) => (
                <HomeCompanyListingItem key={company.id} company={company} />
              ))}
            </div>
            <Link href={"/company"} className="btn btn-primary w-fit px-8">
              View All Companies
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden sm:block text-white mb-10 rounded-xl px-8 pt-8 border-black max-w-[97vw] lg:max-w-7xl mx-auto bg-[#2a0116] w-full min-w-[300px]">
        <div className="flex min-h-96 flex-row gap-3">
          <div className="p-4 text-balance">
            <h1 className="text-3xl lg:text-7xl font-medium text-white pb-3 max-w-[400px]">
              Better job matches.
            </h1>
            <h1 className="text-lg lg:text-3xl font-light text-white pb-3 max-w-[600px]">
              <span className="font-bold">seek</span> and you shall find.
            </h1>
          </div>
          <div className=" flex flex-1 bg-cover bg-top bg-no-repeat bg-[url('../assets/Home-Ad-Image.png')]"></div>
        </div>
      </div>
    </main>
  );
}
