import CompanyCard from "@/components/CompanyCard";
import { INDUSTRY_OPTIONS, NYC_PRESENCE_OPTIONS } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export default async function Home({
  searchParams
}: {
  searchParams?: { industry?: string; nycPresence?: string; query?: string };
}) {
  const industry = searchParams?.industry || "";
  const nycPresence = searchParams?.nycPresence || "";
  const query = searchParams?.query || "";

  const companies = await prisma.company.findMany({
    where: {
      isLive: true,
      ...(industry ? { industry } : {}),
      ...(nycPresence ? { nycPresence } : {}),
      ...(query
        ? {
            name: {
              contains: query,
              mode: "insensitive"
            }
          }
        : {})
    },
    orderBy: { updatedAt: "desc" }
  });

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          A curated gallery of NYC startups that are hiring.
        </h1>
        <p className="max-w-2xl text-base text-slate-600">
          This isn&apos;t a job board. We highlight companies and link you to their
          own careers pages.
        </p>
      </section>

      <form className="flex flex-wrap gap-3 rounded-lg border border-slate-200 bg-white p-4">
        <input
          name="query"
          placeholder="Search by company name"
          defaultValue={query}
          className="min-w-[220px] flex-1"
        />
        <select name="industry" defaultValue={industry} className="min-w-[180px]">
          <option value="">All industries</option>
          {INDUSTRY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select name="nycPresence" defaultValue={nycPresence} className="min-w-[180px]">
          <option value="">All NYC presence</option>
          {NYC_PRESENCE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-white"
        >
          Filter
        </button>
      </form>

      {companies.length === 0 ? (
        <div className="card">No companies match the current filters.</div>
      ) : (
        <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}
