import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 1. The TypeScript "Cookie Cutter" (Object Type)
interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function App() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create account");
      }
      setMessage("Account created successfully! You can now log in.");
    } catch (err: any) {
      setIsError(true);
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
      {/* Narrow registration card */}
      <div className="w-full max-w-sm bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
            Create an account
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Join the craftsman marketplace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Sanko Daoud"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="sanko@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>

        {/* Typed Fictional Preview Box */}
        <div className="pt-4 border-t border-neutral-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Fictional Typed Preview
          </span>
          <pre className="mt-2 p-3 bg-neutral-900 text-neutral-100 text-xs rounded-lg overflow-x-auto font-mono">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
