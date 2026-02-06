import { PrismaClient, HiringStatus, Industry, NycPresence } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.company.createMany({
    data: [
      {
        name: "Harborline",
        slug: "harborline",
        description: "Fintech tools for modern treasury teams.",
        websiteUrl: "https://harborline.example.com",
        careersUrl: "https://harborline.example.com/careers",
        nycPresence: NycPresence.NYC_OFFICE,
        industry: Industry.FINTECH,
        hiringStatus: HiringStatus.ACTIVELY_INTERVIEWING,
        badges: ["Top-tier investors", "Series A", "Engineering-led org"],
        roleLinks: [
          { title: "Senior Backend Engineer", url: "https://harborline.example.com/roles/backend" },
          { title: "Product Designer", url: "https://harborline.example.com/roles/design" }
        ],
        lastVerifiedAt: new Date()
      },
      {
        name: "Pulsewell",
        slug: "pulsewell",
        description: "AI-powered insights for hybrid healthcare networks.",
        websiteUrl: "https://pulsewell.example.com",
        careersUrl: "https://pulsewell.example.com/careers",
        nycPresence: NycPresence.NYC_HYBRID,
        industry: Industry.HEALTH,
        hiringStatus: HiringStatus.HIRING,
        badges: ["YC-backed", "Seed-stage", "<50 employees"],
        roleLinks: [{ title: "ML Engineer", url: "https://pulsewell.example.com/jobs/ml" }],
        lastVerifiedAt: new Date()
      },
      {
        name: "Cloudsmithy",
        slug: "cloudsmithy",
        description: "Developer tools for zero-downtime releases.",
        websiteUrl: "https://cloudsmithy.example.com",
        careersUrl: null,
        nycPresence: NycPresence.NYC_REMOTE_ALLOWED,
        industry: Industry.DEVTOOLS,
        hiringStatus: HiringStatus.RECENTLY_POSTED,
        badges: ["Repeat founders", "First engineering hires"],
        roleLinks: [{ title: "Founding Engineer", url: "https://cloudsmithy.example.com/jobs" }],
        lastVerifiedAt: new Date()
      },
      {
        name: "Atlas Market",
        slug: "atlas-market",
        description: "Marketplace infrastructure for local commerce teams.",
        websiteUrl: "https://atlasmarket.example.com",
        careersUrl: "https://atlasmarket.example.com/careers",
        nycPresence: NycPresence.NYC_HYBRID,
        industry: Industry.MARKETPLACE,
        hiringStatus: HiringStatus.HIRING,
        badges: ["Series B", "Hybrid NYC (3–5 days)"],
        roleLinks: [
          { title: "Growth Lead", url: "https://atlasmarket.example.com/jobs/growth" },
          { title: "Platform Engineer", url: "https://atlasmarket.example.com/jobs/platform" }
        ],
        lastVerifiedAt: new Date()
      },
      {
        name: "Northwind Labs",
        slug: "northwind-labs",
        description: "B2B SaaS for compliance automation in regulated industries.",
        websiteUrl: "https://northwindlabs.example.com",
        careersUrl: "https://northwindlabs.example.com/careers",
        nycPresence: NycPresence.NYC_OFFICE,
        industry: Industry.B2B_SAAS,
        hiringStatus: HiringStatus.UNKNOWN,
        badges: ["Ex–Big Tech team", "Engineering-led org"],
        roleLinks: [{ title: "Solutions Engineer", url: "https://northwindlabs.example.com/jobs" }],
        lastVerifiedAt: new Date()
      }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
