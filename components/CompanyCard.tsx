import { Company } from "@prisma/client";
import { getOptionLabel, HIRING_STATUS_OPTIONS, NYC_PRESENCE_OPTIONS } from "@/lib/constants";

const CompanyCard = ({ company }: { company: Company }) => {
  const roleLinks = (company.roleLinks as { title: string; url: string }[]) || [];
  const primaryLink = company.careersUrl || company.websiteUrl;

  return (
    <div className="flex flex-col gap-4 px-6 py-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">{company.name}</h3>
          <p className="max-w-2xl text-sm text-slate-600">{company.description}</p>
        </div>
        <span className="hiring-badge">
          {getOptionLabel(HIRING_STATUS_OPTIONS, company.hiringStatus)}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-slate-600">
        <span className="badge">
          {getOptionLabel(NYC_PRESENCE_OPTIONS, company.nycPresence)}
        </span>
        {company.badges.slice(0, 5).map((badge) => (
          <span key={badge} className="badge">
            {badge}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <a href={`/c/${company.slug}`} className="link">
          View details
        </a>
        <a
          href={primaryLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700"
        >
          View roles
        </a>
        {roleLinks.length > 0 && (
          <details className="relative">
            <summary className="cursor-pointer text-xs text-slate-500">Quick links</summary>
            <div className="absolute left-0 z-10 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-lg">
              <ul className="space-y-2">
                {roleLinks.map((link, index) => (
                  <li key={`${link.url}-${index}`}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
