import { getSession } from "@/lib/auth";
import { ExamReport } from "@/types/exam-report";
import { useQuery } from "@tanstack/react-query";

export function useExamReport(examId: string) {
  return useQuery({
    queryKey: ["exam-report", examId],
    queryFn: async () => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exams/${examId}/report`,
        {
          headers: {
            "Content-Type": "application/json",
            "user-id": session?.userData.id || "",
            "user-role": session?.userData.role || "",
          },
        }
      );

      const examReport: ExamReport = await response.json();
      return examReport;
    },
  });
}
