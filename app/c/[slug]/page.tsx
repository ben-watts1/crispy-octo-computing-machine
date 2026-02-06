import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  getOptionLabel,
  HIRING_STATUS_OPTIONS,
  INDUSTRY_OPTIONS,
  NYC_PRESENCE_OPTIONS
} from "@/lib/constants";

export default async function CompanyPage({
  params
}: {
  params: { slug: string };
}) {
  const company = await prisma.company.findFirst({
    where: { slug: params.slug, isLive: true }
  });

  if (!company) {
    notFound();
  }

  const roleLinks = (company.roleLinks as { title: string; url: string }[]) || [];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <span className="hiring-badge">
          {getOptionLabel(HIRING_STATUS_OPTIONS, company.hiringStatus)}
        </span>
        <h1 className="text-3xl font-semibold text-slate-900">{company.name}</h1>
        <p className="max-w-2xl text-base text-slate-600">
          {company.description}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="badge">
            {getOptionLabel(NYC_PRESENCE_OPTIONS, company.nycPresence)}
          </span>
          <span className="badge">
            {getOptionLabel(INDUSTRY_OPTIONS, company.industry)}
          </span>
          {company.badges.map((badge) => (
            <span key={badge} className="badge">
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="card space-y-4">
        <div className="flex flex-wrap gap-4">
          <a className="link" href={company.websiteUrl} target="_blank" rel="noreferrer">
            Company website
          </a>
          {company.careersUrl && (
            <a className="link" href={company.careersUrl} target="_blank" rel="noreferrer">
              Careers page
            </a>
          )}
        </div>
        {roleLinks.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-slate-700">Role links</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {roleLinks.map((link, index) => (
                <li key={`${link.url}-${index}`}>
                  <a className="link" href={link.url} target="_blank" rel="noreferrer">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {company.lastVerifiedAt && (
          <p className="text-xs text-slate-500">
            Last verified {company.lastVerifiedAt.toDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
