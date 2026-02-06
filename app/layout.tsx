import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "NYC Hiring Startups",
  description: "A curated directory of New York startups that are hiring."
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <div className="min-h-screen bg-fog">
            <header className="border-b border-slate-200 bg-white">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
                <a href="/" className="text-lg font-semibold text-slate-900">
                  NYC Hiring Startups
                </a>
                <nav className="flex items-center gap-4 text-sm text-slate-600">
                  <a className="link" href="/request">
                    Request listing
                  </a>
                  <a className="link" href="/admin">
                    Admin
                  </a>
                </nav>
              </div>
            </header>
            <main className="mx-auto w-full max-w-6xl px-6 py-10">
              {children}
            </main>
            <footer className="border-t border-slate-200 bg-white">
              <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-500">
                Curated by a human. Links go to the source.
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
