import { ClipboardPen, Calendar } from "lucide-react";
import Link from "next/link";

interface ListCardProps {
  title: string;
  questionsCount: number;
  createdAt: Date;
  redirectTo: string;
}

export function ListCard({
  title,
  questionsCount,
  createdAt,
  redirectTo,
}: ListCardProps) {
  return (
    <Link
      href={redirectTo}
      className="p-6 md:p-8 w-full flex flex-col gap-2 bg-offwhite border rounded-lg shadow-lg"
    >
      <h2 className="text-primary-green font-bold text-lg">{title}</h2>
      <div className="flex items-center gap-1 font-medium text-sm text-zinc-700">
        <ClipboardPen size={16} />
        <span>
          {questionsCount > 1 ? `${questionsCount} Questões` : "1 Questão"}
        </span>
      </div>
      <div className="flex items-center gap-1 font-medium text-sm text-zinc-700">
        <Calendar size={16} />
        <span>
          Criada em {new Date(createdAt).toLocaleDateString("pt-BR")} às{" "}
          {new Date(createdAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </Link>
  );
}
