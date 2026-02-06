import CompanyForm from "@/components/CompanyForm";
import { prisma } from "@/lib/prisma";

export default async function NewCompanyPage({
  searchParams
}: {
  searchParams?: { fromRequest?: string };
}) {
  const requestId = searchParams?.fromRequest;
  const request = requestId
    ? await prisma.listingRequest.findUnique({ where: { id: requestId } })
    : null;

  const initialValues = request
    ? {
        name: request.companyName,
        websiteUrl: request.websiteUrl,
        roleLinks: Array.isArray(request.roleLinks)
          ? (request.roleLinks as (string | { title: string; url: string })[]).map(
              (link) =>
                typeof link === "string" ? { title: "Role link", url: link } : link
            )
          : [],
        description: ""
      }
    : undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Add company</h1>
        {request && (
          <p className="text-sm text-slate-600">
            Prefilled from listing request: {request.companyName}.
          </p>
        )}
      </div>
      <CompanyForm mode="create" requestId={request?.id} initialValues={initialValues} />
    </div>
  );
}
