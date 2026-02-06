import { z } from "zod";
import { BADGE_OPTIONS, HIRING_STATUS_OPTIONS, INDUSTRY_OPTIONS, NYC_PRESENCE_OPTIONS } from "@/lib/constants";

const urlField = z.string().url();

export const companySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  slug: z.string().min(1).optional().or(z.literal("")),
  description: z.string().min(1).max(200),
  websiteUrl: urlField,
  careersUrl: urlField.optional().or(z.literal("")),
  nycPresence: z.enum(NYC_PRESENCE_OPTIONS.map((o) => o.value) as [string, ...string[]]),
  industry: z.enum(INDUSTRY_OPTIONS.map((o) => o.value) as [string, ...string[]]),
  hiringStatus: z.enum(HIRING_STATUS_OPTIONS.map((o) => o.value) as [string, ...string[]]),
  badges: z.array(z.enum(BADGE_OPTIONS)).optional(),
  roleLinks: z
    .array(
      z.object({
        title: z.string().min(1),
        url: urlField
      })
    )
    .optional(),
  isLive: z.boolean().optional(),
  lastVerifiedAt: z.string().optional().or(z.literal(""))
});

export const listingRequestSchema = z.object({
  companyName: z.string().min(1),
  websiteUrl: urlField,
  nycPresenceNotes: z.string().optional(),
  roleLinks: z
    .array(
      z.union([
        urlField,
        z.object({
          title: z.string().min(1),
          url: urlField
        })
      ])
    )
    .optional(),
  contactEmail: z.string().email(),
  honeypot: z.string().optional()
});

export const listingStatusSchema = z.enum(["PENDING", "APPROVED", "REJECTED"]);
