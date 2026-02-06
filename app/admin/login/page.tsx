"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/admin"
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-semibold text-slate-900">Admin login</h1>
      <form onSubmit={handleSubmit} className="card space-y-4">
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-white">
          Sign in
        </button>
        {error && <p className="text-sm text-rose-600">{error}</p>}
      </form>
    </div>
  );
}
