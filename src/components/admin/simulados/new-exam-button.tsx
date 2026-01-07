"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function NewExamButton() {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/criar`}>
      <Button className="flex-1 md:flex-0 cursor-pointer">
        <Plus />
        Novo Simulado
      </Button>
    </Link>
  );
}
