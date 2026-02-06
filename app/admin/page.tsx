import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateListingStatus, toggleCompanyLive } from "@/lib/actions";

export default async function AdminPage() {
  const requests = await prisma.listingRequest.findMany({
    orderBy: { createdAt: "desc" }
  });

  const statusOrder: Record<string, number> = {
    PENDING: 0,
    APPROVED: 1,
    REJECTED: 2
  };

  const sortedRequests = [...requests].sort(
    (a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99)
  );

  const companies = await prisma.company.findMany({
    orderBy: { updatedAt: "desc" }
  });

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Admin dashboard</h1>
          <Link
            href="/admin/companies/new"
            className="rounded-md bg-slate-900 px-4 py-2 text-white"
          >
            Add company
          </Link>
        </div>
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Listing requests</h2>
          {sortedRequests.length === 0 ? (
            <p className="text-sm text-slate-600">No requests yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <th>Company</th>
                  <th>Status</th>
                  <th>Contact</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {sortedRequests.map((request) => (
                  <tr key={request.id} className="rounded-lg bg-slate-50">
                    <td className="p-3">
                      <div className="font-medium">{request.companyName}</div>
                      <a className="text-xs text-slate-500" href={request.websiteUrl}>
                        {request.websiteUrl}
                      </a>
                    </td>
                    <td className="p-3">
                      <span className="badge">{request.status}</span>
                    </td>
                    <td className="p-3">{request.contactEmail}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/companies/new?fromRequest=${request.id}`}
                          className="rounded-md border border-slate-200 px-3 py-1 text-xs"
                        >
                          Approve &amp; create
                        </Link>
                        <form
                          action={async () => {
                            "use server";
                            await updateListingStatus(request.id, "APPROVED");
                          }}
                        >
                          <button
                            type="submit"
                            className="rounded-md border border-slate-200 px-3 py-1 text-xs"
                          >
                            Approve
                          </button>
                        </form>
                        <form
                          action={async () => {
                            "use server";
                            await updateListingStatus(request.id, "REJECTED");
                          }}
                        >
                          <button
                            type="submit"
                            className="rounded-md border border-slate-200 px-3 py-1 text-xs"
                          >
                            Reject
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Companies</h2>
        <div className="card space-y-3">
          {companies.length === 0 ? (
            <p className="text-sm text-slate-600">No companies yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <th>Name</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-700">
                {companies.map((company) => (
                  <tr key={company.id} className="rounded-lg bg-slate-50">
                    <td className="p-3">
                      <div className="font-medium">{company.name}</div>
                      <div className="text-xs text-slate-500">{company.slug}</div>
                    </td>
                    <td className="p-3">
                      <span className="badge">{company.isLive ? "Live" : "Hidden"}</span>
                    </td>
                    <td className="p-3">
                      {company.updatedAt.toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/companies/${company.id}`}
                          className="rounded-md border border-slate-200 px-3 py-1 text-xs"
                        >
                          Edit
                        </Link>
                        <form
                          action={async () => {
                            "use server";
                            await toggleCompanyLive(company.id, !company.isLive);
                          }}
                        >
                          <button
                            type="submit"
                            className="rounded-md border border-slate-200 px-3 py-1 text-xs"
                          >
                            {company.isLive ? "Hide" : "Publish"}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
