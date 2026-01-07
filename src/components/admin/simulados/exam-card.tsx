import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/enums/enums";
import {
  Calendar,
  ClipboardPen,
  Eye,
  EyeClosed,
  UserRound,
} from "lucide-react";
import Link from "next/link";

interface ExamCardProps {
  attemptedSubmitted: boolean;
  userRole: UserRole;
  userName: string;
  isPublic: boolean;
  examId: string;
  examName: string;
  questionsCount: number;
  openingDate: Date;
  closingDate: Date;
  pathname: string;
}

export function ExamCard({
  attemptedSubmitted,
  userRole,
  userName,
  examId,
  examName,
  isPublic,
  questionsCount,
  openingDate,
  closingDate,
  pathname,
}: ExamCardProps) {
  const now = new Date();

  const isBeforeOpening = now < openingDate;
  const isAfterClosing = now > closingDate;
  const isAvailable = !isBeforeOpening && !isAfterClosing;
  const isDisabled = attemptedSubmitted || !isAvailable;
  let buttonLabel = "Responder";

  if (attemptedSubmitted) {
    buttonLabel = "Respondido";
  } else if (isBeforeOpening) {
    buttonLabel = "Não Iniciado";
  } else if (isAfterClosing) {
    buttonLabel = "Encerrado";
  }

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-2 bg-offwhite border rounded-lg shadow-lg">
      <h2 className="text-primary-green font-bold text-lg">{examName}</h2>
      {userRole === UserRole.PROFESSOR &&
        (isPublic ? (
          <Badge className="my-2 text-green-600 bg-green-100">
            <Eye />
            Visivel
          </Badge>
        ) : (
          <Badge className="my-2 text-red-500 bg-red-100">
            <EyeClosed />
            Não Visivel
          </Badge>
        ))}
      {userRole === UserRole.PROFESSOR && (
        <div className="flex items-center gap-1 font-medium text-sm text-zinc-700">
          <UserRound size={16} />
          <span>{`Criado por ${userName}`}</span>
        </div>
      )}

      <div className="flex items-center gap-1 font-medium text-sm text-zinc-700">
        <ClipboardPen size={16} />
        <span>
          {questionsCount > 1 ? `${questionsCount} Questões` : "1 Questão"}
        </span>
      </div>
      <div className="flex items-center gap-1 font-medium text-sm text-zinc-700">
        <Calendar size={16} />
        <span>
          Abertura: {openingDate.toLocaleDateString("pt-BR")} às{" "}
          {openingDate.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <div className="flex items-center gap-1 font-medium text-sm text-zinc-700">
        <Calendar size={16} />
        <span>
          Encerramento: {closingDate.toLocaleDateString("pt-BR")} às{" "}
          {closingDate.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      {userRole === UserRole.PROFESSOR ? (
        <div className="flex gap-2">
          <Link
            className="mt-4 flex-1 flex gap-1 cursor-pointer"
            href={`${pathname}/${examId}`}
          >
            <Button className="w-full cursor-pointer">Ver Simulado</Button>
          </Link>
          <Link
            className="mt-4 flex-1 flex gap-1 cursor-pointer"
            href={`${pathname}/${examId}/relatorio`}
          >
            <Button className="w-full cursor-pointer">Relatorio</Button>
          </Link>
        </div>
      ) : (
        <Link
          className="mt-4 flex gap-1 cursor-pointer"
          href={`${pathname}/${examId}`}
        >
          <Button disabled={isDisabled} className="w-full cursor-pointer">
            {buttonLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
