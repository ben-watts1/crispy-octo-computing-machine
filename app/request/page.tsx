import RequestForm from "@/components/RequestForm";

export default function RequestPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Request to be listed</h1>
        <p className="text-sm text-slate-600">
          Share the basics and we&apos;ll take it from there. We only list NYC-focused
          startups that are hiring.
        </p>
      </div>
      <RequestForm />
    </div>
  );
}
