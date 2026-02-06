import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          return null;
        }

        const isEmailMatch = parsed.data.email.toLowerCase() ===
          adminEmail.toLowerCase();
        const isPasswordMatch = parsed.data.password === adminPassword;

        if (!isEmailMatch || !isPasswordMatch) {
          return null;
        }

        return { id: "admin", name: "Admin", email: adminEmail };
      }
    })
  ],
  pages: {
    signIn: "/admin/login"
  }
};

export const requireAdminEnv = () => {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD env vars.");
  }
};
