import FilterSection from "@/components/FilterSection";
import JobInfoViewContainer from "@/components/JobInfoViewContainer";
import JobListingItem from "@/components/JobListingItem";
import prisma from "@/lib/db/prisma";

type ListingsPageProps = {
  searchParams: {
    keywords: string;
    classification: string;
    location: string;
  };
};

export default async function ListingsPage({
  searchParams: { classification, keywords, location },
}: ListingsPageProps) {
  const orConditions = [];
  if (keywords) {
    orConditions.push(
      {
        title: {
          contains: keywords,
          mode: "insensitive",
        },
      },
      {
        employmentType: {
          contains: keywords,
          mode: "insensitive",
        },
      }
    );
  }

  if (classification) {
    orConditions.push({
      industry: {
        contains: classification,
        mode: "insensitive",
      },
    });
  }

  if (location) {
    orConditions.push({
      location: {
        contains: location,
        mode: "insensitive",
      },
    });
  }

  const jobs = await prisma.job.findMany({
    ...(orConditions.length > 0 && { where: { OR: orConditions } }),
    include: { company: true },
  });

  return (
    <main className="">
      <FilterSection />
      <div className="p-4 max-w-7xl mx-auto flex flex-col gap-12 lg:flex-row min-h-screen justify-between px-24">
        <div className="flex flex-col gap-8 flex-1">
          {jobs.length === 0 && (
            <div className="card bg-base-100 w-96 shadow-xl border-2 rounded-lg hover:border-cyan-950">
              <p className="text-3xl">No jobs found</p>
            </div>
          )}
          {jobs.slice(0, 4).map((job) => (
            <JobListingItem key={job.id} job={job} />
          ))}
        </div>

        <JobInfoViewContainer />
      </div>
    </main>
  );
}
