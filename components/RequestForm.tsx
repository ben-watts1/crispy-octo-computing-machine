"use client";

import { useFormState } from "react-dom";
import { createListingRequest } from "@/lib/actions";

const initialState = { success: false, error: "" };

const RequestForm = () => {
  const [state, formAction] = useFormState(createListingRequest, initialState);

  return (
    <form action={formAction} className="card space-y-4">
      <div className="space-y-2">
        <label htmlFor="companyName">Company name</label>
        <input id="companyName" name="companyName" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="websiteUrl">Company website</label>
        <input id="websiteUrl" name="websiteUrl" type="url" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="roleLinks">Role links (one per line)</label>
        <textarea id="roleLinks" name="roleLinks" rows={4} placeholder="https://..." />
      </div>
      <div className="space-y-2">
        <label htmlFor="nycPresenceNotes">NYC presence notes</label>
        <textarea id="nycPresenceNotes" name="nycPresenceNotes" rows={3} />
      </div>
      <div className="space-y-2">
        <label htmlFor="contactEmail">Contact email</label>
        <input id="contactEmail" name="contactEmail" type="email" required />
      </div>
      <div className="hidden">
        <label htmlFor="companyWebsite">Company website (optional)</label>
        <input id="companyWebsite" name="companyWebsite" />
      </div>
      <button
        type="submit"
        className="rounded-md bg-slate-900 px-4 py-2 text-white"
      >
        Submit request
      </button>
      {state.error && (
        <p className="text-sm text-rose-600">{state.error}</p>
      )}
      {state.success && (
        <p className="text-sm text-emerald-600">
          Thanks! We&apos;ll review your request soon.
        </p>
      )}
    </form>
  );
};

export default RequestForm;
