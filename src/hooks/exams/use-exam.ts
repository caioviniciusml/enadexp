import { getSession } from "@/lib/auth";
import { Exam } from "@/types/exam";
import { useQuery } from "@tanstack/react-query";

export function useExam(examId: string) {
  return useQuery({
    queryKey: ["exam", examId],
    queryFn: async () => {
      const session = await getSession();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/exams/${examId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "user-id": session?.userData.id || "",
            "user-role": session?.userData.role || "",
          },
        }
      );
      const examData: Exam = await response.json();
      return examData;
    },
  });
}
