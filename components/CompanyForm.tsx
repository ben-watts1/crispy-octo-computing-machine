"use client";

import { useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { createCompany, updateCompany } from "@/lib/actions";
import {
  BADGE_OPTIONS,
  HIRING_STATUS_OPTIONS,
  INDUSTRY_OPTIONS,
  NYC_PRESENCE_OPTIONS
} from "@/lib/constants";

const initialState = { error: "" };

type RoleLink = { title: string; url: string };

type CompanyFormProps = {
  mode: "create" | "edit";
  requestId?: string;
  initialValues?: {
    id?: string;
    name?: string;
    slug?: string;
    description?: string;
    websiteUrl?: string;
    careersUrl?: string | null;
    nycPresence?: string;
    industry?: string;
    hiringStatus?: string;
    badges?: string[];
    roleLinks?: RoleLink[];
    isLive?: boolean;
    lastVerifiedAt?: string | null;
  };
};

const CompanyForm = ({ mode, requestId, initialValues }: CompanyFormProps) => {
  const action = mode === "create" ? createCompany : updateCompany;
  const [state, formAction] = useFormState(action, initialState);
  const [roleLinks, setRoleLinks] = useState<RoleLink[]>(
    initialValues?.roleLinks ?? []
  );
  const [badges, setBadges] = useState<string[]>(
    initialValues?.badges ?? []
  );

  const roleLinksValue = useMemo(
    () =>
      JSON.stringify(
        roleLinks.filter((link) => link.title.trim() && link.url.trim())
      ),
    [roleLinks]
  );
  const badgesValue = useMemo(() => JSON.stringify(badges), [badges]);

  const updateRoleLink = (index: number, field: keyof RoleLink, value: string) => {
    setRoleLinks((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const addRoleLink = () => {
    setRoleLinks((prev) => [...prev, { title: "", url: "" }]);
  };

  const removeRoleLink = (index: number) => {
    setRoleLinks((prev) => prev.filter((_, idx) => idx !== index));
  };

  const toggleBadge = (badge: string) => {
    setBadges((prev) =>
      prev.includes(badge) ? prev.filter((item) => item !== badge) : [...prev, badge]
    );
  };

  return (
    <form action={formAction} className="card space-y-6">
      {initialValues?.id && (
        <input type="hidden" name="id" value={initialValues.id} />
      )}
      {requestId && <input type="hidden" name="requestId" value={requestId} />}
      <input type="hidden" name="roleLinks" value={roleLinksValue} />
      <input type="hidden" name="badges" value={badgesValue} />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name">Company name</label>
          <input id="name" name="name" defaultValue={initialValues?.name} required />
        </div>
        <div className="space-y-2">
          <label htmlFor="slug">Slug</label>
          <input id="slug" name="slug" defaultValue={initialValues?.slug || ""} />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          maxLength={200}
          defaultValue={initialValues?.description}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="websiteUrl">Website URL</label>
          <input
            id="websiteUrl"
            name="websiteUrl"
            type="url"
            defaultValue={initialValues?.websiteUrl}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="careersUrl">Careers URL</label>
          <input
            id="careersUrl"
            name="careersUrl"
            type="url"
            defaultValue={initialValues?.careersUrl || ""}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label htmlFor="industry">Industry</label>
          <select
            id="industry"
            name="industry"
            defaultValue={initialValues?.industry || INDUSTRY_OPTIONS[0].value}
          >
            {INDUSTRY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="nycPresence">NYC presence</label>
          <select
            id="nycPresence"
            name="nycPresence"
            defaultValue={initialValues?.nycPresence || NYC_PRESENCE_OPTIONS[0].value}
          >
            {NYC_PRESENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="hiringStatus">Hiring status</label>
          <select
            id="hiringStatus"
            name="hiringStatus"
            defaultValue={initialValues?.hiringStatus || HIRING_STATUS_OPTIONS[0].value}
          >
            {HIRING_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-700">Badges</p>
        <div className="grid gap-2 md:grid-cols-2">
          {BADGE_OPTIONS.map((badge) => (
            <label key={badge} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={badges.includes(badge)}
                onChange={() => toggleBadge(badge)}
              />
              {badge}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-700">Role links</p>
          <button
            type="button"
            onClick={addRoleLink}
            className="rounded-md border border-slate-200 px-3 py-1 text-xs"
          >
            Add role link
          </button>
        </div>
        <div className="space-y-3">
          {roleLinks.map((link, index) => (
            <div key={`${link.url}-${index}`} className="grid gap-2 md:grid-cols-5">
              <input
                className="md:col-span-2"
                placeholder="Role title"
                value={link.title}
                onChange={(event) => updateRoleLink(index, "title", event.target.value)}
              />
              <input
                className="md:col-span-2"
                placeholder="https://..."
                value={link.url}
                onChange={(event) => updateRoleLink(index, "url", event.target.value)}
              />
              <button
                type="button"
                onClick={() => removeRoleLink(index)}
                className="rounded-md border border-slate-200 px-3 py-1 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
          {roleLinks.length === 0 && (
            <p className="text-xs text-slate-500">No role links added.</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="lastVerifiedAt">Last verified date</label>
          <input
            id="lastVerifiedAt"
            name="lastVerifiedAt"
            type="date"
            defaultValue={initialValues?.lastVerifiedAt || ""}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="isLive">Live</label>
          <select
            id="isLive"
            name="isLive"
            defaultValue={initialValues?.isLive === false ? "false" : "true"}
          >
            <option value="true">Live</option>
            <option value="false">Hidden</option>
          </select>
        </div>
      </div>

      <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-white">
        {mode === "create" ? "Create company" : "Save changes"}
      </button>

      {state.error && <p className="text-sm text-rose-600">{state.error}</p>}
    </form>
  );
};

export default CompanyForm;
