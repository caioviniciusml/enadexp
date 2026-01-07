"use client";
import { useAllExams } from "@/hooks/exams/use-all-exams";
import { usePathname } from "next/navigation";
import { ExamCard } from "./exam-card";
import { UserRole } from "@/enums/enums";

interface ExamsListingProps {
  userRole: UserRole;
}

export function ExamsListing({ userRole }: ExamsListingProps) {
  const pathname = usePathname();
  const { data: examsData } = useAllExams();

  if (!examsData) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {examsData.length > 0 ? (
        examsData.map((exam) => (
          <ExamCard
            key={exam.id}
            userRole={userRole}
            userName={exam.createdBy.name}
            examId={exam.id}
            examName={exam.title}
            isPublic={exam.isPublic}
            openingDate={new Date(exam.openingDate)}
            closingDate={new Date(exam.closingDate)}
            questionsCount={exam._count.questions}
            pathname={pathname}
            attemptedSubmitted={exam.hasAttempted}
          />
        ))
      ) : (
        <span className="text-zinc-600 font-medium">
          Nenhum Simulado Encontrado.
        </span>
      )}
    </section>
  );
}
