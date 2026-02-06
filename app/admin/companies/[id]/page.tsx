import { notFound } from "next/navigation";
import CompanyForm from "@/components/CompanyForm";
import { prisma } from "@/lib/prisma";

export default async function EditCompanyPage({
  params
}: {
  params: { id: string };
}) {
  const company = await prisma.company.findUnique({ where: { id: params.id } });

  if (!company) {
    notFound();
  }

  const initialValues = {
    id: company.id,
    name: company.name,
    slug: company.slug,
    description: company.description,
    websiteUrl: company.websiteUrl,
    careersUrl: company.careersUrl,
    nycPresence: company.nycPresence,
    industry: company.industry,
    hiringStatus: company.hiringStatus,
    badges: company.badges,
    roleLinks: (company.roleLinks as { title: string; url: string }[]) || [],
    isLive: company.isLive,
    lastVerifiedAt: company.lastVerifiedAt
      ? company.lastVerifiedAt.toISOString().split("T")[0]
      : null
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Edit company</h1>
        <p className="text-sm text-slate-600">Update details and publishing status.</p>
      </div>
      <CompanyForm mode="edit" initialValues={initialValues} />
    </div>
  );
}
