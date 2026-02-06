"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import slugify from "@/lib/slugify";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { companySchema, listingRequestSchema, listingStatusSchema } from "@/lib/validators";

const requireAdmin = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }
};

export async function createListingRequest(formData: FormData) {
  const rawRoleLinks = String(formData.get("roleLinks") || "");
  const roleLinks = rawRoleLinks
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const payload = {
    companyName: formData.get("companyName"),
    websiteUrl: formData.get("websiteUrl"),
    nycPresenceNotes: formData.get("nycPresenceNotes"),
    roleLinks,
    contactEmail: formData.get("contactEmail"),
    honeypot: formData.get("companyWebsite")
  };

  const parsed = listingRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, error: "Please check the form fields." };
  }

  if (parsed.data.honeypot) {
    return { success: false, error: "Submission blocked." };
  }

  await prisma.listingRequest.create({
    data: {
      companyName: parsed.data.companyName,
      websiteUrl: parsed.data.websiteUrl,
      nycPresenceNotes: parsed.data.nycPresenceNotes,
      roleLinks: parsed.data.roleLinks ?? [],
      contactEmail: parsed.data.contactEmail
    }
  });

  revalidatePath("/request");
  return { success: true, error: "" };
}

export async function createCompany(formData: FormData) {
  await requireAdmin();
  const requestId = formData.get("requestId") as string | null;

  const parsed = companySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    websiteUrl: formData.get("websiteUrl"),
    careersUrl: formData.get("careersUrl"),
    nycPresence: formData.get("nycPresence"),
    industry: formData.get("industry"),
    hiringStatus: formData.get("hiringStatus"),
    badges: JSON.parse((formData.get("badges") as string) || "[]"),
    roleLinks: JSON.parse((formData.get("roleLinks") as string) || "[]"),
    isLive: formData.get("isLive") === "true",
    lastVerifiedAt: formData.get("lastVerifiedAt")
  });

  if (!parsed.success) {
    return { error: "Please check the form fields." };
  }

  const slug = parsed.data.slug?.trim() || slugify(parsed.data.name);
  const existing = await prisma.company.findUnique({ where: { slug } });
  if (existing) {
    return { error: "Slug already exists. Please adjust." };
  }

  await prisma.company.create({
    data: {
      name: parsed.data.name,
      slug,
      description: parsed.data.description,
      websiteUrl: parsed.data.websiteUrl,
      careersUrl: parsed.data.careersUrl || null,
      nycPresence: parsed.data.nycPresence,
      industry: parsed.data.industry,
      hiringStatus: parsed.data.hiringStatus,
      badges: parsed.data.badges ?? [],
      roleLinks: parsed.data.roleLinks ?? [],
      isLive: parsed.data.isLive ?? true,
      lastVerifiedAt: parsed.data.lastVerifiedAt
        ? new Date(parsed.data.lastVerifiedAt)
        : null
    }
  });

  if (requestId) {
    await prisma.listingRequest.update({
      where: { id: requestId },
      data: { status: "APPROVED" }
    });
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateCompany(formData: FormData) {
  await requireAdmin();

  const parsed = companySchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    websiteUrl: formData.get("websiteUrl"),
    careersUrl: formData.get("careersUrl"),
    nycPresence: formData.get("nycPresence"),
    industry: formData.get("industry"),
    hiringStatus: formData.get("hiringStatus"),
    badges: JSON.parse((formData.get("badges") as string) || "[]"),
    roleLinks: JSON.parse((formData.get("roleLinks") as string) || "[]"),
    isLive: formData.get("isLive") === "true",
    lastVerifiedAt: formData.get("lastVerifiedAt")
  });

  if (!parsed.success || !parsed.data.id) {
    return { error: "Please check the form fields." };
  }

  const slug = parsed.data.slug?.trim() || slugify(parsed.data.name);
  const existing = await prisma.company.findFirst({
    where: {
      slug,
      NOT: { id: parsed.data.id }
    }
  });

  if (existing) {
    return { error: "Slug already exists. Please adjust." };
  }

  await prisma.company.update({
    where: { id: parsed.data.id },
    data: {
      name: parsed.data.name,
      slug,
      description: parsed.data.description,
      websiteUrl: parsed.data.websiteUrl,
      careersUrl: parsed.data.careersUrl || null,
      nycPresence: parsed.data.nycPresence,
      industry: parsed.data.industry,
      hiringStatus: parsed.data.hiringStatus,
      badges: parsed.data.badges ?? [],
      roleLinks: parsed.data.roleLinks ?? [],
      isLive: parsed.data.isLive ?? true,
      lastVerifiedAt: parsed.data.lastVerifiedAt
        ? new Date(parsed.data.lastVerifiedAt)
        : null
    }
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function toggleCompanyLive(id: string, isLive: boolean) {
  await requireAdmin();
  await prisma.company.update({ where: { id }, data: { isLive } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateListingStatus(id: string, status: string) {
  await requireAdmin();
  const parsed = listingStatusSchema.safeParse(status);
  if (!parsed.success) {
    return;
  }
  await prisma.listingRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
}
