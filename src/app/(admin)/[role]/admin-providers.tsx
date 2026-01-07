"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/admin/header";
import { Reminder } from "@/components/admin/reminder";

export function AdminProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Reminder />
      <main className="px-4 w-full flex justify-center">{children}</main>
    </QueryClientProvider>
  );
}
