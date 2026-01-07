"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

export function Reminder() {
  const pathname = usePathname();
  const role = pathname.split("/")[1];

  if (pathname === "/professor" || pathname === "/aluno") return;

  return (
    <Link
      className="p-8 w-full flex justify-center items-center gap-2 text-sm text-center font-medium underline cursor-pointer"
      href={`/${role}`}
    >
      Lembre-se de responder o Formulário de Satisfação
      <ExternalLink size={12} />
    </Link>
  );
}
